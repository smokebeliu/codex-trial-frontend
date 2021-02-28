import {createReducer} from '@reduxjs/toolkit';
import {Reducer, AnyAction} from 'redux';
import {CancelTokenSource} from 'axios';


export interface IDefaultStateAPI<T = any> {
  data: T | null | undefined;
  error?: string | null;
  isFetching?: boolean;
  isFetched?: boolean;
  cancelTokenSource?: CancelTokenSource | null;
}

export function createAPIReducer<T>(
  actions: string[],
  initialState: IDefaultStateAPI<T> = {
    data: null,
    error: null,
    cancelTokenSource: null,
  },
): Reducer<IDefaultStateAPI<T>> {
  if (actions.length !== 3 && actions.length !== 4) {
    throw new Error(
      `There should be 3 actions(request action, success action and failure action) or 4 actions(request action, success action, failure action, clear action) and now it's ${actions}`,
    );
  }

  // request, success and failure actions
  const defaultActionMap = {
    [actions[0]]: (state: IDefaultStateAPI<T>, action: AnyAction) => {
      // if cancelTokenSource still in store -> cancel request (the same request was fired several times)
      if (state.cancelTokenSource) {
        state.cancelTokenSource.cancel();
      }

      return {
        ...state,
        isFetching: true,
        isFetched: null,
        error: null,
        cancelTokenSource: action.cancelTokenSource,
      };
    },
    [actions[1]]: (state: IDefaultStateAPI<T>, action: AnyAction) => ({
      ...state,
      data: action.data,
      isFetching: false,
      isFetched: true,
      cancelTokenSource: null
    }),
    [actions[2]]: (state: IDefaultStateAPI<T>, action: AnyAction) => ({
      ...state,
      data: initialState.data,
      error: action.error,
      isFetching: false,
      isFetched: false,
      cancelTokenSource: null
    })
  };

  // clear action
  if (actions.length === 4) {
    return createReducer(initialState, {
      ...defaultActionMap,
      [actions[3]]: () => initialState,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createReducer(initialState, defaultActionMap as any);
}

import {Action} from 'redux';
import {call, put} from 'redux-saga/effects';
import axios, {AxiosRequestConfig} from 'axios';

const REQUEST_TIMEOUT = 60000;

export interface ISagaApiAction extends Action {
  responseTypes: [string, string];
  reqOps: AxiosRequestConfig;
}

export function* createAPISaga<T>(action: ISagaApiAction) {
  const {responseTypes, reqOps = {}} = action;

  const [successType, failureType] = responseTypes;

  try {
    const cancelTokenSource = axios.CancelToken.source();
    // @ts-ignore
    const response = yield call(() => {
      return axios({
        ...reqOps,
        timeout: REQUEST_TIMEOUT,
        headers: {
          ...reqOps.headers
          // you can put here common headers for all requests
        },
        cancelToken: cancelTokenSource.token
      });
    });

    yield put({
      data: response.data,
      type: successType
    });
  } catch (error) {
    yield put({
      error: error && error.response && error.response.data && error.response.data.error,
      type: failureType
    });
  }
}

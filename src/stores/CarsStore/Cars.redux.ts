import {combineReducers} from 'redux';
import {
  CREATE_CAR_FAILURE,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  FETCH_CARS_FAILURE,
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  CHANGE_TABLE_STATE, RESET_TABLE_STATE
} from './Cars.constants';
import {ICar, ITableState} from "./Cars.types";
import {getApiUrl} from "../../utils/ApiUtils";
import {createAPIReducer, IDefaultStateAPI} from "../../utils/StoreUtils";
import {createReducer} from "@reduxjs/toolkit";

/**
 * ACTIONS
 */

function changeTableState(tableState: ITableState) {
  return {
    type: CHANGE_TABLE_STATE,
    tableState
  }
}

function resetTableState() {
  return {
    type: RESET_TABLE_STATE
  }
}

function fetchCars(tableState?: ITableState ) {
  const params = {
    _page: tableState?.page || 1,
    _limit: tableState?.limit || 10,
    _sort: tableState?.sortBy || 'id',
    _order: tableState?.sortDirection || 'asc'
  };
  return {
    type: FETCH_CARS_REQUEST,
    reqOps: {
      url: getApiUrl(`/cars`, params),
      method: 'GET',
    },
    responseTypes: [FETCH_CARS_SUCCESS, FETCH_CARS_FAILURE]
  };
}

function createCar(data: ICar) {
  return {
    type: CREATE_CAR_REQUEST,
    reqOps: {
      url: getApiUrl(`/cars`),
      method: 'POST',
      data
    },
    responseTypes: [CREATE_CAR_SUCCESS, CREATE_CAR_FAILURE]
  };
}

/**
 * REDUCERS
 */

const INITIAL_CARS_STATE: IDefaultStateAPI<ICar[]> = {
  data: null
};

const carsData = createAPIReducer(
  [FETCH_CARS_REQUEST, FETCH_CARS_SUCCESS, FETCH_CARS_FAILURE],
  INITIAL_CARS_STATE
);

const INITIAL_TABLE_STATE: ITableState = {
  limit: 10,
  page: 1,
  sortBy: 'id',
  sortDirection: 'asc'
};

const tableState = createReducer<ITableState>(INITIAL_TABLE_STATE, {
  [CHANGE_TABLE_STATE]: (state, action) => {
    return {...action.tableState}
  },
  [RESET_TABLE_STATE]: () => {
    return INITIAL_TABLE_STATE
  }
});

export const reducers = combineReducers({
  carsData,
  tableState
});

export default {
  fetchCars,
  createCar,
  changeTableState,
  resetTableState
};

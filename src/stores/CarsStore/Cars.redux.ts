import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';

import {
  CREATE_CAR_FAILURE,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  FETCH_CARS_FAILURE,
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS
} from './Cars.constants';
import {ICar} from "./Cars.types";
import {getApiUrl} from "../../utils/ApiUtils";
import {createAPIReducer, IDefaultStateAPI} from "../../utils/StoreUtils";

/**
 * ACTIONS
 */


function fetchCars() {
  return {
    type: FETCH_CARS_REQUEST,
    reqOps: {
      url: getApiUrl(`/cars`),
      method: 'GET',
    },
    responseTypes: [FETCH_CARS_SUCCESS, FETCH_CARS_FAILURE]
  };
}

function createCar(car: ICar) {
  return {
    type: CREATE_CAR_REQUEST,
    reqOps: {
      url: getApiUrl(`/cars`),
      method: 'POST',
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


export const reducers = combineReducers({
  carsData,
});

export default {
  fetchCars,
  createCar
};

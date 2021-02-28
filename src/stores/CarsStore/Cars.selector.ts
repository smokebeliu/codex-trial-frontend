import {TAppState} from '../RootReducer';
import {createSelector} from "reselect";

export const carsSelector = (state: TAppState) => state.cars.carsData.data;
export const carsIsLoadingSelector = (state: TAppState) => state.cars.carsData.isFetching;
export const tableStateSelector = (state: TAppState) => state.cars.tableState;


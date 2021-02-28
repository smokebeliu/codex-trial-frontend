import {TAppState} from '../RootReducer';
import {createSelector} from "reselect";

export const carsSelector = (state: TAppState) => state.cars.carsData.data;

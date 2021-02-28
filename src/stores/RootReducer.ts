import {combineReducers} from 'redux';

import {reducers as carsReducers} from './CarsStore';

const rootReducer = combineReducers({
  cars: carsReducers
});

export default rootReducer;

export type TAppState = ReturnType<typeof rootReducer>;

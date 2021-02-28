import {all, fork} from 'redux-saga/effects';

import {sagas as carsSaga} from './CarsStore';

const sagas = [carsSaga];

export default function* root() {
  yield all([...sagas.map((saga) => fork(saga))]);
}

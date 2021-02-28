import {call, takeLatest} from 'redux-saga/effects';
import {CREATE_CAR_REQUEST, FETCH_CARS_REQUEST} from "./Cars.constants";
import {createAPISaga, ISagaApiAction} from "../../utils/SagaUtils";

function* getCars(action: ISagaApiAction) {
  yield call(createAPISaga, {...action});
}

function* getCreateCar(action: ISagaApiAction) {
  yield call(createAPISaga, {...action});
}

function* carsSaga() {
  yield takeLatest(FETCH_CARS_REQUEST, getCars);
  yield takeLatest(CREATE_CAR_REQUEST, getCreateCar);
}

export default carsSaga;

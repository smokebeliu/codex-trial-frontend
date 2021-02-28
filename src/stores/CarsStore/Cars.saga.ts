import {call, takeLatest, put} from 'redux-saga/effects';
import {CHANGE_TABLE_STATE, CREATE_CAR_REQUEST, FETCH_CARS_REQUEST} from "./Cars.constants";
import {createAPISaga, ISagaApiAction} from "../../utils/SagaUtils";
import CarsActions from "./Cars.redux";
import {Action} from "redux";
import {ITableState} from "./Cars.types";

const {fetchCars, resetTableState} = CarsActions;

interface ICombined extends Action {
  tableState: ITableState
}

function* getCars(action: ISagaApiAction) {
  yield call(createAPISaga, {...action});
}

function* getChangeTableState(action: ICombined) {
  yield put(fetchCars(action.tableState));
}

function* getCreateCar(action: ISagaApiAction) {
  yield call(createAPISaga, {...action});
  yield put(fetchCars());
  yield put(resetTableState());
}

function* carsSaga() {
  yield takeLatest(FETCH_CARS_REQUEST, getCars);
  yield takeLatest(CREATE_CAR_REQUEST, getCreateCar);
  yield takeLatest(CHANGE_TABLE_STATE, getChangeTableState);

}

export default carsSaga;

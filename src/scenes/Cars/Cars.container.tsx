import React, {FunctionComponent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {carsSelector, carsIsLoadingSelector, tableStateSelector} from "../../stores/CarsStore/Cars.selector";
import CarsActions from "../../stores/CarsStore";
import CarsComponent from "./Cars.component";
import {ICar, ITableState} from "../../stores/CarsStore/Cars.types";

const {fetchCars, createCar, changeTableState} = CarsActions;

const CarsContainer: FunctionComponent = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);
  const tableState = useSelector(tableStateSelector);
  const isLoading = useSelector(carsIsLoadingSelector);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const onFetchCars = (tableState: ITableState) => {
    dispatch(fetchCars(tableState));
  };

  const onSaveCar = (data: ICar) => {
    dispatch(createCar(data));
  };

  const onChangeTableState = (data: ITableState) => {
    dispatch(changeTableState(data));
  };

  return (
    <CarsComponent data={cars || []}
                   tableState={tableState}
                   isLoading={isLoading}
                   onFetchCars={onFetchCars}
                   onSave={onSaveCar}
                   onChangeTableState={onChangeTableState} />
  );
};

export default CarsContainer;

import React, {FunctionComponent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {carsSelector} from "../../stores/CarsStore/Cars.selector";
import CarsActions from "../../stores/CarsStore";
import CarsComponent from "./Cars.component";

const {fetchCars} = CarsActions;

const CarsContainer: FunctionComponent = () => {
  const dispatch = useDispatch();
  const cars = useSelector(carsSelector);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <CarsComponent data={cars} />
  );
};

export default CarsContainer;

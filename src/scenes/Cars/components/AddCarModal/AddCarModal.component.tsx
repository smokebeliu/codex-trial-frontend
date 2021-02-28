import React, {FunctionComponent} from "react";
import {Button, Col, Grid, Modal, Row} from "rsuite";
import {useForm} from "react-hook-form";
import {ControlledInput} from "../../../../components/ControlledInput/ControlledInput";
import {ICar} from "../../../../stores/CarsStore/Cars.types";

type IProps = {
  isShow: boolean,
  onHide: () => void,
  onSave: Function
};

const AddCarComponent: FunctionComponent<IProps> = ({isShow, onHide, onSave}) => {

  const { control, errors, handleSubmit } = useForm<ICar>();

  const onSubmit = (data: ICar) => {
    onSave(data);
    onHide();
  };

  return (
    <Modal backdrop show={isShow} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add new car</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col>
                <ControlledInput errors={errors} control={control} name="id" rules={{ required: true }} size="md" placeholder="Id" />
                <ControlledInput errors={errors} control={control} name="make" rules={{ required: true }} size="md" placeholder="Make" />
                <ControlledInput errors={errors} control={control} name="model" rules={{ required: true }} size="md" placeholder="Model" />
                <ControlledInput errors={errors} control={control} name="year" rules={{ required: true }} size="md" placeholder="Year" />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' appearance="primary">
            Add
          </Button>
          <Button onClick={onHide} appearance="subtle">
            Cancel
          </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddCarComponent;

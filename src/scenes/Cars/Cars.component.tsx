import React, {FunctionComponent, useEffect, useState} from "react";
import {Container, Header, Content, Table, Button} from "rsuite";
import {ICar, ITableState} from "../../stores/CarsStore/Cars.types";
import AddCarComponent from "./components/AddCarModal/AddCarModal.component";
import s from "./Cars.module.css";

const { Column, HeaderCell, Cell } = Table;

type IProps = {
  data: ICar[],
  tableState: ITableState,
  isLoading: boolean | undefined,
  onFetchCars: Function,
  onSave: Function,
  onChangeTableState: Function
};

const CarsComponent: FunctionComponent<IProps> = ({tableState, data, isLoading, onChangeTableState, onFetchCars, onSave}) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onChangePage = (dataKey: number) => {
    onChangeTableState({
      ...tableState,
      page: dataKey
    })
  };

  const onChangeDisplayLength = (dataKey: number) => {
    onChangeTableState({
      ...tableState,
      limit: dataKey
    })
  };

  const onChangeSort = (sortBy: string, sortDirection: 'asc' | 'desc') => {
    onChangeTableState({
      ...tableState,
      sortBy,
      sortDirection
    })
  };

  return (
    <div className={s.container}>
      <Container>
        <Header>
          <Button className={s.button} onClick={() => setIsShow(true)} appearance="primary">
            Add new car
          </Button>
        </Header>
        <Content>
          <Table data={data}
                 loading={isLoading}
                 sortColumn={tableState.sortBy}
                 sortType={tableState.sortDirection}
                 autoHeight
                 onSortColumn={onChangeSort}>
            <Column flexGrow={1} sortable>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1} sortable>
              <HeaderCell>Make</HeaderCell>
              <Cell dataKey="make" />
            </Column>

            <Column flexGrow={1} sortable>
              <HeaderCell>Model</HeaderCell>
              <Cell dataKey="model" />
            </Column>

            <Column flexGrow={1} sortable>
              <HeaderCell>Year</HeaderCell>
              <Cell dataKey="year" />
            </Column>
          </Table>

        </Content>
        <Table.Pagination
          lengthMenu={[
            {
              value: 10,
              label: 10
            },
            {
              value: 20,
              label: 20
            }
          ]}
          activePage={tableState.page}
          displayLength={tableState.limit}
          total={100} //default json-server cant return all items params in paginate response
          onChangePage={onChangePage}
          onChangeLength={onChangeDisplayLength}
        />
      </Container>
      <AddCarComponent isShow={isShow} onSave={onSave} onHide={() => setIsShow(false)}/>
    </div>
  );
};

export default CarsComponent;

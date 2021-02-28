export interface ICar {
  id: string;
  model: string;
  make: string;
  year: string;
}

export interface ITableState {
  limit: number;
  page: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc'
}

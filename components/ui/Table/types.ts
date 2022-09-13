export interface DataTableProps {
  data: Array<any>;
  columns: Array<any>;
  showDate?: boolean;
  onFilterDate?: (date: Date[]) => void;
}

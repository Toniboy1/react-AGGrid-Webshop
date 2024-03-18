import { RefObject, createContext } from 'react';
import { IPositionRow } from '@/types/positionTypes';
import { AgGridReact } from 'ag-grid-react';

export interface PositionsContextType {
  rowData: IPositionRow[];
  loading: boolean;
  error: string | null;
  addRow: (append: boolean, data: IPositionRow) => Promise<void>;
  removeSelected: (selectedIds: string[]) => Promise<void>;
  gridRef: RefObject<AgGridReact<any>>;
}
export const PositionsContext = createContext<PositionsContextType | null>(null);

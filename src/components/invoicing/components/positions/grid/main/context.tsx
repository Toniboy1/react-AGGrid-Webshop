import { LegacyRef, createContext } from 'react';
import { IPositionRow } from '@/types/positionTypes';
import { AgGridReact } from 'ag-grid-react';

export interface PositionGridContextType {
  rowData: IPositionRow[];
  loading: boolean;
  error: string | null;
  addRow: (append: boolean, data: IPositionRow) => Promise<void>;
  removeSelected: (selectedIds: string[]) => Promise<void>;
}
export const PositionGridContext = createContext<PositionGridContextType | null>(null);

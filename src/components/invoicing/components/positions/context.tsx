import { createContext } from 'react';
import { IPositionRow } from '@/types/positionTypes';;

export interface PositionsContextType {
  rowData: IPositionRow[];
  loading: boolean;
  error: string | null;
  addRow: (append: boolean, data: IPositionRow) => Promise<void>;
  removeSelected: (selectedIds: string[]) => Promise<void>;
}
export const PositionsContext = createContext<PositionsContextType | null>(null);

import { createContext } from 'react';
import { TPositionRow } from '@/types/positionTypes';;

export interface PositionsContextType {
  rowData: TPositionRow[];
  loading: boolean;
  error: string | null;
  addRow: (append: boolean, data: TPositionRow) => Promise<void>;
  removeSelected: (selectedIds: string[]) => Promise<void>;
}
export const PositionsContext = createContext<PositionsContextType | null>(null);

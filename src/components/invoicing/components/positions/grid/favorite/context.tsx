import { createContext } from 'react';
import { IPositionRow } from '@/types/positionTypes';;

export interface PositionFavoriteContextType {
  rowData: IPositionRow[];
  loading: boolean;
  error: string | null;
  addRow: (append: boolean, data: IPositionRow) => Promise<void>;
  removeSelected: (selectedIds: string[]) => Promise<void>;
}
export const PositionFavoriteContext = createContext<PositionFavoriteContextType | null>(null);

import { createContext } from 'react';
import { TPositionCatlogue } from '@/types/positionTypes';;

export interface PositionsSearchContextType {
  active: boolean;
  query: string;
  results: TPositionCatlogue[];
  searchRef: React.RefObject<HTMLInputElement>;
  onChange: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}
export const PositionsSearchContext = createContext<PositionsSearchContextType | null>(null);

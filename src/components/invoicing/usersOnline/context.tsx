import { createContext } from 'react';
import { IPositionRow } from '@/types/positionTypes';

export interface UsersOnlineContextType {
  userCount: number;
}
export const UsersOnlineContext = createContext<UsersOnlineContextType | null>(null);

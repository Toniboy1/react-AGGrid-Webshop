import { useFetchFavoritePositions } from "@/hooks/useFetchFavoritePositions";
import { PositionFavoriteContext, PositionFavoriteContextType } from "./context";
import { FC, ReactNode } from "react";
interface PositionFavoriteProviderProps {
    children: ReactNode;
  }
export const PositionFavoriteProvider: FC<PositionFavoriteProviderProps> = ({ children }) => {
    const { rowData, loading, error, addRow, removeSelected } = useFetchFavoritePositions();
  
    const contextValue: PositionFavoriteContextType = {
      rowData,
      loading,
      error,
      addRow,
      removeSelected
    };
    return (
      <PositionFavoriteContext.Provider value={contextValue}>
        {children}
      </PositionFavoriteContext.Provider>
    );
  };
  
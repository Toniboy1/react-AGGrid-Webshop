import { useFetchFavoritePositions } from "@/hooks/useFetchFavoritePositions";
import { PositionGridContext, PositionGridContextType } from "./context";
import { FC, ReactNode } from "react";
interface PositionGridProviderProps {
    children: ReactNode;
  }
export const PositionGridProvider: FC<PositionGridProviderProps> = ({ children }) => {
    const { rowData, loading, error, addRow, removeSelected } = useFetchFavoritePositions();
  
    const contextValue: PositionGridContextType = {
      rowData,
      loading,
      error,
      addRow,
      removeSelected,
    };
    return (
      <PositionGridContext.Provider value={contextValue}>
        {children}
      </PositionGridContext.Provider>
    );
  };
  
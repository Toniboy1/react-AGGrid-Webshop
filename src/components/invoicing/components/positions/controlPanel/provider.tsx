import { useFetchPositions } from "@/hooks/useFetchPositions";
import { PositionsContext, PositionsContextType } from "./context";
import { FC, ReactNode } from "react";
interface PositionsProviderProps {
    children: ReactNode;
  }
export const PositionsProvider: FC<PositionsProviderProps> = ({ children }) => {
    const { rowData, loading, error, addRow, removeSelected,gridRef } = useFetchPositions();
  
    const contextValue: PositionsContextType = {
      rowData,
      loading,
      error,
      addRow,
      removeSelected,
      gridRef
    };
    return (
      <PositionsContext.Provider value={contextValue}>
        {children}
      </PositionsContext.Provider>
    );
  };
  
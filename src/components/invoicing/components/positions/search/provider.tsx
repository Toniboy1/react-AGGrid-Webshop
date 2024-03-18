import { useSearchPosition } from "@/hooks/useSearchPosition";
import { PositionsSearchContext, PositionsSearchContextType } from "./context";
import { FC, ReactNode } from "react";
interface PositionsSearchProviderProps {
  children: ReactNode;
}
export const PositionsSearchProvider: FC<PositionsSearchProviderProps> = ({ children }) => {
  const { query, active, onChange, onFocus, searchRef, results } = useSearchPosition();

  const contextValue: PositionsSearchContextType = {
    query, active, onChange, onFocus, searchRef, results
  };
  return (
    <PositionsSearchContext.Provider value={contextValue}>
      {children}
    </PositionsSearchContext.Provider>
  );
};

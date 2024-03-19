import { useUsersOnline } from "@/hooks/useUsersOnline";
import { UsersOnlineContext, UsersOnlineContextType } from "./context";
import { FC, ReactNode } from "react";
interface UsersOnlineProviderProps {
    children: ReactNode;
  }
export const UsersOnlineProvider: FC<UsersOnlineProviderProps> = ({ children }) => {
    const { userCount } = useUsersOnline();
  
    const contextValue: UsersOnlineContextType = {
      userCount,
    };
    return (
      <UsersOnlineContext.Provider value={contextValue}>
        {children}
      </UsersOnlineContext.Provider>
    );
  };
  
import { ReactNode, createContext, useMemo, useState } from "react";

interface UserInfo {
  email: string;
  username: string;
  _id: string;
}

export interface UserContextProps {
  userInfo?: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const contextValue = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo, setUserInfo]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

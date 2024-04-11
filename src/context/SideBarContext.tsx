import { createContext, useContext, useState, ReactNode } from "react";

type SideBarTypes = "components" | "preset" | "social" | "";

type SideBarContextValue = {
  sideBarOptions: SideBarTypes;
  handleSideBarSelection: (selection: SideBarTypes) => void;
};

type SideBarProviderProps = {
  children: ReactNode;
};

export const SideBarContext = createContext<SideBarContextValue>({
  sideBarOptions: "",
  handleSideBarSelection: () => {},
});

export const useSideBar = () => {
  return useContext(SideBarContext);
};

export const SideBarProvider: React.FC<SideBarProviderProps> = ({
  children,
}) => {
  const [sideBarOptions, setSideBarOptions] = useState<SideBarTypes>("");

  const handleSideBarSelection = (selection: SideBarTypes) => {
    setSideBarOptions(selection);
  };

  return (
    <SideBarContext.Provider value={{ sideBarOptions, handleSideBarSelection }}>
      {children}
    </SideBarContext.Provider>
  );
};

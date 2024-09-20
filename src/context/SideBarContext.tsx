import { createContext, useContext, useState, ReactNode } from "react";

type SideBarTypes = "components" | "preset" | "social" | "";

type PopupTextType = {
  infoText: string;
  buttonText: string;
  handleConfirm: "new" | "";
};

type SideBarContextValue = {
  sideBarOptions: SideBarTypes;
  handleSideBarSelection: (selection: SideBarTypes) => void;
  popupText: PopupTextType;
  setPopupText: React.Dispatch<
    React.SetStateAction<{
      infoText: string;
      buttonText: string;
      handleConfirm: "new" | "";
    }>
  >;
};

type SideBarProviderProps = {
  children: ReactNode;
};

export const SideBarContext = createContext<SideBarContextValue>({
  sideBarOptions: "",
  handleSideBarSelection: () => {},
  popupText: { infoText: "", buttonText: "", handleConfirm: "" },
  setPopupText: () => {},
});

export const useSideBar = () => {
  return useContext(SideBarContext);
};

export const SideBarProvider: React.FC<SideBarProviderProps> = ({
  children,
}) => {
  const [sideBarOptions, setSideBarOptions] = useState<SideBarTypes>("");
  const [popupText, setPopupText] = useState<PopupTextType>({
    infoText: "",
    buttonText: "",
    handleConfirm: "",
  });

  const handleSideBarSelection = (selection: SideBarTypes) => {
    setSideBarOptions(selection);
  };

  return (
    <SideBarContext.Provider
      value={{
        sideBarOptions,
        handleSideBarSelection,
        popupText,
        setPopupText,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

import { createContext, useContext, useState, ReactNode } from "react";

type SideBarTypes = "components" | "preset" | "social" | "";

type SideBarDocsTypes =
  | "components"
  | "preset"
  | "social"
  | "controls"
  | "editor"
  | "uiCode"
  | "";

type HandleConfirmTypes =
  | "new"
  | "signup"
  | "login"
  | "open"
  | "save"
  | "account"
  | "";

export type PopupTextType = {
  infoText: string;
  buttonText: string;
  handleConfirm: HandleConfirmTypes;
};

type SideBarContextValue = {
  sideBarOptions: SideBarTypes;
  setSideBarOptions: (selection: SideBarTypes) => void;
  popupText: PopupTextType;
  setPopupText: React.Dispatch<
    React.SetStateAction<{
      infoText: string;
      buttonText: string;
      handleConfirm: HandleConfirmTypes;
    }>
  >;
  sideBarDocsOptions: SideBarDocsTypes;
  setSideBarDocsOptions: (selection: SideBarDocsTypes) => void;
};

type SideBarProviderProps = {
  children: ReactNode;
};

export const SideBarContext = createContext<SideBarContextValue>({
  sideBarOptions: "",
  setSideBarOptions: () => {},
  popupText: { infoText: "", buttonText: "", handleConfirm: "" },
  setPopupText: () => {},
  sideBarDocsOptions: "",
  setSideBarDocsOptions: () => {},
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
  const [sideBarDocsOptions, setSideBarDocsOptions] =
    useState<SideBarDocsTypes>("components");

  return (
    <SideBarContext.Provider
      value={{
        sideBarOptions,
        setSideBarOptions,
        popupText,
        setPopupText,
        sideBarDocsOptions,
        setSideBarDocsOptions,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

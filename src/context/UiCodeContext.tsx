import { createContext, useContext, useState, ReactNode } from "react";

type UiCodeContextValue = {
  uiCode: string;
  setUiCode: React.Dispatch<React.SetStateAction<string>>;
  showInstructions: boolean;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  showImages: boolean;
  setShowImages: React.Dispatch<React.SetStateAction<boolean>>;
  useCanvasInfo: boolean;
  setUseCanvasInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

type UiCodeProviderProps = {
  children: ReactNode;
};

export const UiCodeContext = createContext<UiCodeContextValue>({
  uiCode: "",
  setUiCode: () => {},
  showInstructions: false,
  setShowInstructions: () => {},
  showImages: false,
  setShowImages: () => {},
  useCanvasInfo: false,
  setUseCanvasInfo: () => {},
});

export const useUiCode = () => {
  return useContext(UiCodeContext);
};

export const UiCodeProvider: React.FC<UiCodeProviderProps> = ({ children }) => {
  const [uiCode, setUiCode] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [useCanvasInfo, setUseCanvasInfo] = useState(false);

  return (
    <UiCodeContext.Provider
      value={{
        uiCode,
        setUiCode,
        showInstructions,
        setShowInstructions,
        showImages,
        setShowImages,
        useCanvasInfo,
        setUseCanvasInfo,
      }}
    >
      {children}
    </UiCodeContext.Provider>
  );
};

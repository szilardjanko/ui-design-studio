import React from "react";

type SelectedContainerLayoutProps = {
  title: string;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  children: React.ReactNode;
};

export const SelectedContainerLayout = ({
  title,
  hidden,
  setHidden,
  children,
}: SelectedContainerLayoutProps) => {
  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-t from-slate-900 to-slate-800">
      <div
        className="mb-1 w-full cursor-pointer border-y border-slate-500 py-2 text-center text-white"
        onClick={() => setHidden(!hidden)}
      >
        {title}
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 ${
          hidden ? "max-h-0" : "max-h-96"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

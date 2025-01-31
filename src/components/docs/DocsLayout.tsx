import { SideBarDocs } from "./SideBarDocs";

export const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row text-white">
      <SideBarDocs />
      <div className="flex w-full flex-col">
        <div className="px-4 text-3xl font-bold md:text-4xl">Documentation</div>
        <div className="mt-2 flex max-h-[calc(100vh-10rem)] flex-row overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

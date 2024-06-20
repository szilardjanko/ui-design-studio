import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex select-none flex-row items-center justify-between bg-gradient-to-tl from-slate-900 to-slate-600 shadow shadow-slate-700">
      <div className="flex flex-row items-center justify-center">
        <Link
          href="https://github.com/szilardjanko/ui-design-studio"
          target="_blank"
          className="px-3 py-2 hover:bg-slate-700"
        >
          Github
        </Link>
      </div>
      <div className="">DCL UI Design Studio</div>
      <div className="mr-2"></div>
    </div>
  );
};

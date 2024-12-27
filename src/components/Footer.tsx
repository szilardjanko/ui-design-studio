import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="z-50 flex select-none flex-row items-center justify-between bg-gradient-to-tl from-slate-900 to-slate-600 shadow shadow-slate-700">
      <div className="flex flex-row items-center justify-center">
        <Link
          href="https://github.com/szilardjanko/ui-design-studio"
          target="_blank"
          className="px-3 py-2 text-white hover:bg-slate-700"
        >
          Github
        </Link>
        <Link
          href="/feedback"
          className="px-3 py-2 text-white hover:bg-slate-700"
        >
          Feedback
        </Link>
      </div>
      <div className="text-white">DCL UI Design Studio</div>
      <div className="mr-2"></div>
    </div>
  );
};

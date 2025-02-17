import Link from "next/link";
import { NavBarIcon } from "./icons/NavBarIcon";

export const NavBar = () => {
  return (
    <div className="z-50 mb-2 flex select-none flex-row items-center bg-gradient-to-tl from-slate-600 to-slate-900 shadow shadow-slate-700">
      <div className="flex flex-row items-center justify-center">
        <Link href="/" className="px-3 py-2 text-white hover:bg-slate-700">
          Home
        </Link>
        <Link
          href="/create"
          className="px-3 py-2 text-white hover:bg-slate-700"
        >
          Create UI
        </Link>
        <Link
          href="/account"
          className="px-3 py-2 text-white hover:bg-slate-700"
        >
          Account
        </Link>
        <Link href="/docs" className="px-3 py-2 text-white hover:bg-slate-700">
          Docs
        </Link>
      </div>
      <NavBarIcon />
    </div>
  );
};

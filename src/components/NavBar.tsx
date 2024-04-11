import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex flex-row items-center bg-gradient-to-tl from-slate-600 to-slate-900 mb-2 shadow shadow-slate-700">
      <div className="flex flex-row items-center justify-center">
        <Link href="/" className="hover:bg-slate-700 px-3 py-2">
          Home
        </Link>
        <Link href="/CreateUi" className="hover:bg-slate-700 px-3 py-2">
          Create UI
        </Link>
        <Link href="/Docs" className="hover:bg-slate-700 px-3 py-2">
          Docs
        </Link>
      </div>
    </div>
  );
};

export default NavBar;

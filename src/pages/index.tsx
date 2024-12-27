import { Roadmap } from "@/components/Roadmap";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="relative mx-auto flex select-none flex-col items-center justify-center text-center">
        <div className="relative z-10 flex w-full flex-col items-center justify-center">
          <div
            className="pb-1 text-3xl font-bold text-white hover:animate-pulse md:text-4xl"
            onMouseEnter={(e) => {
              e.currentTarget.style.transition = "color 2s ease";
              e.currentTarget.style.background =
                "linear-gradient(to right, #024d98, #ffb354, #d00137)";
              e.currentTarget.style.backgroundClip = "text";
              e.currentTarget.style.color = "transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transition = "";
              e.currentTarget.style.background = "";
              e.currentTarget.style.color = "";
            }}
          >
            DCL UI Design Studio
          </div>
          <div className="mt-2 text-xs tracking-tight text-white md:text-sm">
            Funded by the
          </div>
          <div className="-mt-2 w-64 md:w-72">
            <Image
              src={"/dclDAO.png"}
              alt="DCL DAO"
              width={7968}
              height={1170}
            />
          </div>
          <div className="-mt-5 w-52 md:-mt-8 md:w-80">
            <Image
              className="hover:animate-spin-slow"
              priority={true}
              src={"/uiIcon.png"}
              alt="DCL DAO"
              width={512}
              height={512}
            />
          </div>
          <div className="-mt-5 mb-8 w-11/12 text-sm text-white md:-mt-8 md:w-1/2 md:text-base">
            An open sourced web app enabling anyone to design interactive UIs
            for DCL scenes without coding.
            <br />
            This drag-and-drop platform simplifies UI creation, enhancing
            accessibility and efficiency for creators.
          </div>

          <Link
            href={"/create"}
            className="rounded-xl border border-slate-200 bg-slate-800 px-4 pb-3 pt-2 text-3xl font-bold text-white hover:bg-slate-700 md:text-4xl"
          >
            Create UI
          </Link>
          <Roadmap />
        </div>
        <div className="absolute inset-0 -left-full z-0 bg-[url('/uiIcon.png')] bg-cover blur-3xl brightness-50 md:left-0"></div>
      </div>
    </main>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="mx-auto flex select-none flex-col items-center justify-center text-center">
        <div className="pb-1 text-3xl font-bold md:text-4xl">
          DCL UI Design Studio
        </div>
        <div className="mt-2 text-xs tracking-tight md:text-sm">
          Funded by the
        </div>
        <div className="-mt-2 w-64 md:w-72">
          <Image src={"/dclDAO.png"} alt="DCL DAO" width={7968} height={1170} />
        </div>
        <div className="-mt-5 w-52 md:-mt-8 md:w-80">
          <Image
            priority={true}
            src={"/uiIcon.png"}
            alt="DCL DAO"
            width={512}
            height={512}
          />
        </div>
      </div>
    </main>
  );
}

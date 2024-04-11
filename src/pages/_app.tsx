import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";
import { SideBarProvider } from "@/context/SideBarContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SideBarProvider>
        <div className="flex min-h-screen flex-col bg-gradient-to-bl from-slate-800 to-black">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </SideBarProvider>
    </ThemeProvider>
  );
}

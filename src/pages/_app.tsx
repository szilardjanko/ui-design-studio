import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { SideBarProvider } from "@/context/SideBarContext";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { UiElementProvider } from "@/context/UiElementContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UiElementProvider>
        <SideBarProvider>
          <div className="flex min-h-screen flex-col bg-gradient-to-bl from-slate-800 to-black text-white">
            <NavBar />
            <div className="flex-grow">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </SideBarProvider>
      </UiElementProvider>
    </ThemeProvider>
  );
}

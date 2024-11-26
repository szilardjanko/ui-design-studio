import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import { SideBarProvider } from "@/context/SideBarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UiElementProvider } from "@/context/UiElementContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UiElementProvider>
        <SideBarProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-gradient-to-bl from-slate-800 to-black text-white">
              <NavBar />
              <div className="flex-grow">
                <Component {...pageProps} />
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </SideBarProvider>
      </UiElementProvider>
    </ThemeProvider>
  );
}

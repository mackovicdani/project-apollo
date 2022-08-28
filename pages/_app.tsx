import { prepareClientPortals } from "@jesstelford/react-portal-universal";
import type { AppProps } from "next/app";
import "../styles/globals.css";

if (typeof window !== "undefined") {
  prepareClientPortals();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="modal" />
      <div className="dark">
        <div className="h-screen bg-sky-200 p-2 dark:bg-zinc-800">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;

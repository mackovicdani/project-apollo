import { prepareClientPortals } from "@jesstelford/react-portal-universal";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import SideBar from "../components/global/SideBar/SideBar";
import { store } from "../store";
import "../styles/globals.css";

if (typeof window !== "undefined") {
  prepareClientPortals();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="modal" />

      <Provider store={store}>
        <SideBar></SideBar>
        <main className="h-screen bg-back">
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}

export default MyApp;

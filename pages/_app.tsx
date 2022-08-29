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
      <div>
        <div className="h-screen bg-back text-text">
          <Provider store={store}>
            <SideBar></SideBar>
            <main className="justify-right fixed left-32 right-0 top-0 bottom-0 flex bg-back">
              <Component {...pageProps} />
            </main>
          </Provider>
        </div>
      </div>
    </>
  );
}

export default MyApp;

import { prepareClientPortals } from "@jesstelford/react-portal-universal";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import SideBar from "../components/global/SideBar/SideBar";
import { Provider, useCreateStore } from "../lib/store";
import "../styles/globals.css";

if (typeof window !== "undefined") {
  prepareClientPortals();
}

function MyApp({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  const router = useRouter();
  const isSideBarVisible =
    !router.pathname.endsWith("/login") && !router.pathname.endsWith("/signup");
  return (
    <>
      <Provider createStore={createStore}>
        <div id="modal" />

        {isSideBarVisible && <SideBar></SideBar>}
        <main
          className={`h-auto bg-dark xl:h-screen ${
            isSideBarVisible ? "mb-20 lg:ml-80 lg:mb-0" : ""
          }`}
        >
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}

export default MyApp;

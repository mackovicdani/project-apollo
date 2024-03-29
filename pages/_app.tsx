import { prepareClientPortals } from "@jesstelford/react-portal-universal";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NotificationContainer from "../components/global/notification/NotificationContainer";
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
        <div id="modal">
          <NotificationContainer />
        </div>

        {isSideBarVisible && <SideBar></SideBar>}
        <main
          className={`h-auto min-h-screen bg-dark 2xl:h-screen ${
            isSideBarVisible ? "mb-16 2xl:ml-80 2xl:mb-0" : ""
          }`}
        >
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}

export default MyApp;

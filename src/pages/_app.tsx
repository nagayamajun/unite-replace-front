import { Loading } from "@/components/organisms/Loading/Loading";
import { ToastModal } from "@/components/organisms/Modal/ToastModal";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
      <RecoilRoot>
        <ToastContainer position="top-right" theme="colored" />
        <Loading />
        <ToastModal />
        {
          getLayout(
            <Component {...pageProps} />
          )
        }
      </RecoilRoot>
  );
};

export default App;

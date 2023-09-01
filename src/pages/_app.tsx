import { Loading } from "@/components/organisms/Loading/Loading";
import { ToastModal } from "@/components/organisms/Modal/ToastModal";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";

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

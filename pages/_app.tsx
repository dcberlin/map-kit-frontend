import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";

import {
  PoisProvider,
  SearchPhraseProvider,
  SelectedCategoryProvider,
  SelectedPoiProvider,
} from "../context";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import {AppProps} from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  // use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}
        audience={process.env.NEXT_PUBLIC_AUTH_AUDIENCE}
        redirectUri={process.env.NEXT_PUBLIC_WEB_APP_BASE_URL}
        scope="openid profile email"
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <PoisProvider>
          <SelectedPoiProvider>
            <SelectedCategoryProvider>
              <SearchPhraseProvider>
                {getLayout(<Component {...pageProps} />)}
              </SearchPhraseProvider>
            </SelectedCategoryProvider>
          </SelectedPoiProvider>
        </PoisProvider>
      </Auth0Provider>
    </>
  );
}

export default MyApp;

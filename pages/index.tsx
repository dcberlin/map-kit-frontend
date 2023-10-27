import React from "react";
import Link from "next/link";
import useSWR from "swr";
import {useAuth0} from "@auth0/auth0-react";
import {PlusCircleIcon} from "@heroicons/react/outline";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import {URLS} from "../api";
import {Community} from "../models";
import FrontLayout from "../components/layout/frontLayout";
import {NextPageWithLayout} from "./_app";
import absoluteUrl from "next-absolute-url";

interface LandingPageProps {
  host: string
}

/**
 * Landing page with an overview of all published communities.
 */
const LandingPage: NextPageWithLayout<LandingPageProps> = ({host}) => {
  const {loginWithRedirect} = useAuth0();

  const {data, error} = useSWR<Community[], Error>(URLS.COMMUNITIES, async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  if (error) {
    console.error(error);
    return <ErrorScreen />;
  }

  if (!data) {
    return <LoadingScreen />;
  }

  return(
    <FrontLayout data={data}/>
  );

}

// this adds the host to the props, together with the prodocol
LandingPage.getInitialProps = async ({req}) => {
  const {origin: host} = absoluteUrl(req, 'localhost:3000');
  return {host: host};
}

export default LandingPage;

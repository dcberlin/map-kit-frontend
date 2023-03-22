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

  return <>
    {data.map((community, index) =>
      <Link
        key={index}
        href={`/${community.path_slug}`}
        className={`flex grow justify-center items-center w-80 h-32 md:h-48 bg-gradient-to-r
                from-cyan-700 to-blue-700 rounded-lg hover:hue-rotate-60`}
        legacyBehavior>
        <h2 className="flex grow justify-center items-center w-80 h-32 md:h-48 bg-gradient-to-r
                from-cyan-700 to-blue-700 rounded-lg hover:hue-rotate-60 text-white cursor-pointer text-3xl font-bold">{community.name}</h2>
      </Link>)}
    <a
      className={`flex flex-col gap-2 justify-center items-center max-w-max h-48 bg-gradient-to-r
          from-gray-500 to-purple-500 rounded-lg hover:hue-rotate-60 p-7 text-center cursor-pointer`}
      onClick={() => loginWithRedirect({redirectUri: `${host}/my-communities/create`})}
    >
      <PlusCircleIcon className="h-10 w-10 text-white" />
      <h2 className="text-2xl text-white font-bold">
        Propune o comunitate nouă!
      </h2>
    </a>
  </>;
}

LandingPage.getLayout = (page) => <FrontLayout>{page}</FrontLayout>

// this adds the host to the props, together with the prodocol
LandingPage.getInitialProps = async ({req}) => {
  const {origin: host} = absoluteUrl(req, 'localhost:3000');
  return {host: host};
}

export default LandingPage;

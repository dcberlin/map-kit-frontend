import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import {useAuth0} from "@auth0/auth0-react";
import {PlusCircleIcon} from "@heroicons/react/outline";

import AuthWidget from "../components/auth-widget";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import {URLS} from "../api";
import {Community} from "../models";

/**
 * Landing page with an overview of all published communities.
 */
export default function LandingPage() {
  const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();

  const {data, error} = useSWR<Community[], Error>(URLS.COMMUNITIES, async (url) => {
    const res = await fetch(url);
    return res.json();
  });
  if (error) {
    console.error(error);
    return <ErrorScreen/>;
  }
  if (!data) {
    return <LoadingScreen/>;
  }

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen bg-gray-200">
      <AuthWidget/>
      <div className="flex flex-col h-2/5 gap-5 p-8 mt-12 items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center">Harta Diasporei</h1>
        <h4 className="text-xl md:text-2xl text-center">Kit de dezvoltare pentru harta comunității românești din orașul
          tău</h4>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div
          className={`flex flex-wrap w-2/3 gap-4 p-4 place-content-start drop-shadow-2xl
          rounded-xl bg-white`}
        >
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
            onClick={() => loginWithRedirect({redirectUri: `${window.location.origin}/my-communities/create`})}
          >
            <PlusCircleIcon className="h-10 w-10 text-white"/>
            <h2 className="text-2xl text-white font-bold">
              Propune o comunitate nouă!
            </h2>
          </a>
        </div>
      </div>
      <div className="w-full mt-12">
        <div className="flex flex-col md:flex-row gap-8 p-12 justify-center">
          <a href="https://diasporacivica.berlin" target="_blank" rel="noreferrer">
            <h3 className="text-gray-800 mb-3">realizat de</h3>
            <Image
              src="/logo-dcb.png"
              alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
              width={150}
              height={65}
            />
          </a>
          <a href="https://dprp.gov.ro/" target="_blank" rel="noreferrer">
            <h3 className="text-gray-800 mb-3">finanţat de</h3>
            <Image
              src="/logo-drp.png"
              alt="Logo al Guvernului României cu textul 'Departamentul pentru românii de pretutindeni' alături"
              width={270}
              height={100}
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center text-xs pb-4 px-12 text-gray-800">
        <p>Conţinutul acestui site nu reprezintă poziţia oficială a Departamentului pentru românii de pretutindeni.</p>
      </div>
    </div>
  );
}

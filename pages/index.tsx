import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { PlusIcon } from "@heroicons/react/solid";

import AuthWidget from "../components/auth-widget";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import { URLS } from "../api";

/**
 * Landing page with an overview of all published communities.
 */
export default function LandingPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { data, error } = useSWR(URLS.COMMUNITIES, async (url) => {
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

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <AuthWidget />
      <div
        className={`flex flex-wrap w-2/3 gap-4 p-4 place-content-start drop-shadow-2xl
        rounded-xl bg-white`}
      >
        {data.map((community, index) => {
          return (
            <Link key={index} href={`/${community.path_slug}`}>
              <a
                className={`flex justify-center items-center w-80 h-48 bg-gradient-to-r
                from-cyan-700 to-blue-700 rounded-lg hover:hue-rotate-60`}
              >
                <h2 className="text-4xl text-white font-bold">
                  {community.name}
                </h2>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

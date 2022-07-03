import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { PlusIcon } from "@heroicons/react/solid";

import ErrorScreen from "../components/error-screen";
import AuthWidget from "../components/auth-widget";

/**
 * Landing page with an overview of all published communities.
 */
export default function Communities() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities/`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  if (data) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
        <AuthWidget />
        <div className="flex flex-wrap w-2/3 gap-4 p-4 place-content-start drop-shadow-2xl rounded-xl bg-white">
          {data.map((community, index) => {
            return (
              <Link key={index} href={`/${community.path_slug}`}>
                <a className="flex justify-center items-center w-80 h-48 bg-gradient-to-r from-cyan-700 to-blue-700 rounded-lg hover:hue-rotate-60">
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
  } else if (error) {
    console.error(error);
    return <ErrorScreen />;
  }
}

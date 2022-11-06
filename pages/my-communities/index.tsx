import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MapIcon,
  PencilAltIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import ErrorScreen from "../../components/error-screen";
import AuthWidget from "../../components/auth-widget";
import LoadingScreen from "../../components/loading-screen";
import { URLS } from "../../api";

/**
 * Overview page of all communites managed bu the the authenticated user.
 */
export default function MyCommunities() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const yesIcon = <CheckCircleIcon className="w-5 h-5 text-green-400" />;
  const noIcon = <XCircleIcon className="w-5 h-5 text-red-400" />;
  const router = useRouter();

  const { data, error } = useSWR(
    URLS.COMMUNITIES_ADMIN,
    async (url) => {
      const token = await getAccessTokenSilently();
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
    { revalidateOnMount: true }
  );

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

      <div className="flex flex-col h-2/3 w-2/3 gap-6 p-6 justify-between bg-white rounded-xl overflow-auto drop-shadow-2xl">
        <div className="flex w-full justify-end">
          <Link href="/" legacyBehavior>
            <button>
              <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
            </button>
          </Link>
        </div>
        <h1 className="font-bold text-gray-600 mb-4">Comunităţile mele</h1>
        <table className="table-auto min-w-full">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Nume</th>
              <th className="p-4 text-left">Aprobată</th>
              <th className="p-4 text-left">Publicată</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((community, index) => {
              return (
                <tr key={index} className="w-20 border-b">
                  <td className="p-4">{community.name}</td>
                  <td className="p-4">
                    {community.approved ? yesIcon : noIcon}
                  </td>
                  <td className="p-4">
                    {community.published ? yesIcon : noIcon}
                  </td>
                  <td className="p-4">
                    <Link href={`/my-communities/${community.pk}`} legacyBehavior>
                      <button className="flex h-full gap-3 items-center justify-end">
                        <PencilAltIcon className="w-6 h-6 text-blue-700" />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td className="p-4 text-gray-500">
                  Nu administrezi nicio comunitate momentan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex flex-col justify-end flex-grow">
          <Link href="/my-communities/create" legacyBehavior>
            <button className="inline-flex justify-center font-semibold px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500">
              Propune o comunitate nouă
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

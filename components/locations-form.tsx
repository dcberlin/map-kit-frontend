import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Field, Form } from "formik";
import {
  CheckCircleIcon,
  PencilAltIcon,
  XCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import { URLS } from "../api";

export default function LocationsForm({ communityPk }) {
  const [locations, setLocations] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const { userError } = useSWR(URLS.USER, async (url) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const body = await res.json();
      setUser(body);
    }
  });
  const { locError } = useSWR(
    communityPk && user?.approved
      ? `${URLS.LOCATIONS_ADMIN}/?community=${communityPk}`
      : null,
    async (url) => {
      const token = await getAccessTokenSilently();
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const body = await res.json();
        setLocations(body);
      }
    }
  );
  if (userError || locError) {
    setLoading(false);
    console.error(error);
    return <ErrorScreen />;
  }
  if (!user) {
    return <LoadingScreen />;
  }
  if (!locations && !user.approved) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="flex justify-around gap-2 items-center text-gray-400">
          <LockClosedIcon className="w-5 h-5" />
          Userul tău nu a fost aprobat încă.
        </div>
      </div>
    );
  }
  if (!locations) {
    return <LoadingScreen />;
  }

  const yesIcon = <CheckCircleIcon className="w-5 h-5 text-green-400" />;
  const noIcon = <XCircleIcon className="w-5 h-5 text-red-400" />;

  return (
    <div>
      <table className="table-auto min-w-full mt-8">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4 text-left">Nume</th>
            <th className="p-4 text-left">Publicată</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => {
            return (
              <>
                <tr key={index} className="w-20 border-b">
                  <td className="p-4">{location.name}</td>
                  <td className="p-4">
                    {location.published ? yesIcon : noIcon}
                  </td>
                </tr>
              </>
            );
          })}
          {locations.length === 0 && (
            <tr>
              <td className="p-4 text-gray-500">
                Comunitatea ta nu are nicio locaţie momentan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

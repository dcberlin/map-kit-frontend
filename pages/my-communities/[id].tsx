import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeIcon,
} from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Field, Form } from "formik";

import AuthWidget from "../../components/auth-widget";
import CommunityForm from "../../components/community-form";
import LocationsForm from "../../components/locations-form";
import ErrorScreen from "../../components/error-screen";
import LoadingScreen from "../../components/loading-screen";
import { URLS } from "../../api";

/*
 * Detail page of one community managed by the the authenticated user.
 */
export default function MyCommunityEditDetail() {
  const [community, setCommunity] = React.useState(null);
  const router = useRouter();
  const { id: communityPk } = router.query;
  const [requestFailed, setRequestFailed] = React.useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const DETAIL_URL = `${URLS.COMMUNITIES_ADMIN}/${communityPk}/`;

  const {error} = useSWR(
    communityPk ? DETAIL_URL : null,
    async (url) => {
      const token = await getAccessTokenSilently();
      const res = await fetch(url, {headers: {Authorization: `Bearer ${token}`}});
      const response = await res.json();
      setCommunity(response);
    });

  async function handleSubmit(values) {
    const token = await getAccessTokenSilently();
    fetch(DETAIL_URL, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        setRequestFailed(true);
      } else {
        router.back();
      }
    });
  }

  if (error) {
    console.error(error);
    return <ErrorScreen />;
  }
  if (!community) {
    return <LoadingScreen />;
  }
  return <>
    <AuthWidget />
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-200">
      <div className="flex flex-col mt-20 mb-20 w-2/3 p-12 drop-shadow-2xl bg-white rounded-xl overflow-auto">
        <div className="flex w-full justify-end">
          <Link href="/my-communities" legacyBehavior>
            <button onClick={() => router.back()}>
              <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
            </button>
          </Link>
        </div>
        <h1 className="text-gray-600 mb-10">
          Comunitatea <span className="font-bold">{community.name}</span>
        </h1>
        <div className="flex flex-col gap-7">
          <CollapsibleSection title="Profil" collapsed={false}>
            <CommunityForm
              initialValues={community}
              onSubmit={handleSubmit}
              requestFailed={requestFailed}
            />
          </CollapsibleSection>
          <CollapsibleSection title="Locaţii" collapsed={false}>
            <LocationsForm communityPk={community.pk} />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  </>;
}

function CollapsibleSection({
  title,
  collapsed: collapsedInitial = true,
  children,
}) {
  const [collapsed, setCollapsed] = React.useState(collapsedInitial);
  return (
    <div className="border-2 border-gray-200 p-6 rounded-lg">
      <div
        className={`flex items-center text-gray-600 cursor-pointer`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronDownIcon className="h-8 w-8" />
        ) : (
          <ChevronUpIcon className="h-8 w-8" />
        )}
        <h2 className="ml-4">{title}</h2>
      </div>
      {!collapsed && <div>{children}</div>}
    </div>
  );
}

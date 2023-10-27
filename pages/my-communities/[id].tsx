import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";
import AuthWidget from "../../components/auth-widget";
import CommunityForm from "../../components/community-form";
import LocationsForm from "../../components/locations-form";
import ErrorScreen from "../../components/error-screen";
import LoadingScreen from "../../components/loading-screen";
import { URLS } from "../../api";
import useSWRMutation from "swr/mutation";
import { CollapsibleSection } from "../../components/collapsible-section";
import { Community, LocationCategory } from "../../models";
import { GetServerSideProps } from "next";
import MapHeader from "../../components/map-header";

interface MyCommunityEditDetailProps {
  locationCategories: LocationCategory[];
}

/*
 * Detail page of one community managed by the authenticated user.
 */
export default function MyCommunityEditDetail({
  locationCategories,
}: MyCommunityEditDetailProps) {
  const [community, setCommunity] = React.useState<Community>(null);
  const router = useRouter();
  const { id: communityPk } = router.query;
  const [requestFailed, setRequestFailed] = React.useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const detailUrl = `${URLS.COMMUNITIES_ADMIN}${communityPk}/`;

  const { error: communityFetchError } = useSWR<Community>(
    communityPk ? detailUrl : null,
    async (url) => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      });
      return res.json();
    },
    {
      onSuccess: (community) => setCommunity(community),
      onError: () => setRequestFailed(true),
    },
  );

  const { trigger: handleSubmit } = useSWRMutation(
    detailUrl,
    async (url, { arg: values }) => {
      return fetch(url, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
      }).then((response) => {
        if (response.status !== 200) {
          setRequestFailed(true);
          return;
        }
        router.back();
      });
    },
  );

  if (communityFetchError) {
    console.error(communityFetchError);
    return <ErrorScreen message={communityFetchError} />;
  }

  if (!community) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapHeader community={community} inAdminScreen />
      <div className="fixed z-30 right-3 top-3">
        <AuthWidget />
      </div>
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
            <CommunityForm
              initialValues={community}
              onSubmit={handleSubmit}
              requestFailed={requestFailed}
            />
            <CollapsibleSection title="Locaţii" collapsed={false}>
              <LocationsForm
                community={community}
                possibleLocationCategories={locationCategories}
              />
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59",
  );
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`,
  );
  const locationCategories = await categoriesResponse.json();
  return { props: { locationCategories } as MyCommunityEditDetailProps };
};

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";

import AuthWidget from "../../components/auth-widget";
import CommunityForm from "../../components/community-form";
import { LngLatBoundsLike } from "mapbox-gl";
import { Community } from "../../models";

/**
 * Page for submitting a new community proposal.
 */
export default function CommunityCreateProposal() {
  const [requestFailed, setRequestFailed] = React.useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();
  const globalBbox: LngLatBoundsLike = [
    -168.046875, -63.074866, 168.046875, 62.995158,
  ];

  async function handleSubmit(values) {
    const token = await getAccessTokenSilently();
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities-admin/`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status !== 201) {
        setRequestFailed(true);
      } else {
        router.push("/my-communities");
      }
    });
  }

  return (
    <>
      <div className="fixed z-30 right-3 top-3">
        <AuthWidget />
      </div>
      <div className="flex w-screen items-center justify-center bg-gray-200">
        <div className="flex flex-col mt-32 mb-20 h-2/3 w-2/3 gap-6 px-20 py-12 drop-shadow-2xl bg-white rounded-xl overflow-auto">
          <div className="flex w-full justify-end">
            <Link href="/my-communities" legacyBehavior>
              <button>
                <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
              </button>
            </Link>
          </div>
          <h1 className="font-bold text-gray-600">Propune o comunitate nouă</h1>
          <div className="">
            <CommunityForm
              initialValues={
                { name: "", description: "", bbox: globalBbox } as Community
              }
              onSubmit={handleSubmit}
              requestFailed={requestFailed}
            />
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import useSWR from "swr";
import Map from "react-map-gl";
import { useRouter } from "next/router";
import { ArrowLeftIcon, GlobeIcon } from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Field, Form } from "formik";
import { WebMercatorViewport } from "@math.gl/web-mercator";

import AuthWidget from "../../components/auth-widget";
import CommunityForm from "../../components/community-form";
import LoadingScreen from "../../components/loading-screen";

/**
 * Page for submitting a new community proposal.
 */
export default function CommunityMap({ communityId }) {
  const [community, setCommunity] = React.useState(null);
  const [requestFailed, setRequestFailed] = React.useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();
  const globalBbox = [-168.046875, -63.074866, 168.046875, 62.995158];

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
        router.back();
      }
    });
  }

  function validateForm(values, props) {
    const errors = {};

    if (!values.name) {
      errors.name = "Numele este câmp obligatoriu.";
    }

    if (!values.path_slug) {
      errors.path_slug = "Sufixul adresei web este câmp obligatoriu.";
    }
    if (
      values.path_slug !== "" &&
      !/^[a-z0-9\-]{3,50}$/i.test(values.path_slug)
    ) {
      errors.path_slug =
        "Sufixul poate fi format doar din caractere mici, cifre şi cratime şi trebuie să aibă între 3 si 50 de caractere.";
    }

    return errors;
  }

  return (
    <>
      <AuthWidget />
      <div className="flex w-screen items-center justify-center bg-gray-200">
        <div className="flex flex-col mt-20 mb-20 h-2/3 w-2/3 gap-6 px-20 py-12 drop-shadow-2xl bg-white rounded-xl overflow-auto">
          <div className="flex w-full justify-end">
            <button onClick={() => router.back()}>
              <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <h1 className="font-bold text-gray-600">Propune o comunitate nouă</h1>
          <div className="">
            <CommunityForm
              initialValues={{ name: "", description: "", bbox: globalBbox }}
              onSubmit={handleSubmit}
              requestFailed={requestFailed}
            />
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ArrowLeftIcon, GlobeIcon } from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Field, Form } from "formik";

import AuthWidget from "../../components/auth-widget";
import GenericError from "../../components/error";
import LoadingScreen from "../../components/loading-screen";

export default function MyCommunity() {
  const [community, setCommunity] = React.useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { getAccessTokenSilently } = useAuth0();
  const [requestFailed, setRequestFailed] = React.useState(false);

  const { error } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities-admin/${id}/`
      : null,
    async (url) => {
      const token = await getAccessTokenSilently();
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      setCommunity(response);
    }
  );

  async function handleSubmit(values) {
    const token = await getAccessTokenSilently();
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities-admin/${id}/`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.status !== 200) {
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

    if (!values.approved && values.published) {
      errors.published =
        "Nu poţi publica harta până nu e aprobată comunitatea.";
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

  if (error) {
    console.error(error);
    return <GenericError />;
  }
  if (!community) {
    return <LoadingScreen />;
  }
  return (
    <>
      <AuthWidget />
      <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
        <div className="flex flex-col h-2/3 w-2/3 gap-5 px-20 py-12 drop-shadow-2xl bg-white rounded-xl overflow-auto">
          <div className="flex w-full justify-end">
            <button onClick={() => router.back()}>
              <ArrowLeftIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <div className="">
            <Formik
              initialValues={community}
              onSubmit={handleSubmit}
              validate={validateForm}
            >
              {({ errors, touched }) => (
                <Form className="mt-8">
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm mb-2 font-semibold"
                      htmlFor="name"
                    >
                      Numele regiunii/oraşului
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        touched.name && errors.name && "border-red-500"
                      }`}
                      name="name"
                      id="name"
                      type="text"
                      placeholder='de ex. "Magdeburg"'
                    />
                    <p className="text-red-500 my-1 text-sm h-4">
                      {touched.name && errors.name}
                    </p>
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm mb-2 font-semibold"
                      htmlFor="path_slug"
                    >
                      Sufixul adresei web
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        touched.path_slug &&
                        errors.path_slug &&
                        "border-red-500"
                      }`}
                      name="path_slug"
                      id="path_slug"
                      type="text"
                      placeholder='de ex. "bonn" sau "frankfurt-am-main"'
                    />
                    <p className="text-red-500 my-1 text-sm h-4">
                      {touched.path_slug && errors.path_slug}
                    </p>
                  </div>
                  <div className="mb-2 pb-4">
                    <label
                      className="block text-gray-700 text-sm mb-2 font-semibold"
                      htmlFor="description"
                    >
                      Descriere
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="description"
                      id="description"
                      type="text"
                      placeholder='de ex. "Comunitatea diasporei române din regiunea X"'
                    />
                  </div>
                  <div className="mb-2 pb-4">
                    <label
                      className="block text-gray-700 text-sm mb-2 font-semibold"
                      htmlFor="published"
                    >
                      Publicată
                    </label>
                    <Field
                      className="shadow border rounded h-5 w-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="published"
                      id="published"
                      type="checkbox"
                    />
                    <p className="text-red-500 my-1 text-sm h-4">
                      {touched.published && errors.published}
                    </p>
                  </div>

                  <div className="flex mt-8 items-center justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center font-semibold px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    >
                      Salvează
                    </button>
                  </div>
                  {requestFailed && (
                    <p className="text-red-500 my-3 text-sm font-semibold h-4">
                      Oops, ceva n-a mers :( mai încearcă sau contactează-ne la
                      contact@diasporacivica.berlin
                    </p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

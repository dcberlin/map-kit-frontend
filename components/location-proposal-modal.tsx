import React, { useState } from "react";
import { Field, Form, Formik } from "formik";

import { PlusCircleIcon } from "@heroicons/react/outline";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

/**
 * Modal for proposing a new location
 */
export default function LocationProposalModal({ communityPk }) {
  let [isOpen, setIsOpen] = React.useState(false);
  let [locationSubmitted, setLocationSubmitted] = React.useState(false);
  let [requestFailed, setRequestFailed] = React.useState(false);
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);

  const handleAddress = (e) => {
    setAddress(e.value.description);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setLocationSubmitted(false);
    setRequestFailed(false);
    setIsOpen(true);
  }

  async function handleSubmit(values) {
    if (address) {
      setErrorAddress(false);
      values.address = address;
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/location-proposal/`, {
        method: "POST",
        body: JSON.stringify({ ...values, community: communityPk }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.status !== 201) {
          setRequestFailed(true);
        } else {
          setLocationSubmitted(true);
        }
      });
    } else {
      setErrorAddress(true);
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = "Numele este câmp obligatoriu.";
    }
    if (
      values.email !== "" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Adresa de mail este invalidă.";
    }
    if (values.website !== "" && !/^https?:\/\/.*$/.test(values.website)) {
      errors.website = "Adresa site-ului este invalidă.";
    }

    return errors;
  }

  const SubmissionForm = (
    <>
      <h3 className="text-lg font-semibold leading-6 text-gray-900">
        💌 Lipseşte vreun loc? Trimite-ni-l!
      </h3>
      <Formik
        initialValues={{
          name: "",
          address: address,
          address_details: "",
          description: "",
          website: "",
          email: "",
          phone: "",
        }}
        onSubmit={(values, { setFieldValue }) => {
          try {
            setFieldValue("address", address);
            handleSubmit(values);
          } catch (error) {
            console.log(error);
          }
        }}
        validate={validate}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col mt-8 gap-2">
            <div>
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="name"
              >
                Numele locaţiei
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  touched.name && errors.name && "border-red-500"
                }`}
                name="name"
                id="name"
                type="text"
                placeholder="Centrul comunitar Gropiusstadt"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 my-1 text-sm h-4">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="address"
              >
                Adresa
              </label>
              <Field
                style={{ display: "none" }}
                name="address"
                id="address"
                value={address}
                type="text"
                placeholder="Karl-Marx-Allee 999, 10101 Berlin"
              />

              <GooglePlacesAutocomplete
                debounce={800}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                selectProps={{
                  onChange: (e) => {
                    handleAddress(e);
                  },
                }}
                autocompletionRequest={{
                  types: ["address"],
                  language: "ro",
                }}
              />
              {errorAddress && (
                <p className="text-red-500 my-1 text-sm h-4">
                  Adresa este câmp obligatoriu.
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="address_details"
              >
                Detalii Adresa (opţional)
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="address_details"
                id="address_details"
                type="text"
                placeholder="Alte detalii despre adresă (etaj, intrare, etc.)"
              />
            </div>
            <div>
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
                placeholder="Centru care organizează activităţi sociale."
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="website"
              >
                Website
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  touched.website && errors.website && "border-red-500"
                }`}
                name="website"
                id="website"
                type="url"
                placeholder="https://example.com"
              />
              {touched.website && errors.website && (
                <p className="text-red-500 my-1 text-sm h-4">
                  {errors.website}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="email"
              >
                E-Mail
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  touched.email && errors.email && "border-red-500"
                }`}
                name="email"
                id="email"
                type="email"
                placeholder="centru@example.com"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 my-1 text-sm h-4">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="phone"
              >
                Telefon
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                id="phone"
                type="tel"
                placeholder="+49 0819 1234 5678"
              />
            </div>

            <div className="flex mt-8 items-center justify-between">
              <button
                type="button"
                className="inline-flex justify-center font-semibold px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                onClick={closeModal}
              >
                Anulează
              </button>
              <button
                type="submit"
                className="inline-flex justify-center font-semibold px-4 py-2 text-sm font-medium text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              >
                Trimite
              </button>
            </div>
            {requestFailed && (
              <p className="text-red-500 my-3 text-xs font-semibold h-4">
                Oops, ceva n-a mers :( Mai încearcă o dată sau contactează-ne la
                contact@diasporacivica.berlin
              </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );

  const SuccessContent = (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold leading-6 text-gray-900">
        🎉 Mulţumim pentru sugestie!
      </h3>
      <div className="flex mt-8 justify-center">
        <button
          type="button"
          className="inline-flex justify-center font-semibold px-4 py-2 text-sm font-medium text-gray-800 border-2 border-green-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
          onClick={closeModal}
        >
          Cu plăcere 😁
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed h-12 bottom-[10%] w-12 h-12 bg-white right-0 rounded-l-full p-2 text-gray-600"
      >
        <PlusCircleIcon />
      </button>

      <div
        className={`fixed inset-0 overflow-y-auto z-50 transition ${
          !isOpen && "translate-x-full"
        }`}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            {locationSubmitted ? SuccessContent : SubmissionForm}
          </div>
        </div>
      </div>
    </>
  );
}

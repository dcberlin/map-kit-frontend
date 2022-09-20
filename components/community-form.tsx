import React from "react";
import { Formik, Field, Form } from "formik";
import { WebMercatorViewport } from "@math.gl/web-mercator";
import Map from "react-map-gl";
import { PencilAltIcon } from "@heroicons/react/solid";

export default function CommunityForm({
  onSubmit,
  initialValues,
  requestFailed,
}) {
  const [mapEditable, setMapEditable] = React.useState(false);
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateForm}
    >
      {({ errors, touched, setFieldValue }) => (
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
                touched.path_slug && errors.path_slug && "border-red-500"
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
          <div className="flex flex-col items-center justify-around gap-3 py-10">
            <label
              className="block text-gray-700 text-sm mb-2 font-semibold"
              htmlFor="bbox"
            >
              Cadrul geografic al hărţii
            </label>
            <div className="flex items-center justify-center rounded-xl drop-shadow-xl h-full w-full">
              {!mapEditable && (
                <div
                  className="absolute bg-black opacity-30 w-[100vh] h-[60vh] z-10 cursor-pointer"
                  onClick={() => setMapEditable(true)}
                >
                  <div className="flex h-full w-full items-center justify-center text-white font-bold text-lg">
                    <PencilAltIcon className="h-8 w-8" />
                    Click aici pentru a edita cadrul
                  </div>
                </div>
              )}
              <Map
                id="bbox"
                initialViewState={{
                  bounds: initialValues.bbox,
                }}
                style={{
                  position: "relative",
                  width: "100vh",
                  height: "60vh",
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/03b8/ckvzmtn0k14xr14n7vg8aqske"
                onMoveEnd={(e) => {
                  if (setMapEditable) {
                    const viewport = new WebMercatorViewport({
                      longitude: e.viewState.longitude,
                      latitude: e.viewState.latitude,
                      zoom: e.viewState.zoom,
                      width: e.originalEvent.clientX,
                      height: e.originalEvent.clientY,
                    });
                    const bounds = viewport.getBounds();
                    setFieldValue("bbox", [...bounds[0], ...bounds[1]]);
                  }
                }}
              />
            </div>
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
  );
}

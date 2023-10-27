import React, { useState } from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { ArrowRightIcon } from "@heroicons/react/solid";

export default function CitiesModal({cities = null, zoomToCity }) {
    let [isOpen, setIsOpen] = React.useState(false);

    function closeModal() {
        setIsOpen(false);
      }

    function openModal() {
        setIsOpen(true);
    }


    return(<>
    <div className="fixed left-7 sm:right-[140px] sm:left-auto top-5 z-20">
        <button className="flex items-center gap-1 mr-3 bg-white pl-4 pr-1 rounded-3xl drop-shadow-2xl" onClick={openModal}>
          <span className="text-md font-bold text-gray-600">Comunități</span>
          <LocationMarkerIcon className="h-10 w-10 text-gray-400" />
        </button>
    </div>


    <div
        className={`fixed inset-0 overflow-y-auto z-50 transition ${
          !isOpen && "translate-x-full"
        }`}
      >
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div>
            <ul>
                {cities != null &&
                cities.map((city) => (
                  <li
                    key={city.pk}
                    onClick={() => {closeModal();zoomToCity(city)}}
                    className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center">
                      <LocationMarkerIcon className="text-red-500 h-8 w-8 mr-4" />
                      <span className="text-gray-800">{city.name}</span>
                    </div>
                    <div className="text-gray-500">
                        <ArrowRightIcon className="h-5 w-5 mr-5" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
                <div className="flex mt-8 items-center justify-between">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        onClick={closeModal}
                    >
                        Anulează
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>);

}
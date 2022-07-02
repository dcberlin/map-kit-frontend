import React from "react";
import { ChevronRightIcon, ViewListIcon } from "@heroicons/react/outline";

import { usePois, useSelectedPoi } from "../context";

/**
 * Side drawer used for listing POIs
 */
export default function ListDrawer() {
  const [open, setOpen] = React.useState(false);
  const [pois, setPois] = usePois();
  const [selectedPoi, setSelectedPoi] = useSelectedPoi();

  return (
    <>
      <div
        className="fixed right-0 bottom-[30%] w-12 h-12 p-3 rounded-l-full text-gray-600 bg-white drop-shadow-xl cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <ViewListIcon />
      </div>
      <div
        className={`fixed h-screen w-10/12 sm:w-1/4 bg-gradient-to-r from-white to-gray-100 right-0 top-0 z-50 drop-shadow-xl transition ${
          !open && "translate-x-full"
        }`}
      >
        {open && (
          <button
            className="absolute top-1/2 -left-7 p-1 w-8 h-12 text-gray-600 bg-white rounded-l-full"
            onClick={() => setOpen(false)}
          >
            <ChevronRightIcon />
          </button>
        )}
        {pois && (
          <div className="absolute w-full">
            <div className="flex h-screen flex-col gap-2 p-4 overflow-y-scroll pb-16">
              {pois.features.map((poi, index) => {
                const { name, category_label, pk } = poi.properties;
                return (
                  <div
                    key={index}
                    className={`border border-gray-300 bg-white rounded-lg p-2 cursor-pointer ${
                      selectedPoi?.properties?.pk === pk &&
                      "border-2 border-red-300 bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedPoi(poi);
                      setOpen(false);
                    }}
                  >
                    <div className="text-sm text-gray-600">
                      {category_label}
                    </div>
                    <div className="font-bold text-gray-600">{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/*
         */}
      </div>
    </>
  );
}

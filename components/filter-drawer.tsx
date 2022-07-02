import React from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FilterIcon,
} from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";

import { usePois, useSelectedCategory } from "../context";

/**
 * Side drawer used for filtering and searching for POIs
 */
export default function FilterDrawer({ categories: initialCategories = [] }) {
  const genericCategory = {
    label_plural: "Toate categoriile",
    name_slug: "all",
    color: "#000",
    pk: null,
  };
  const categories = [genericCategory, ...initialCategories];

  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();
  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <div
        ref={ref}
        className={`fixed h-12 bottom-[50%] w-10/12 sm:w-1/4 bg-white right-0 z-50
          drop-shadow-xl transition ${!open && "translate-x-full"}`}
      >
        <div className="absolute -left-12 w-12 h-12 p-3 rounded-l-full bg-white text-gray-600 cursor-pointer">
          <FilterIcon
            className={
              selectedCategory && selectedCategory.name_slug !== "all"
                ? "text-red-500"
                : "text-gray-600"
            }
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex h-full w-full items-center">
          <div className="flex flex items-center w-full h-full bg-gradient-to-r from-white to-gray-100">
            <div
              className="flex items-center justify-between p-2 h-5 w-full rounded-lg cursor-pointer"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            >
              <div className="flex gap-2 items-center">
                <LocationMarkerIcon
                  className="w-5 h-5"
                  aria-hidden="true"
                  style={{ color: selectedCategory?.color }}
                />
                <label className="cursor-pointer">
                  {selectedCategory
                    ? selectedCategory.label_plural
                    : "Toate categoriile"}
                </label>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            </div>
            {showCategoryMenu && (
              <div className="absolute top-12 h-64 w-full overflow-y-scroll bg-gradient-to-r from-white to-gray-100 rounded-b-md cursor-pointer">
                {categories
                  .filter((c) => c !== selectedCategory)
                  .map((category, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center hover:bg-gray-100 p-2"
                      onClick={() => {
                        setShowCategoryMenu(false);
                        setSelectedCategory(category);
                      }}
                    >
                      <LocationMarkerIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                        style={{ color: category.color }}
                      />

                      {category.label_plural}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

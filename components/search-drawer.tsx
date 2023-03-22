import React from "react";
import {BackspaceIcon, SearchIcon} from "@heroicons/react/solid";

import {useSearchPhrase} from "../context";

/**
 * Drawer used for filtering and searching for POIs
 */
export default function SearchDrawer({ locations, bbox }) {
  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();

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
  }, [ref]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref]);

  function onChange(e) {
    setSearchPhrase(e.target.value);
    e.preventDefault();
  }

  return (
    <>
      <div
        ref={ref}
        className={`fixed h-12 bottom-[40%] w-10/12 sm:w-1/4 bg-white right-0 z-30
          drop-shadow-xl transition ${!open && "translate-x-full"}`}
      >
        <div className="absolute -left-12 w-12 h-12 p-3 rounded-l-full bg-white cursor-pointer">
          <SearchIcon
            className={searchPhrase ? "text-red-500" : "text-gray-600"}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center gap-2 h-full">
          <input
            className="h-full w-full items-center"
            type="text"
            value={searchPhrase || ''}
            onChange={onChange}
          ></input>
          <BackspaceIcon
            className="h-7 w-7 text-red-400 mr-3 cursor-pointer"
            onClick={() => setSearchPhrase("")}
          />
        </div>
      </div>
    </>
  );
}

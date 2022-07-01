import { useSelectedPoi } from "../context";

import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  ExternalLinkIcon,
} from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/outline";

/**
 * Map with POIs. The initial viewport is set to the specified bbox
 */
export default function MapWidget({ locations, bbox }) {
  const [selectedPoi, setSelectedPoi] = useSelectedPoi();
  const { name, address, email, phone, website, description } =
    selectedPoi?.properties || {};

  return (
    selectedPoi && (
      <div className="fixed w-screen sm:w-1/2 sm:left-1/4 bottom-0 sm:mb-5 z-30 bg-white p-8 drop-shadow-xl rounded">
        <div className="flex flex-col justify-start">
          <div className="flex justify-between">
            <h2 className="font-bold text-gray-700">{name}</h2>
            <XCircleIcon
              className="w-8 h-8 text-gray-400 hover:text-red-400 cursor-pointer"
              onClick={() => setSelectedPoi(null)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-5 text-md">
            {address && (
              <div className="flex items-center font-semibold text-gray-600">
                <LocationMarkerIcon className="flex-none inline h-5 w-5 mr-2 text" />
                <div>{address}</div>
              </div>
            )}
            {email && (
              <div className="flex items-center">
                <MailIcon className="flex-none h-5 w-5 mr-2 text-gray-600" />
                <a href={`mailto://${email}`} className="text-blue-600">
                  {email}
                </a>
              </div>
            )}
            {phone && (
              <div className="flex items-center text-gray-600">
                <PhoneIcon className="flex-none h-5 w-5 mr-2" />
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            )}
            {website && (
              <div className="flex items-center text-gray-600 mt-1">
                <ExternalLinkIcon className="flex-none h-5 w-5 mr-2" />
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 gap-1 bg-blue-200 rounded-2xl text-xs font-bold uppercase"
                >
                  website
                </a>
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-md">{description}</p>
          </div>
        </div>
      </div>
    )
  );
}

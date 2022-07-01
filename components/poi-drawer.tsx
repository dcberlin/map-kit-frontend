import { useSelectedPoi } from "../context";

import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  LinkIcon,
} from "@heroicons/react/solid";

/**
 * Map with POIs. The initial viewport is set to the specified bbox
 */
export default function MapWidget({ locations, bbox }) {
  const [selectedPoi, setSelectedPoi] = useSelectedPoi();
  const { name, address, email, phone, website, description } =
    selectedPoi?.properties || {};

  return (
    selectedPoi && (
      <div className="fixed w-screen bottom-0 z-30 bg-white p-8 sm:w-1/3 sm:left-1/3 sm:mb-5 drop-shadow-xl rounded">
        <div className="flex flex-col justify-start">
          <h2 className="font-bold text-gray-700">{name}</h2>
          <div className="mt-5 text-md">
            {address && (
              <div className="flex items-center font-semibold text-gray-600">
                <LocationMarkerIcon className="flex-none inline h-5 w-5 mr-2" />
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
              <div className="flex items-center">
                <LinkIcon className="flex-none h-5 w-5 mr-2 text-gray-600" />
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  {website}
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

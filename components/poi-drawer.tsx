import {
  ExternalLinkIcon,
  FlagIcon,
  LocationMarkerIcon,
  MailIcon,
  MapIcon,
  PencilAltIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import {XCircleIcon} from "@heroicons/react/outline";
import React, {useEffect, useRef} from "react";
import LocationModal, {LocationFormValues} from "./modal-location";
import {Community, Location, LocationCategory} from "../models";
import LocationFlagModal, {LocationFlagFormValues} from "./modal-location-flag";
import {useSelectedPoi} from "../context";
import useSWRMutation from "swr/mutation";
import {API_URL} from "../api";

interface PoiDrawerProps {
  categories: LocationCategory[];
  community: Community;
}

/**
 * Bottom drawer displaying info about the selected POI
 */
export default function PoiDrawer({community, categories}: PoiDrawerProps) {
  const [_, setSelectedPoi, selectedLocation] = useSelectedPoi();
  const [flagModalOpen, setFlagModalOpen] = React.useState(false);
  const [changeProposalModalOpen, setChangeProposalModalOpen] = React.useState(false);

  const selectedLocationRef = useRef(selectedLocation);
  useEffect(() => {
    selectedLocationRef.current = selectedLocation;
  }, [selectedLocation]);

  const {trigger: triggerFlag} = useSWRMutation(
    () => `${API_URL}/api/locations/${selectedLocation.pk}/flag/`, // https://swr.vercel.app/docs/conditional-fetching#dependent
    async (url, {arg}: { arg: LocationFlagFormValues }) => {
      return fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(arg),
      });
    },
    {
      onSuccess: () => {
        setFlagModalOpen(false);
      },
      onError: (error) => {
        console.log('Eroare la trimiterea raportului', error);
      },
    },
  );

  const {trigger: triggerLocationChange} = useSWRMutation(
    () => `${API_URL}/api/locations/${selectedLocation.pk}/propose-change/`,
    async (url, {arg}: { arg: LocationFormValues }) => {
      const selectedLocation = selectedLocationRef.current;
      const body = JSON.stringify({
        name: arg.name !== selectedLocation.name ? arg.name : undefined,
        address: arg.address !== selectedLocation.address ? arg.address : undefined,
        email: arg.email !== selectedLocation.email ? arg.email : undefined,
        phone: arg.phone !== selectedLocation.phone ? arg.phone : undefined,
        website: arg.website !== selectedLocation.website ? arg.website : undefined,
        category: arg.category !== selectedLocation.category ? arg.category : undefined,
        description: arg.description !== selectedLocation.description ? arg.description : undefined,
      });
      if (body === '{}') {
        alert('Nu ai propus nicio modificare');
        return;
      }
      return fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body,
      });
    },
    {
      onSuccess: () => {
        setChangeProposalModalOpen(false);
      },
      onError: (error) => {
        console.log('Eroare la trimiterea cererii de modificare', error);
      },
    },
  );

  const onFlagModalSubmit = async (formValues: LocationFlagFormValues, community: Community, location: Location) => {
    setFlagModalOpen(false);
    if (!selectedLocation.pk) {
      return;
    }
    await triggerFlag(formValues);
  };

  const onFlagModalClose = () => {
    setFlagModalOpen(false);
  };

  const onChangeProposalSubmit = async (formValues: LocationFormValues, community: Community, originalLocation?: Location) => {
    setChangeProposalModalOpen(false);
    if (!selectedLocation.pk) {
      return;
    }
    await triggerLocationChange(formValues);
  };

  const onLocationFormClose = () => {
    setChangeProposalModalOpen(false);
  };

  if (!selectedLocation.pk) {
    return null;
  }

  const {name, address, email, phone, website, description, category_label} = selectedLocation;

  return (
    <div
      className={`fixed w-screen sm:w-1/2 sm:left-1/4 bottom-0 sm:mb-5 z-30 bg-white p-8
        drop-shadow-xl border-t rounded transition-all transform ${
        !selectedLocation && "translate-y-64"
      } duration-200`}
    >
      <div className="relative">
        <div className="flex justify-end absolute top-0 right-0">
          <div className="flex items-center space-x-5">
            <div className="relative group">
              <PencilAltIcon
                className="flex-none min-w-8 w-8 h-8 text-gray-400 hover:text-red-400 cursor-pointer"
                onClick={() => setChangeProposalModalOpen(true)}
              />
              <span
                className="opacity-0 bg-gray-100 text-gray-800 text-xs rounded-md py-1 px-2 absolute bottom-full transform -translate-x-2/3 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                Propune modificari
              </span>
              <LocationModal
                open={changeProposalModalOpen}
                onSubmit={onChangeProposalSubmit}
                onClose={onLocationFormClose}
                location={selectedLocation}
                locationCategories={categories}
                community={community}
                customTitle={`Propui modificări pentru locația '${name}'`}
                dialogProps={{fullWidth: true}}
                buttonLabels={{submit: 'Propune'}}
              />
            </div>
            <div className="relative group">
              <FlagIcon
                className="flex-none min-w-8 w-8 h-8 text-gray-400 hover:text-red-400 cursor-pointer"
                onClick={() => setFlagModalOpen(true)}
              />
              <span
                className="opacity-0 bg-gray-100 text-gray-800 text-xs rounded-md py-1 px-2 absolute bottom-full transform -translate-x-2/3 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                Raportează locația
              </span>
              <LocationFlagModal
                open={flagModalOpen}
                onSubmit={onFlagModalSubmit}
                onClose={onFlagModalClose}
                location={selectedLocation}
                community={community}
                dialogProps={{fullWidth: true}}
                buttonLabels={{submit: 'Raportează'}}
              />
            </div>
            <div className="relative group">
              <XCircleIcon
                className="flex-none min-w-8 w-8 h-8 text-gray-400 hover:text-red-400 cursor-pointer"
                onClick={() => setSelectedPoi(null)}
              />
              <span
                className="opacity-0 bg-gray-100 text-gray-800 text-xs rounded-md py-1 px-2 absolute bottom-full transform -translate-x-2/3 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                Inchide
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-md">
          <div className="text-sm text-gray-600">{category_label}</div>
          <h2 className="font-bold text-gray-700">{name}</h2>
          {address && (
              <div className="flex items-center font-semibold text-gray-600">
                <LocationMarkerIcon className="flex-none inline h-5 w-5 mr-3 text" />
                <div><a href={`https://www.google.com/maps/dir/${address}`} target="_blank">{address}</a></div>
              </div>
          )}
          {email && (
              <div className="flex items-center">
                <MailIcon className="flex-none h-5 w-5 mr-3 text-gray-600" />
                <a href={`mailto://${email}`} className="text-blue-600">
                  {email}
                </a>
              </div>
          )}
          {phone && (
              <div className="flex items-center text-gray-600">
                <PhoneIcon className="flex-none h-5 w-5 mr-3" />
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
          )}
          {website && (
              <div className="flex items-center text-gray-600 mt-1">
                <ExternalLinkIcon className="flex-none h-5 w-5 mr-3" />
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
           {address && (
              <div className="flex items-center font-semibold text-gray-600">
                <MapIcon className="flex-none inline h-5 w-5 mr-3 text" />
                <a
                    href={`https://www.google.com/maps/dir/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 gap-1 bg-blue-200 rounded-2xl text-xs font-bold uppercase"
                >
                  deschide harta
                </a>
              </div>
          )}
          <div className="mt-4">
            <p className="text-md">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

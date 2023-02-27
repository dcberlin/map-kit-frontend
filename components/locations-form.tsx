import React from "react";
import useSWR from "swr";
import {useAuth0} from "@auth0/auth0-react";
import {LockClosedIcon} from "@heroicons/react/solid";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import {URLS} from "../api";
import {Community, Location, LocationCategory, User} from "../models";
import BoolAttribute from "./bool-attr";
import LocationModal, {LocationFormValues} from "./modal-location";
import {DeleteTwoTone, EditTwoTone} from "@mui/icons-material";

interface LocationsFormProps {
  community: Community;
  possibleLocationCategories: LocationCategory[];
}

export default function LocationsForm({community, possibleLocationCategories}: LocationsFormProps) {
  const [locations, setLocations] = React.useState<Location[]>(null);
  const [user, setUser] = React.useState(null);
  const {getAccessTokenSilently} = useAuth0();
  const [locationModalIsOpen, setLocationModalIsOpen] = React.useState(false);
  const [locationModalData, setLocationModalData] = React.useState<Location>(null);

  const {error: userFetchErr, isLoading: userIsLoading} = useSWR<User>(
    URLS.USER,
    async (url) => {
      const res = await fetch(url, {headers: {Authorization: `Bearer ${await getAccessTokenSilently()}`}});
      const body = await res.json();
      setUser(body);
      return body;
    });

  if (userFetchErr) {
    console.error(userFetchErr);
    return <ErrorScreen message={userFetchErr}/>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {error: locationsFetchErr, isLoading: locationsAreLoading} = useSWR<Location[]>(
    community.pk && user?.approved
      ? `${URLS.LOCATIONS_ADMIN}?community=${community.pk}`
      : null,
    async (url) => {
      const res = await fetch(url, {headers: {Authorization: `Bearer ${await getAccessTokenSilently()}`}});
      const body = await res.json();
      setLocations(body);
      return body;
    }
  );

  if (locationsFetchErr) {
    console.error(locationsFetchErr);
    return <ErrorScreen message={locationsFetchErr}/>;
  }

  if (userIsLoading || locationsAreLoading) {
    return <LoadingScreen/>;
  }

  if (!locations && !user?.approved) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="flex justify-around gap-2 items-center text-gray-400">
          <LockClosedIcon className="w-5 h-5"/>
          Userul tău nu a fost aprobat încă.
        </div>
      </div>
    );
  }

  async function locationDeleteButtonClick(loc: Location) {
    if (!confirm(`Sigur vrei să ștergi locația ${loc.name}?`)) {
      return;
    }
    await fetch(`${URLS.LOCATIONS_ADMIN}${loc.pk}/`, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json", Authorization: `Bearer ${await getAccessTokenSilently()}`},
    })
    setLocations(locations.filter(l => l.pk !== loc.pk));
  }

  function locationEditButtonClick(loc: Location) {
    setLocationModalIsOpen(true);
    setLocationModalData(loc)
  }

  async function onLocationFormSubmit(formValues: LocationFormValues, community: Community, originalLocation?: Location) {
    const requestData: Partial<Location> = {
      ...formValues,
      ...{community: community.pk},
    };
    const endpointUrl = originalLocation && originalLocation.pk ?
      `${URLS.LOCATIONS_ADMIN}${originalLocation.pk}/` :
      URLS.LOCATIONS_ADMIN;

    const response = await fetch(endpointUrl, {
      method: originalLocation ? "PUT" : "POST",
      body: JSON.stringify(requestData),
      headers: {"Content-Type": "application/json", Authorization: `Bearer ${await getAccessTokenSilently()}`},
    });

    if (response.status === 201 || response.status === 200) {
      const body = await response.json();
      if (originalLocation) {
        // TODO locations sorting changes here on refresh (probably the list endpoint returns them in a different order)
        setLocations(locations.map(l => l.pk === body.pk ? body : l));
      } else {
        setLocations([...locations, body]);
      }
    }
  }

  function onLocationFormClose() {
    setLocationModalIsOpen(false);
    setTimeout(() => setLocationModalData(null), 500);
  }

  const addLocationButtonClick = () => {
    setLocationModalIsOpen(true);
    setLocationModalData(null);
  };

  return <div>

    <table className="table-auto min-w-full mt-8">

      <thead className="bg-gray-50 text-gray-600">
      <tr>
        <th className="p-4 text-left">Nume</th>
        <th className="p-4 text-left">Adresă</th>
        <th className="p-4 text-left">Publicată</th>
        <th className="p-4 text-left">Acțiuni</th>
      </tr>
      </thead>

      <tbody>
      {locations?.map((location, index) =>
        <tr key={index} className="w-20 border-b">
          <td className="p-4">{location.name}</td>
          <td className="p-4">{location.address}</td>
          <td className="p-4">
            <BoolAttribute value={location.published} edit={{editedKey: "published", instance: location}}/>
          </td>
          <td className="p-4">
            <EditTwoTone className="cursor-pointer" onClick={() => locationEditButtonClick(location)}/>
            <DeleteTwoTone className="cursor-pointer" onClick={() => locationDeleteButtonClick(location)}/>
          </td>
        </tr>
      )}
      {locations?.length === 0 && <tr>
        <td className="p-4 text-gray-500">
          Comunitatea ta nu are nicio locaţie momentan.
        </td>
      </tr>}
      </tbody>

    </table>

    <div className="flex mt-8 items-center justify-end">
      <button
        type="button"
        className="inline-flex justify-center px-7 py-2 text-end font-light
            text-gray-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
        onClick={addLocationButtonClick}
      >
        Adaugă locaţie
      </button>
    </div>

    <LocationModal
      open={locationModalIsOpen}
      onSubmit={onLocationFormSubmit}
      onClose={onLocationFormClose}
      location={locationModalData}
      community={community}
      locationCategories={possibleLocationCategories}
    />

  </div>;
}

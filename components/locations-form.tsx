import React from "react";
import useSWR from "swr";
import {useAuth0} from "@auth0/auth0-react";
import {LockClosedIcon} from "@heroicons/react/solid";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import {URLS} from "../api";
import {Community, Location, User} from "../models";
import BoolAttribute from "./bool-attr";

interface LocationsFormProps {
  community: Community;
}

export default function LocationsForm({community}: LocationsFormProps) {
  const [locations, setLocations] = React.useState<Location[]>(null);
  const [user, setUser] = React.useState(null);
  const {getAccessTokenSilently} = useAuth0();

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

  return (
    <div>
      <table className="table-auto min-w-full mt-8">
        <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="p-4 text-left">Nume</th>
          <th className="p-4 text-left">Adresă</th>
          <th className="p-4 text-left">Publicată</th>
        </tr>
        </thead>
        <tbody>
        {locations?.map((location, index) =>
          <tr key={index} className="w-20 border-b">
            <td className="p-4">{location.name}</td>
            <td className="p-4">{location.address}</td>
            <td className="p-4">
              <BoolAttribute value={location.published} edit={{
                editedKey: "published",
                instance: location,
              }}/>
            </td>
          </tr>
        )}
        {locations?.length === 0 && (
          <tr>
            <td className="p-4 text-gray-500">
              Comunitatea ta nu are nicio locaţie momentan.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import {Community, Location} from "./models";
import {useAuth0} from "@auth0/auth0-react";
import useSWRMutation, {SWRMutationConfiguration, SWRMutationResponse} from "swr/mutation";
import {URLS} from "./api";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// useMutation:

export type MutationData = Partial<Community | Location>;

type Mutation = MutationDelete | MutationEdit;

function isCommunity(instance: MutationData): instance is Community {
  return (instance as Community).bbox !== undefined;
}

function isDeleteMutation(mutation: Mutation): mutation is MutationDelete {
  return (mutation as MutationDelete).entityType !== undefined;
}

interface MutationDelete {
  pk: number;
  entityType: 'community' | 'location';
}

interface MutationEdit {
  instance: MutationData
}

type callData = {
  url: string,
  method: string,
}

function getCallData(mutation: Mutation): callData {
  const url = (isCommunity: boolean, pk: number) =>
    `${isCommunity ? URLS.COMMUNITIES_ADMIN : URLS.LOCATIONS_ADMIN}${pk}/`;

  if (isDeleteMutation(mutation)) {
    return {
      method: 'DELETE',
      url: url(mutation.entityType === 'community', mutation.pk),
    }
  }
  // otherwise edit:
  if (!mutation.instance) {
    throw new Error('No instance data (community or location) provided for edit mutation');
  }
  return {
    method: 'PATCH',
    url: url(isCommunity(mutation.instance), mutation.instance.pk),
  }
}

// useMutation is a hook that returns a function that can be used to trigger a mutation (edit or delete)
// of a Community or Location.
export const useMutation = (mutation: Mutation, options?: SWRMutationConfiguration<MutationData | undefined, Error>)
  : SWRMutationResponse => {
  const callData = getCallData(mutation);
  const {getAccessTokenSilently} = useAuth0();
  return useSWRMutation(
    callData.url,
    async (url, {arg: data}) => {
      const res = await fetch(url, {
        method: callData.method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${await getAccessTokenSilently()}`},
      });
      return res.json();
    },
    options,
  );
};

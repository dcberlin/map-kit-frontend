import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/solid";
import useSWRMutation from "swr/mutation";
import {URLS} from "../api";
import React from "react";
import {Community} from "../models/community";

// BoolAttribute is a component that displays a boolean attribute of a resource.
// It can also allow the user to toggle the attribute.
interface BoolAttributeProps {
  // community attribute current value
  value: boolean;
  // if this is present, the attribute (icon) is editable
  edit?: {
    // edited item pk
    pk: number;
    // item property to edit
    propertyName: string;
    // callback to call in order to retrieve the jwt token
    getAccessTokenSilently: () => Promise<string>;
    // callback to call after the mutation is done
    onSuccess?(changedCommunity: Community): void;
    // callback to call if the mutation fails
    onError?(err: Error, pk: number): void;
  };
}

// BoolAttribute displays a boolean attribute of a community (as a yes/no icon).
// Or, if the edit part is provided, it will make the icon clickable (so the user can change the value).
export default function BoolAttribute({value, edit}: BoolAttributeProps) {
  const [val, setVal] = React.useState(value);
  const icon = val ?
    <CheckCircleIcon className="w-5 h-5 text-green-400"/> :
    <XCircleIcon className="w-5 h-5 text-red-400"/>;
  if (!edit) {
    return icon;
  }

  const {trigger} = useSWRMutation(
    `${URLS.COMMUNITIES_ADMIN}/${edit.pk}/`,
    async (url, {arg}) => {
      const token = await edit.getAccessTokenSilently();
      return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(arg),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          }
          return res.json() as Promise<Community>;
        })
        .then((community) => {
          setVal(community[edit.propertyName]);
          edit.onSuccess?.(community);
        })
        .catch((err: Error) => {
          edit.onError?.(err, edit.pk);
        });
    },
  );

  return <button
    onClick={() => trigger({[edit.propertyName]: !val})}
    title={val?"dezactivează":"activează"}
  >{icon}</button>;
}

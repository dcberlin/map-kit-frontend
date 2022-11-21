import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/solid";
import React from "react";
import {Switch} from "@mui/material";
import {MutationData, useMutation} from "../hooks";

// BoolAttribute is a component that displays a boolean attribute of a resource.
// It can also allow the user to toggle the attribute.
interface BoolAttributeProps {
  // community attribute current value
  value: boolean;
  // if this is present, the attribute (icon) is editable
  edit?: {
    instance: MutationData;
    editedKey: keyof MutationData;
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {trigger: editLocation} = useMutation({instance: edit.instance}, {
    onSuccess: (changed: MutationData) => {
      setVal(changed[edit.editedKey] as boolean);
    },
    onError: (err, key) => {
      console.error('Error changing attribute', err, key);
    }
  });

  return <Switch
    checked={val}
    color="info"
    disabled={!edit}
    size="small"
    onChange={() => editLocation({[edit.editedKey]: !val})}
    title={val ? "dezactivează" : "activează"}
  />;
}

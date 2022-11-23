import * as React from 'react';
import Button from '@mui/material/Button';
import {Community, Location} from "../models";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {Field, Form, FormikBag, FormikErrors, FormikProps, FormikTouched, withFormik} from "formik";
import {ReactNode} from "react";
import * as Yup from 'yup';

interface FieldProps {
  property: keyof LocationFormValues;
  label: string;
  placeholder: string;
  errors: FormikErrors<LocationFormValues>;
  touched: FormikTouched<LocationFormValues>;
}

const ModalField = ({property, label, placeholder, errors, touched}: FieldProps) =>
  <div className="mb-2">
    <label htmlFor={property} className="block text-gray-700 text-sm mb-2 font-semibold">{label}</label>
    <Field id={property} name={property} type="text" placeholder={placeholder} className={`shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
      ${touched[property] && errors[property] && "border-red-500"}`}
    />
    {touched[property] && errors[property] &&
      <p className="text-red-500 my-1 text-sm h-4">{errors[property] as ReactNode}</p>
    }
  </div>;

export interface LocationFormValues {
  name: string;
  address: string;
  description: string;
  website: string;
  email: string;
  phone: string;
}

interface OtherInnerFormProps {
  labels?: Partial<{ [key in keyof LocationFormValues]: string }>;
  placeholders?: Partial<{ [key in keyof LocationFormValues]: string }>;
  onSubmit: (formValues: LocationFormValues, community: Community, originalLocation?: Location) => void;
  onClose: () => void;
}

type InnerFormProps = OtherInnerFormProps & FormikProps<LocationFormValues>;

const InnerForm = ({values, errors, touched, isSubmitting, onClose, labels, placeholders}: InnerFormProps) =>
  <>
    <Form className="mt-8">
      <DialogContent>
        <Stack alignItems="center" justifyContent="center">
          {Object.keys(values).map((property) => {
              const propKey = property as keyof LocationFormValues;
              return <ModalField
                key={property}
                property={propKey}
                label={labels?.[propKey] ?? propKey}
                placeholder={placeholders?.[propKey] ?? placeholders?.[propKey]}
                errors={errors}
                touched={touched}
              />;
            }
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{p: '1.25rem'}}>
        <Button onClick={onClose}>Anulează</Button>
        <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
          {location ? "Salvează" : "Adaugă"}
        </Button>
      </DialogActions>
    </Form>
  </>;

interface FormProps {
  community: Community;
  originalLocation?: Location;
}

type AllFormProps = FormProps & OtherInnerFormProps;

const ModalForm = withFormik<AllFormProps, LocationFormValues>({
  mapPropsToValues: ({originalLocation}) => ({
    name: originalLocation?.name || "",
    address: originalLocation?.address || "",
    description: originalLocation?.description || "",
    website: originalLocation?.website || "",
    email: originalLocation?.email || "",
    phone: originalLocation?.phone || "",
  }),

  validationSchema: () => Yup.object().shape({
    name: Yup.string()
      .required("Numele este obligatoriu")
      .min(3, "Numele trebuie să aibă cel puțin 3 caractere")
      .max(50, "Numele trebuie să aibă cel mult 50 de caractere"),
    address: Yup.string()
      .required("Adresa este obligatorie")
      .min(5, "Adresa trebuie să aibă cel puțin 5 caractere"),
    email: Yup.string()
      .email("Adresa de email nu este validă"),
    website: Yup.string()
      .url("Adresa website nu este validă"),
    phone: Yup.string()
      .matches(/^[0-9\s+]{5,}$/, "Numărul de telefon nu este valid"),
  } as { [key in keyof LocationFormValues]: any }),

  handleSubmit: async (values: LocationFormValues, {
    setSubmitting,
    props: {community, originalLocation, onClose, onSubmit}
  }: FormikBag<AllFormProps, LocationFormValues>) => {
    onSubmit(values, community, originalLocation);
    setSubmitting(false);
    onClose();
  },
})(InnerForm);

interface ModalProps {
  community: Community;
  location?: Location; // if undefined, the modal will be used for adding a new location
  open: boolean;
  onSubmit: (formValues: LocationFormValues, community: Community, originalLocation?: Location) => void;
  onClose: () => void;
}

export default function LocationModal({location, open, onClose, onSubmit, community}: ModalProps) {
  return <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">{location ?
        `Modifici locația '${location.name}'` :
        'Locație nouă'
      }</DialogTitle>
      <ModalForm
        community={community}
        originalLocation={location}
        labels={{
          name: "Nume",
          address: "Adresă",
          description: "Descriere",
          website: "Website",
          email: "Email",
          phone: "Telefon",
        }}
        placeholders={{
          name: "Numele locației",
          address: "Adresa locației",
          description: "Descrierea locației",
          website: "Website-ul locației",
          email: "Email-ul locației",
          phone: "Numărul de telefon al locației",
        }}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Dialog>
  </>;
}

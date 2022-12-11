import * as React from 'react';
import Button from '@mui/material/Button';
import {Community, Location, LocationCategory} from "../models";
import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Stack} from "@mui/material";
import {Field, Form, FormikBag, FormikErrors, FormikProps, FormikTouched, withFormik} from "formik";
import {ReactNode} from "react";
import * as Yup from 'yup';

interface SelectFieldProps {
  property: keyof LocationFormValues;
  label?: string;
  options: Map<string, string>;
  emptyOption?: string;
  errors: FormikErrors<LocationFormValues>;
  touched: FormikTouched<LocationFormValues>;
}

const SelectField = ({property, label, options, errors, touched, emptyOption}: SelectFieldProps) =>
  <div id={`group-${property}`}>
    {label &&
      <label htmlFor="category" className="w-full block text-gray-700 text-sm mb-2 font-semibold">{label}</label>
    }
    <Field as="select" name={property} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline bg-white">
      {emptyOption &&
        <option value="">{emptyOption}</option>
      }
      {Array.from(options.entries()).map(([key, value]) =>
        <option key={key} value={key}>{value}</option>
      )}
    </Field>
    {touched[property] && errors[property] &&
      <p className="text-red-500 my-1 text-sm h-4">{errors[property] as ReactNode}</p>
    }
  </div>

interface TextFieldProps {
  property: keyof LocationFormValues;
  label?: string;
  placeholder: string;
  errors: FormikErrors<LocationFormValues>;
  touched: FormikTouched<LocationFormValues>;
}

const TextField = ({property, label, placeholder, errors, touched}: TextFieldProps) =>
  <div id={`group-${property}`}>
    {label &&
      <label htmlFor={property} className="w-full block text-gray-700 text-sm mb-2 font-semibold">{label}</label>
    }
    <Field id={property} name={property} type="text" placeholder={placeholder} className={`shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
      ${touched[property] && errors[property] && "border-red-500"}`} autocomplete="off"
    />
    {touched[property] && errors[property] &&
      <p className="text-red-500 my-1 text-sm h-4">{errors[property] as ReactNode}</p>
    }
  </div>

export interface LocationFormValues {
  name: string;
  category: string;
  address: string;
  description: string;
  website: string;
  email: string;
  phone: string;
}

interface OtherInnerFormProps {
  categories: LocationCategory[];
  originalLocation?: Location;
  onSubmit: (formValues: LocationFormValues, community: Community, originalLocation?: Location) => void;
  onClose: () => void;
}

type InnerFormProps = OtherInnerFormProps & FormikProps<LocationFormValues>;

const InnerForm = ({categories, errors, touched, isSubmitting, onClose, originalLocation}: InnerFormProps) =>
  <>
    <Form className="mt-8">
      <DialogContent>
        <div className="flex flex-col gap-5">
          <TextField property="name" label="Nume" placeholder="Numele locației" errors={errors} touched={touched}/>
          <SelectField
            label="Categorie"
            property="category"
            options={new Map(categories.map(c => [c.name_slug, c.label_plural]))}
            emptyOption={originalLocation ? null : "..."}
            errors={errors}
            touched={touched}
          />
          <TextField property="address" label="Adresă" placeholder="Adresa locației" errors={errors} touched={touched}/>
          <TextField property="description" label="Descriere" placeholder="Descrierea locației" errors={errors}
                     touched={touched}/>
          <TextField property="website" label="Website" placeholder="https://locatie.com" errors={errors}
                     touched={touched}/>
          <TextField property="email" label="Email" placeholder="cineva@locatie.com" errors={errors} touched={touched}/>
          <TextField property="phone" label="Telefon" placeholder="de ex. +49 1575 3242427" errors={errors}
                     touched={touched}/>
        </div>
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
  categories: LocationCategory[];
}

type AllFormProps = FormProps & OtherInnerFormProps;

const ModalForm = withFormik<AllFormProps, LocationFormValues>({
  mapPropsToValues: ({originalLocation}) => ({
    name: originalLocation?.name || "",
    category: originalLocation?.category || "",
    address: originalLocation?.address || "",
    description: originalLocation?.description || "",
    website: originalLocation?.website || "",
    email: originalLocation?.email || "",
    phone: originalLocation?.phone || "",
  }),

  validationSchema: ({categories}: AllFormProps) => Yup.object().shape({
    name: Yup.string().required("Numele este obligatoriu")
      .min(3, "Numele trebuie să aibă cel puțin 3 caractere")
      .max(50, "Numele trebuie să aibă cel mult 50 de caractere"),
    category: Yup.string().required("Categoria este obligatorie")
      .oneOf(categories.map(category => category.name_slug), "Categorie invalidă"),
    address: Yup.string().required("Adresa este obligatorie").min(5, "Adresa trebuie să aibă cel puțin 5 caractere"),
    email: Yup.string().email("Adresa de email nu este validă"),
    website: Yup.string().url("Adresa website nu este validă"),
    phone: Yup.string().matches(/^[0-9\s+-]{5,}$/, "Numărul de telefon nu este valid"),
  } as { [key in keyof LocationFormValues]: any }),

  handleSubmit: async (values: LocationFormValues, {
    setSubmitting,
    setErrors,
    props: {community, originalLocation, onClose, onSubmit}
  }: FormikBag<AllFormProps, LocationFormValues>) => {
    const errors = await onSubmit(values, community, originalLocation);
    const errorKeys = Object.keys(errors)
    if (errorKeys.length === 0) {
      setSubmitting(false);
      onClose();
    } else if (errorKeys.includes("generic")) {
      // TODO: Handle other status codes than 201, 200 and 400
    } else {
      const errorValues = Object.values(errors).map(errorArray => errorArray.join(", "));
      // Here we need to transform the values of the errors object we get from the backend.
      // DRF returns an array of strings, but formik expects a string as value, so we join
      // the error strings that we get from DRF. This is in most cases just one string.
      setErrors(Object.fromEntries(errorKeys.map((errorKey, i) => [errorKey, errorValues[i]])));
    }
  },
})(InnerForm);

interface ModalProps {
  community: Community;
  location?: Location; // if undefined, the modal will be used for adding a new location
  locationCategories: LocationCategory[];
  open: boolean;
  onSubmit: (formValues: LocationFormValues, community: Community, originalLocation?: Location) => void;
  onClose: () => void;
}

export default function LocationModal({location, open, onClose, onSubmit, community, locationCategories}: ModalProps) {
  return <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">{location ?
        `Modifici locația '${location.name}'` :
        'Locație nouă'
      }</DialogTitle>
      <ModalForm
        community={community}
        originalLocation={location}
        categories={locationCategories}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Dialog>
  </>;
}

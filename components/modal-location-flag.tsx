import * as React from 'react';
import {ReactNode} from 'react';
import Button from '@mui/material/Button';
import {Community, Location} from "../models";
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from "@mui/material";
import {Field, Form, FormikBag, FormikErrors, FormikProps, FormikTouched, withFormik} from "formik";
import * as Yup from 'yup';
import {ButtonLabels, TextField} from "./modal-location";

interface TextFieldProps {
  property: keyof LocationFlagFormValues;
  label?: string;
  placeholder: string;
  errors: FormikErrors<LocationFlagFormValues>;
  touched: FormikTouched<LocationFlagFormValues>;
}

const ReasonField = ({property, label, placeholder, errors, touched}: TextFieldProps) =>
  <div id={`group-${property}`}>
    {label &&
      <label htmlFor={property} className="w-full block text-gray-700 text-sm mb-2 font-semibold">{label}</label>
    }
    <Field id={property} name={property} type="text" as="textarea" placeholder={placeholder} className={`shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
      ${touched[property] && errors[property] && "border-red-500"}`}
    />
    {touched[property] && errors[property] &&
      <p className="text-red-500 my-1 text-sm h-4">{errors[property] as ReactNode}</p>
    }
  </div>

export interface LocationFlagFormValues {
  text: string;
  email: string;
  phone?: string;
}

interface OtherInnerFormProps {
  location: Location;
  onSubmit: (formValues: LocationFlagFormValues, community: Community, location: Location) => void;
  onClose: () => void;
  buttonLabels?: ButtonLabels;
}

type InnerFormProps = OtherInnerFormProps & FormikProps<LocationFlagFormValues>;

const InnerForm = ({errors, touched, isSubmitting, onClose, buttonLabels}: InnerFormProps) =>
  <>
    <Form className="mt-8">
      <DialogContent>
        <div className="flex flex-col gap-5">
          <ReasonField property="text" label="Descrierea problemei" placeholder="..." errors={errors}
                       touched={touched} />
          <TextField property="email" label="Email" placeholder="cineva@locatie.com" errors={errors}
                     touched={touched} />
          <TextField property="phone" label="Telefon" placeholder="de ex. +49 1575 3242427" errors={errors}
                     touched={touched} />
        </div>
      </DialogContent>
      <DialogActions sx={{p: '1.25rem'}}>
        <Button onClick={onClose}>{buttonLabels?.cancel ?? 'Anulează'}</Button>
        <Button type="submit" color="primary" variant="contained"
                disabled={isSubmitting}>{buttonLabels?.submit ?? 'Trimite'}</Button>
      </DialogActions>
    </Form>
  </>;

interface FormProps {
  community: Community;
  location: Location;
  text?: string;
}

type AllFormProps = FormProps & OtherInnerFormProps;

const ModalForm = withFormik<AllFormProps, LocationFlagFormValues>({
  mapPropsToValues: ({text}) => ({
    text: text || '',
    email: '',
    phone: '',
  }),

  validationSchema: ({}: AllFormProps) => Yup.object().shape({
    text: Yup.string().required("Mesajul este obligatoriu")
      .min(10, "Motivul trebuie să aibă cel puțin 10 caractere")
      .max(2000, "Motivul trebuie să aibă cel mult 2000 de caractere"),
    email: Yup.string()
      .required("Avem nevoie de mailul tău în caz că vrem sa te contactăm în legătură cu raportul")
      .email("Adresa de email nu este validă"),
    phone: Yup.string()
      .min(5, "Cam scurt")
      .max(30, "Cam lung"),
  } as { [key in keyof LocationFlagFormValues]: any }),

  handleSubmit: async (values: LocationFlagFormValues, {
    setSubmitting,
    props: {community, location, onClose, onSubmit}
  }: FormikBag<AllFormProps, LocationFlagFormValues>) => {
    onSubmit(values, community, location);
    setSubmitting(false);
    onClose();
  },
})(InnerForm);

interface ModalProps {
  community: Community;
  location: Location; // if undefined, the modal will be used for adding a new location
  open: boolean;
  onSubmit: (formValues: LocationFlagFormValues, community: Community, location: Location) => void;
  onClose: () => void;
  customTitle?: string;
  text?: string;
  buttonLabels?: ButtonLabels;
  dialogProps?: Partial<DialogProps>;
}

export default function LocationFlagModal({
                                            location,
                                            open,
                                            onClose,
                                            onSubmit,
                                            community,
                                            customTitle,
                                            dialogProps,
                                            buttonLabels
                                          }: ModalProps) {
  return <>
    <Dialog {...{open, onClose, ...dialogProps}}>
      <DialogTitle textAlign="center">{customTitle ?? (`Raportezi locația '${location.name}'`)}</DialogTitle>
      <ModalForm
        community={community}
        location={location}
        onClose={onClose}
        onSubmit={onSubmit}
        buttonLabels={buttonLabels}
      />
    </Dialog>
  </>;
}

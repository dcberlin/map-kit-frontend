import React from "react";
import {NextPageWithLayout} from "./_app";
import FrontLayout from "../components/layout/frontLayout";
import * as Yup from 'yup';
import {Field, Form, FormikProps, withFormik} from 'formik';

import useSWR from "swr";
import ErrorScreen from "../components/error-screen";
import LoadingScreen from "../components/loading-screen";
import {URLS} from "../api";
import {Community} from "../models";

// @see https://formik.org/docs/guides/typescript

// Shape of form values
interface FormValues {
  email: string;
  message: string;
}

interface OtherProps {
  msg: string;
}

type AllFormProps = OtherProps & FormikProps<FormValues>;

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: AllFormProps) => {
  const {touched, errors, isSubmitting, msg} = props;
  return <>
    <h1>{msg}</h1>
    <Form className="mt-8">
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm mb-2 font-semibold"
          htmlFor="message"
        >
          Mesajul pentru noi.
        </label>
        <Field
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            touched.message && errors.message && "border-red-500"
          }`}
          name="message"
          id="message"
          as="textarea"
          placeholder=''
        />
        <p className="text-red-500 my-1 text-sm h-4">
          {/*todo*/}
          {/*{touched.email && errors.email}*/}
        </p>
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm mb-2 font-semibold"
          htmlFor="email"
        >
          Emailul la care te putem contacta inapoi
        </label>
        <Field
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            touched.email && errors.email && "border-red-500"
          }`}
          name="email"
          id="email"
          type="email"
          placeholder='de ex. "cineva@domeniu.com"'
        />
        <p className="text-red-500 my-1 text-sm h-4">
          {touched.email && errors.email}
        </p>
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  </>
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  title: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const ContactForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    email: props.initialEmail || '',
    message: '',
  }),

  handleSubmit: () => {
    // todo make a django endpoint and send email
  },

  validationSchema: (props: AllFormProps) => Yup.object().shape({
    email: Yup.string()
      .email("Adresa de email nu este validă")
      .required('Adresa email este obligatorie'),
    message: Yup.string()
      .min(10, "Mesajul e cam scurt")
      .max(2000, "Mesajul e cam lung. Poate contine maxim 2000 de caractere"),
  }),
})(InnerForm);

const ContactPage: NextPageWithLayout = () => {

  const {data, error} = useSWR<Community[], Error>(URLS.COMMUNITIES, async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  if (error) {
    console.error(error);
    return <ErrorScreen />;
  }

  if (!data) {
    return <LoadingScreen />;
  }

  return <>
    <FrontLayout data={data}>
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <div
            className={`flex flex-wrap w-1/5 pt-4 pb-8 justify-center drop-shadow-2xl
            rounded-xl bg-white overflow-auto max-h-[700px]`} style={{zIndex:10}}
          >
          <ContactForm title="Contact" initialEmail=""/>
        </div>
      </div>
    </FrontLayout>
    </>;
}

export default ContactPage;

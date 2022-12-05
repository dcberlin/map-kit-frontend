import React from "react";
import {NextPageWithLayout} from "./_app";
import FrontLayout from "../components/layout/frontLayout";
import * as Yup from 'yup';
import {withFormik, FormikProps, Form, Field} from 'formik';

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

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
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
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
      message: '',
    };
  },

  validationSchema: (props: AllFormProps) => Yup.object().shape({
    email: Yup.string()
      .email("Adresa de email nu este validă")
      .required('Adresa email este obligatorie'),
    message: Yup.string()
      .min(10, "Mesajul e cam scurt")
      .max(2000, "Mesajul e cam lung. Poate contine maxim 2000 de caractere"),
  }),

  handleSubmit: values => {
    // todo cand merge mailul
  },
})(InnerForm);

const ContactPage: NextPageWithLayout = () => {
  return <ContactForm title="Contact" initialEmail=""/>;
}

ContactPage.getLayout = (page) => <FrontLayout>{page}</FrontLayout>

export default ContactPage;

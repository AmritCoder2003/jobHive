import { FaRegAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TbHours12 } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import ButtonSpinner from "../components/ButtonSpinner";
import 'react-toastify/dist/ReactToastify.css';
import ErrorModal from "../components/ErrorModal";
// import Spinner from "../components/Spinner";
import axios from "axios";
import {useFormik} from "formik";
const validate = (values) => {
  const errors={};
  if(!values.name){
    errors.name = "Name is required";
  }
  else if(!values.name.length > 15){
    errors.name = "Name must be at most 15 characters";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.message) {
    errors.message = "Message is required";
  }
  else if(!values.message.length >30){
    errors.message = "Name must be at most 30 characters";
  }
  return errors;
}
const Contact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isError, setIsError] = useState(false);
  const notify = () => toast.success("Message sent successfully!");
  const formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      message:'',
    },
    validate,
    onSubmit:async (values) =>  {
      console.log(values);
      setIsLoading(true);
      try{
        const response = await axios.post(
          "http://localhost:8050/api/v1/contacts",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false); // Stop spinner
        formik.resetForm(); // Reset form values
        console.log(response.status);
        if (response.status === 201) {
          notify(); // Show success message
        } else {
          setError("Error sending message! Please try again.");
          setIsError(true);
        }
      }catch(err){
          setError(err.message);
          setIsLoading(false);
          setIsError(true);
        }
    },
  });

  useEffect(() => {
    if(isLoading){
      console.log("Loading");
    }
    if(isError){
      console.log("Error");
    }
}, [isError,isLoading])

  
  const handleModalClose = () => {
    setIsError(false);
  }
  return (
    <React.Fragment>
      {(
        <ErrorModal
          error={error}
          onClear={() => setError(null)}
          onClose={handleModalClose}
        />
      ) && isError}

      <div>
        <section className="bg-pink-50 dark:bg-white" id="contact">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-4">
              <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <h2 className="font-heading mb-4 font-bold tracking-tight text-black dark:text-pink-950 text-3xl sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-black dark:text-pink-950">
                  In this dwelling place, a saying is.
                </p>
              </div>
            </div>
            <div className="flex items-stretch justify-center">
              <div className="grid md:grid-cols-2">
                <div className="h-full pr-6">
                  <p className="mt-3 mb-12 text-lg text-black dark:text-pink-950">
                    For any inquiries, feedback, or assistance, please
                    don&apos;t hesitate to reach out to us. Our dedicated
                    support team is available to help you with any questions you
                    may have regarding our services, job listings, or
                    account-related matters.
                  </p>
                  <ul className="mb-6 md:mb-0">
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-pink-400 text-black">
                        <FaRegAddressBook />
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-black dark:text-pink-950 ">
                          Our Address
                        </h3>
                        <p className="text-black dark:text-pink-950 mb-2">
                          123 Main Street
                        </p>
                        <p className="text-black dark:text-pink-950">
                          New York, NY 10001
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-pink-400 text-black">
                        <FaPhone />
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-black dark:text-pink-950 ">
                          Contact
                        </h3>
                        <p className="text-black dark:text-pink-950 mb-2">
                          Phone: +1 (800) 123-4567
                        </p>
                        <p className="text-black dark:text-pink-950">
                          Email:jobHive23@gmail.com
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-pink-400 text-black">
                        <TbHours12 />
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-black dark:text-pink-950 ">
                          Working hours
                        </h3>
                        <p className="text-black dark:text-pink-950 mb-2">
                          Monday - Friday: 08:00 - 18:00
                        </p>
                        <p className="text-black dark:text-pink-950">
                          Saturday &amp; Sunday: 08:00 - 12:00
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                  <h2 className="mb-4 text-2xl font-bold dark:text-pink-950 ">
                    Ready to Get Started?
                  </h2>
                  <form
                    id="contactForm"
                    onSubmit={formik.handleSubmit}
                    action=""
                    method="POST"
                  >
                    <div className="mb-6">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <div className="mx-0 mb-1 sm:mb-4">
                          <label
                            htmlFor="name"
                            className="pb-1 text-xs uppercase tracking-wider"
                          ></label>
                          <input
                            type="text"
                            id="name"
                            autoComplete="given-name"
                            placeholder="Your name"
                            className="mb-2 w-full rounded-md border border-pink-900 py-2 pl-2 pr-4 shadow-md dark:text-pink-900 sm:mb-0"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                          ) : null}
                        </div>
                        <div className="mx-0 mb-1 sm:mb-4">
                          <label
                            htmlFor="email"
                            className="pb-1 text-xs uppercase tracking-wider"
                          ></label>
                          <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            placeholder="Your email address"
                            className="mb-2 w-full rounded-md border border-pink-900 py-2 pl-2 pr-4 shadow-md dark:text-pink-900 sm:mb-0"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="text"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          id="text"
                          name="message"
                          autoComplete="text"
                          type="text"
                          placeholder="Write your message..."
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.message}
                          className="mb-2 w-full rounded-md border border-pink-900 py-2 pl-2 pr-4 shadow-md dark:text-pink-900 sm:mb-0"
                        />
                        {formik.touched.message && formik.errors.message ? (
                          <div>{formik.errors.message}</div>
                        ) : null}
                      </div>
                    </div>
                    {isLoading ? (
                      <ButtonSpinner message="Sending Message" />
                    ) : (
                      <div className="text-center">
                        <button
                          type="submit"
                          className="w-full bg-pink-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                          disabled={!formik.isValid || formik.isSubmitting}
                        >
                          Send Message
                        </button>
                      </div>
                    )}
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Contact;

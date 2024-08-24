import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title Required";
  } else if (values.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!values.description) {
    errors.description = "Description Required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!values.company) {
    errors.company = "Company Required";
  } else if (values.company.length < 5) {
    errors.company = "Company name must be at least 5 characters";
  }

  if (!values.category) {
    errors.category = "Category Required";
  }

  if (!values.country) {
    errors.country = "Country Required";
  }

  if (!values.city) {
    errors.city = "City Required";
  }

  if (!values.location) {
    errors.location = "Location Required";
  }
  if(!values.salaryPeriod){
    errors.salaryPeriod = "Salary Period Required";
  }
  
    if (!values.salaryFrom) {
      errors.salaryFrom = "Salary From Required";
    } else if (values.salaryFrom <= 0) {
      errors.salaryFrom = "Salary From must be a positive number";
    }
    if (!values.salaryTo) {
      errors.salaryTo = "Salary To Required";
    } else if (values.salaryTo <= 0) {
      errors.salaryTo = "Salary To must be a positive number";
    } else if (values.salaryFrom && values.salaryTo && values.salaryFrom >= values.salaryTo) {
      errors.salaryTo = "Salary To must be greater than Salary From";
    }
  
  

  return errors;
};

const countries = ["United States", "Canada", "India", "Australia", "United Kingdom", "Germany", "France", "China", "Japan", "Brazil"];

const PostJob = () => {

  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      company: '',
      category: '',
      country: '',
      city: '',
      location: '',
      salaryFrom: '',
      salaryTo: '',
      salaryPeriod: 'monthly'
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:8050/api/v1/jobs/create',
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setIsLoading(false);
        if (response.status === 201) {
          toast.success('Job posted successfully!');
          formik.resetForm();
          setTimeout(() => {
            navigate('/ViewJobs');
          }, 3000);
        } else {
          toast.error('Something went wrong! Please try again.');
        }
      } catch (err) {
        setIsLoading(false);
       
        toast.error("Something went wrong! Please try again.");
      }
    },
  });

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }
   
  }, [isLoading]);

  return (
    <>
      
      {isLoading && <Spinner />}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Post a New Job</h2>

        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Job Title"
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (<div className='text-red-500'>{formik.errors.title}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Company"
                onBlur={formik.handleBlur}
              />
              {formik.touched.company && formik.errors.company ? (<div className='text-red-500'>{formik.errors.company}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Category"
                onBlur={formik.handleBlur}
              />
              {formik.touched.category && formik.errors.category ? (<div className='text-red-500'>{formik.errors.category}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select country" />
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country ? (<div className='text-red-500'>{formik.errors.country}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="City"
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city ? (<div className='text-red-500'>{formik.errors.city}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Location"
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location ? (<div className='text-red-500'>{formik.errors.location}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
                rows="5"
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (<div className='text-red-500'>{formik.errors.description}</div>) : null}
            </div>
           

            {/* Salary Period Selection */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Salary Period</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="monthly"
                  name="salaryPeriod"
                  value="monthly"
                  checked={formik.values.salaryPeriod === 'monthly'}
                  onChange={formik.handleChange}
                  className="mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="monthly" className="text-gray-700">Monthly</label>
                <input
                  type="radio"
                  id="annual"
                  name="salaryPeriod"
                  value="annual"
                  checked={formik.values.salaryPeriod === 'annual'}
                  onChange={formik.handleChange}
                  className="ml-6 mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="annual" className="text-gray-700">Annual</label>
              </div>
              {formik.touched.salaryPeriod && formik.errors.salaryPeriod ? (<div className='text-red-500'>{formik.errors.salaryPeriod}</div>) : null}
            </div>

          
              <>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="salaryFrom">Salary From</label>
                  <input
                    type="number"
                    id="salaryFrom"
                    name="salaryFrom"
                    value={formik.values.salaryFrom}
                    onChange={formik.handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g. 40000"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.salaryFrom && formik.errors.salaryFrom ? (<div className='text-red-500'>{formik.errors.salaryFrom}</div>) : null}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="salaryTo">Salary To</label>
                  <input
                    type="number"
                    id="salaryTo"
                    name="salaryTo"
                    value={formik.values.salaryTo}
                    onChange={formik.handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g. 70000"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.salaryTo && formik.errors.salaryTo ? (<div className='text-red-500'>{formik.errors.salaryTo}</div>) : null}
                </div>
              </>
          
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Post Job
          </button>
        </form>
    
      </div>
    </>
  );
};

export default PostJob;

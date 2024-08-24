import { useState } from "react"
import {useFormik } from 'formik'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup"
import axios from "axios"
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResumeModal from "./ResumeModal";
const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || {});
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  const formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      resume:null,
      phone:'',
      coverLetter:'',
    },
    validationSchema:Yup.object({
      name:Yup.string().min(5,"Name should be atleast 5 characters").max(20,"Name should be atmost 20 characters").required("Name is required"),
      email:Yup.string().email("Invalid email").required("Email is required"),
      resume:Yup.mixed().required("Resume is required"),
      phone:Yup.string().required("Phone number is required"),
      coverLetter:Yup.string().required("Cover Letter is required"),
    }),
    onSubmit:async(values)=>{
      try{
        setIsLoading(true);
        const formData=new FormData();
        formData.append("name",values.name);
        formData.append("email",values.email);
        formData.append("resume",values.resume);
        formData.append("phone",values.phone);
        formData.append("coverLetter",values.coverLetter);

        console.log(formData);

        const response=await axios.post(`http://localhost:8050/api/v1/applications/post/${id}`,formData,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          }
        });
        setIsLoading(false);
        if(response.status===200){
          toast.success("Applied successfully");
          setTimeout(() => {
            navigate("/application/me");
          }, 3000);
        }else{
          toast.error("Failed to apply");
        }
      }catch(error){
        setIsLoading(false);
        toast.error("Failed to apply");
      }
    }

  })
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
   if(file){
    formik.setFieldValue("resume",file);
    const previewUrl=URL.createObjectURL(file);
    //console.log(previewUrl);
    setResumePreviewUrl(previewUrl);
   }
  };
  const handleResumePreview=()=>{
    setShowResumeModal(true);
  }

  return (
    <>
    {isLoading && <Spinner/>}
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Apply for the Job</h2>

      <form onSubmit={formik.handleSubmit} className=" w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Name"
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (<div className='text-red-500'>{formik.errors.name}</div>) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Email"
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (<div className='text-red-500'>{formik.errors.email}</div>) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formik.values.coverLetter}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Cover Letter"
            rows="5"
            onBlur={formik.handleBlur}
          />
          {formik.touched.coverLetter && formik.errors.coverLetter ? (<div className='text-red-500'>{formik.errors.coverLetter}</div>) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Phone Number"
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (<div className='text-red-500'>{formik.errors.phone}</div>) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="resume">Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={handleResumeUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.resume && formik.errors.resume ? (<div className='text-red-500'>{formik.errors.resume}</div>) : null}
        </div>
        {resumePreviewUrl && (
          <button type="button"
          className="mt-2 mr-4 text-blue-500 underline"
          onClick={handleResumePreview}
          >
            Preview Resume
          </button>
        )}
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Submit Application
        </button>
      </form>
    </div>

    {/* Modal for Resume Preview */}
    {showResumeModal && <ResumeModal imageUrl={resumePreviewUrl} onClose={() => setShowResumeModal(false)} />}
  </>
  )
}

export default Apply
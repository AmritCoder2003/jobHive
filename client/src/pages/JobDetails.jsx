import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate(); // For navigation after deleting
  console.log(job);
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8050/api/v1/jobs/getJob/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLoading(false);
        if (response.status === 200) {
          setJob(response.data.job);
          toast.success("Job details fetched successfully");
        } else {
          toast.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Error fetching job details");
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await axios.delete(`http://localhost:8050/api/v1/jobs/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          toast.success("Job deleted successfully");
          navigate("/ViewYourJobs"); // Redirect to all jobs page after deletion
        } else {
          toast.error("Failed to delete the job");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Error deleting job");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/EditJob/${id}`); // Redirect to the edit job page
  };

  if (!job) {
    return <p className="text-center text-gray-600">Job not found.</p>;
  }

  const jobPostedOn = job.jobPostedOn;
  const formattedDate = jobPostedOn.split('T')[0];

  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-xl text-gray-700 mb-2">{job.company}</p>
          <p className="text-lg text-gray-600">{job.location}</p>
          <p className="text-lg text-gray-600 mb-4">{job.city}, {job.country}</p>
          <p className="text-lg text-gray-800">
            <strong>Salary:</strong> ${job.salaryFrom} - ${job.salaryTo} {job.salaryPeriod}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Category:</strong> {job.category}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Posted on:</strong> {formattedDate}
          </p>
          <p className="text-lg text-gray-800 mt-6">{job.description}</p>

         {user.role === "employer" && (
         <p className="text-lg text-gray-800 mt-6">
         <strong>Expired:</strong> {job.expired ? "Yes" : "No"}
       </p>
       
        )}
          
          {user.role === "jobseeker" && (
            <button onClick={() => navigate(`/Apply/${id}`)} className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Apply Now
            </button>
          )}

          {user.role === "employer" && (
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit Job
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete Job
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobDetails;

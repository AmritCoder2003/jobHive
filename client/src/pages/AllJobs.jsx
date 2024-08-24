import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8050/api/v1/jobs/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setJobs(response.data.jobs);
          toast.success("Jobs fetched successfully");
        } else {
          setJobs([]);
          toast.error("No jobs found");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-white">Available Jobs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-500 mt-2">{job.company}</p>
                <p className="text-gray-600 mt-2"><strong>Salary:</strong> ${job.salaryFrom} - ${job.salaryTo} {job.salaryPeriod}</p>
                <p className="text-gray-600 mt-2"><strong>Category:</strong> {job.category}</p>
                <p className="text-gray-600 mt-4 line-clamp-3">{job.city} ,{job.country} </p>
                <button
                  className="bg-pink-700 text-white px-4 py-2 mt-4 rounded hover:bg-pink-600"
                  onClick={() => navigate(`/jobs/${job.id}`)} 
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-white text-xl">No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllJobs;

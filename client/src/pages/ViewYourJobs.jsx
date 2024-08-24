import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import axios from "axios";

const ViewYourJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8050/api/v1/jobs/employer",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        if (response.data.jobs) {
          setJobs(response.data.jobs);
          toast.success("Jobs fetched successfully");
          // console.log(response.data.jobs);
          // console.log(response)
        } else {
          setJobs([]);
          toast.error("No jobs found");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
      } 
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }
    
  }, [isLoading]);

  return (
    <>
      {isLoading && <Spinner />}
      
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Jobs You've Posted
        </h2>
        {jobs.length === 0 ? (
          <div className="text-center text-gray-600">
            You haven't posted any jobs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-600 mb-4">{job.location}</p>
                <div className="text-sm text-gray-500 mb-4">
                  {job.description.substring(0, 100)}...
                </div>
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-600"
                  onClick={() => navigate(`/jobs/${job.id}`)} 
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        
      </div>


    </>
  );
};

export default ViewYourJobs;

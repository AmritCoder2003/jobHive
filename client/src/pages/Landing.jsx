import {Link} from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "/src/assets/css/index.css";
//import { FaArrowRight } from "react-icons/fa";
const Landing = () => {
  const arr = [
    {
      key:1,
      description: "Microsoft Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1503852460961-aa7ffdd3d64d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBjb21wYW55fGVufDB8fDB8fHww"
    },
    {
      key:2,
      description: "Google Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z29vZ2xlJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"

    },
    {
      key:3,
      description: "Apple Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1hem9uJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      key:4,  
      description: "Amazon Hiring for Software Developer",
      date: "25 November 2020",
      src:"https://images.unsplash.com/photo-1570063578733-6a33b69d1439?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWljcm9zb2Z0fGVufDB8fDB8fHww"
    },
    {
      key:5,
      description: "Meta Hiring for Software Developer",
      date: "13 October 2019",
      src:"https://images.unsplash.com/photo-1636051028886-0059ad2383c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWV0YSUyMGNvbXBhbnl8ZW58MHx8MHx8fDA%3D"
    },
    {
      key:6,  
      description: "Adobe Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1617777938240-9a1d8e51a47d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRvYmUlMjBjb21wYW55fGVufDB8fDB8fHww"
    },
    {
      key:7,
      description: "Netflix Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1602522536148-8e8c3b5b3e3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV0ZmxpeCUyMGNvbXBhbnl8ZW58MHx8MHx8fDA%3D"
    },
    {
      key:8,
      description: "Tesla Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1612531950554-3f3a2e0c1b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGF8ZW58MHx8MHx8fDA%3D"
    },
    {
      key:9,
      description: "Twitter Hiring for Software Developer",
      date: "20 October 2019",
      src:"https://images.unsplash.com/photo-1612531950554-3f3a2e0c1b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGF8ZW58MHx8MHx8fDA%3D"

    }


  ];
  const arr2 = [
    {
      key: 1,
      job: "Software Developer",
    },
    {
      key: 2,
      job: "Data Analyst",
    },
    {
      key: 3,
      job: "Web Developer",
    },
    {
      key: 4,
      job: "UI/UX Designer",
    },
    {
      key: 5,
      job: "Product Manager",

    },
    {
      key: 6,
      job: "Digital Marketing",
    },
    {
      key: 7,
      job: "Business Analyst",
    },
    {
      key: 8,
      job: "Frontend Developer",
    },
    {
      key: 9,
      job: "Backend Developer",

    },
    {
      key: 10,
      job: "Full Stack Developer",
    },
    {
      key: 11,
      job: "DevOps Engineer",
    },
    {
      key: 12,
      job: "Cloud Engineer",
    },
    {
      key: 13,
      job: "Cyber Security Analyst",
    },
    {
      key: 14,
      job: "Network Engineer",
    },
    {
      key: 15,
      job: "Software Engineer",
    },
    {
      key: 16,
      job: "System Engineer",
    },
    {
      key: 17,
      job: "Machine Learning Engineer",
    },
    {
      key: 18,
      job: "Data Scientist",
    },
    {
      key: 19,
      job: "AI Engineer",
    },
    {
      key: 20,
      job: "Game Developer",
    },
    {
      key: 21,
      job: "Mobile App Developer",
    },
    { 
      key: 22,
      job: "Embedded Engineer",
    },
    {
      key: 23,
      job: "IOT Engineer",
    },
    {
      key: 24,
      job: "Blockchain Developer",
    },
    {
      key: 25,
      job: "Software Tester",
    },
    {
      key: 26,
      job: "Quality Assurance Engineer",
    },
    {
      key: 27,
      job: "Technical Support Engineer",
    },
    {
      key: 28,
      job: "Network Administrator",
    },
    {
      key: 29,
      job: "Database Administrator",
    },
    {
      key: 30,
      job: "System Administrator",
    },
    {
      key: 31,
      job: "IT Support Specialist",
    },
    {
      key: 32,
      job: "IT Manager",
    },
    {
      key: 33,
      job: "IT Director",
    },
    {
      key: 34,
      job: "IT Security Specialist",
    },
    {
      key: 35,
      job: "IT Consultant",
    },
    {
      key: 36,
      job: "IT Auditor",
    },
    {
      key: 37,
      job: "IT Sales Professional",
    },
    {
      key: 38,
      job: "IT Trainer",
    },
    {
      key: 39,
      job: "IT Recruiter",
    },

  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div>
      <section className="bg-white dark:bg-pink-700">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className=" md:h-80 sm:h-100 mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome to JobHive
            </h1>
            <p className="max-w-2xl mb-6 font-light text-pink-300 lg:mb-8 md:text-lg lg:text-xl dark:text-pink-200">
              Your job search ends here. Find the best jobs and internships that
              match your skills and interests. Discover 10 million job postings!
            </p>
            <Link
              to={"/register"}
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black hover:bg-pink-400 hover:text-white bg-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Register as Applicant
            </Link>
            <Link
              to={"/registerRecruiter"}
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black hover:bg-pink-400 hover:text-white bg-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Register as Employer
            </Link>
            <Link
              to={"/login"}
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black hover:bg-pink-400 hover:text-white bg-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Login
            </Link>
          </div>
          <div className="hidden rounded-full lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="/src/assets/images/logohero1.png"
              alt="mockup"
              className=" border border-none  rounded-md"
            />
          </div>
        </div>
        <div className="bg-pink-900 p-10 " >
          <form className="max-w-md mx-auto  relative">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-pink-900 sr-only dark:text-pink-900"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-pink-900 border border-pink-900 rounded-lg bg-white focus:ring-pink-900 focus:border-pink-900 dark:bg-white dark:border-white dark:placeholder-pink-900 dark:text-pink-900 dark:focus:ring-pink-500 dark:focus:border-pink-500"
                placeholder="Search Jobs by City"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-900 font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-900 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-3/4 m-auto">
          <section className="bg-white mt-10 dark:bg-pink-700">
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-semibold text-pink-800 capitalize lg:text-3xl dark:text-white">
                Job openings in top companies
              </h1>
            </div>
          </section>
          <div className="mt-1">
            <Slider {...settings}>
              {arr.map((item) => (
                <div
                  className="bg-white h-[450px] text-black rounded-xl "
                  key={item.key}
                >
                  <div className="h-56 rounded-t-xl bg-pink-900 flex justify-center items-center ">
                    <img
                      src={item.src}
                      alt=""
                      className="h-44 w-44 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center p-4 gap-4">
                    <p className="text-xl font-semibold">{item.description}</p>
                    <p>{item.date}</p>
                    <button className="bg-pink-900 text-white text-lg py-1 rounded-xl px-6">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-pink-900">
          <section className=" mt-10 ">
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-semibold text-pink-800 capitalize lg:text-3xl dark:text-white">
                Job openings in top companies
              </h1>
            </div>
          </section>
          <div className="" id="slider">
            <div className="" id="slide-track">
              {arr2.map((item) => (
                <div className="" id="slide" key={item.key}>
                  <div className="bg-white w-auto h-40 p-10  rounded-xl flex justify-center items-center">
                    <a className="text-xl  font-semibold cursor-pointer">
                      {item.job}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="bg-white dark:bg-pink-700">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-pink-900 dark:text-white">
                Testimonials
              </h2>
              <p className="mb-8 font-light text-white lg:mb-16 sm:text-xl dark:text-white">
                Join the Community of 10 million+ Job Seekers and Recruiters
              </p>
            </div>
            <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
              <figure className="flex flex-col justify-center items-center p-8 text-center bg-pink-50 border-b border-pink-200 md:p-12 lg:border-r dark:bg-pink-800 dark:border-pink-700">
                <blockquote className="mx-auto mb-8 max-w-2xl text-pink-500 dark:text-pink-400">
                  <h3 className="text-lg font-semibold text-pink-900 dark:text-white">
                    I found my dream job through JobHive!
                  </h3>
                  <p className="my-4">
                    The platform&apos; s user-friendly interface made it easy
                    for me to navigate job listings and connect with potential
                    employers. Within weeks of signing up, I had multiple
                    interview offers and ultimately landed a fantastic position
                    in my field. Thank you, JobHive!
                  </p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                    alt="profile picture"
                  />
                  <div className="space-y-0.5 font-medium dark:text-white text-left">
                    <div>Bonnie Green</div>
                    <div className="text-sm font-light text-pink-500 dark:text-pink-400">
                      Developer at Open AI
                    </div>
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col justify-center items-center p-8 text-center bg-pink-50 border-b border-pink-200 md:p-12 dark:bg-pink-800 dark:border-pink-700">
                <blockquote className="mx-auto mb-8 max-w-2xl text-pink-500 dark:text-pink-400">
                  <h3 className="text-lg font-semibold text-pink-900 dark:text-white">
                    JobHive revolutionized my job search experience.
                  </h3>
                  <p className="my-4">
                    The personalized job recommendations and proactive alerts
                    ensured I never missed out on any relevant opportunities.
                    Plus, the ability to showcase my skills and experience
                    through a comprehensive profile helped me stand out to
                    employers. I highly recommend JobHive to anyone seeking
                    their next career move.
                  </p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                    alt="profile picture"
                  />
                  <div className="space-y-0.5 font-medium dark:text-white text-left">
                    <div>Roberta Casas</div>
                    <div className="text-sm font-light text-pink-500 dark:text-pink-400">
                      Lead designer at Dropbox
                    </div>
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col justify-center items-center p-8 text-center bg-pink-50 border-b border-pink-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-pink-800 dark:border-pink-700">
                <blockquote className="mx-auto mb-8 max-w-2xl text-pink-500 dark:text-pink-400">
                  <h3 className="text-lg font-semibold text-pink-900 dark:text-white">
                    As a recent college graduate, I was struggling to find
                    entry-level positions in my industry.
                  </h3>
                  <p className="my-4">
                    JobHive came to the rescue! Not only did I find several
                    entry-level roles matching my qualifications, but the
                    platform also provided valuable resources for crafting
                    resumes and preparing for interviews. Thanks to JobHive, I
                    landed my first job out of college.
                  </p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="profile picture"
                  />
                  <div className="space-y-0.5 font-medium dark:text-white text-left">
                    <div>Jese Leos</div>
                    <div className="text-sm font-light text-pink-500 dark:text-pink-400">
                      Software Engineer at Facebook
                    </div>
                  </div>
                </figcaption>
              </figure>
              <figure className="flex flex-col justify-center items-center p-8 text-center bg-pink-50 border-pink-200 md:p-12 dark:bg-pink-800 dark:border-pink-700">
                <blockquote className="mx-auto mb-8 max-w-2xl text-pink-500 dark:text-pink-400">
                  <h3 className="text-lg font-semibold text-pink-900 dark:text-white">
                    JobHive exceeded my expectations in every way
                  </h3>
                  <p className="my-4">
                    Not only did I find my ideal job quickly, but I also
                    received valuable insights into the companies I applied to,
                    helping me make informed decisions about my career. The
                    support team was responsive and helpful throughout the
                    process. I could&apos;nt be happier with my experience on
                    JobHive!
                  </p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                    alt="profile picture"
                  />
                  <div className="space-y-0.5 font-medium dark:text-white text-left">
                    <div>Joseph McFall</div>
                    <div className="text-sm font-light text-pink-500 dark:text-pink-400">
                      CTO at Google
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section>
          <div className=" bg-pink-600 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <img
                  alt=""
                  src="https://plus.unsplash.com/premium_photo-1676666378898-3521cddc0f17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wbG95ZXJ8ZW58MHx8MHx8fDA%3D"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="lg:py-24">
                <h2 className="text-3xl text-pink-950 font-bold sm:text-4xl">
                  Want to hire?
                </h2>

                <p className="mt-4 text-white">
                  Post a job to reach millions of job seekers and get the best
                  talent for your company.
                </p>

                <Link
                  to={"/registerRecruiter"}
                  className="mt-8 inline-block rounded bg-pink-900 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-400"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Landing
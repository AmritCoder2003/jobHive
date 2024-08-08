

const About = () => {
  return (
    <div>
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center ">
            <img
              className="rounded-md"
              src="/src/assets/images/aboutus.png"
              alt=""
            />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-pink-500 border-b-2 border-pink-600 uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span className="text-pink-600">Our Company</span>
            </h2>
            <p className="text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
              commodi doloremque, fugiat illum magni minus nisi nulla numquam
              obcaecati placeat quia, repellat tempore voluptatum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
import {useRouteError} from 'react-router-dom';
import { Link } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if(error.status===404){
    return (
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <img
            src="/src/assets/images/error404.png"
            className="mx-auto h-56 w-auto rounded-lg text-black  sm:h-64"
          ></img>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-pink-900 sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-2 mb-4 text-pink-700 ">We cannot find that page.</p>
          <Link
            to="/dashboard"
            className="p-2 mt-2 rounded-md bg-pink-900 text-white "
          >
            Go to Dashboard!
          </Link>
        </div>
      </div>
    );
  }
  return (
    
      <div>
        <h3>Something went wrong</h3>
      </div>
    
  );
};

export default Error;

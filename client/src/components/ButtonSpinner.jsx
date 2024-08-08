import PropTypes from "prop-types";
import { ImSpinner } from "react-icons/im";
const ButtonSpinner = (props) => {
  return (
    <div>
      <button
        type="button"
        className="py-3 mt-3 px-6 font-xl flex justify-center items-center  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
      >
        <ImSpinner className="mr-2 animate-spin h-6 w-6 " />
        {props.message} ...
      </button>
    </div>
  );
};

export default ButtonSpinner;

ButtonSpinner.propTypes = {

  message: PropTypes.string.isRequired,
};
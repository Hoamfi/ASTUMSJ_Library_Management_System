import { useRef } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const ForgetPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center m-5 h-screen relative">
      <img src={logo} width={90} alt="" />
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-2xl font-semibold my-2"
      >
        Forget Password
      </h1>
      <div className="mt-5">
        <h3>Enter your email to receive a reset code.</h3>
        <form
          id="forgotForm"
          onSubmit={(e) => {
            e.preventDefault();
            if (emailRef.current !== null) {
              console.log(emailRef.current.value);
              navigate("/resetpassword");
            }
          }}
          className="flex flex-col"
        >
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Email"
            required
            className="border-2 border-gray-500 rounded-2xl py-2 px-3 my-2"
          />
          <button
            type="submit"
            className="px-3 py-2 mb-3 rounded-xl w-fit bg-black hover:bg-gray-800 text-white cursor-pointer"
          >
            Send Reset Code
          </button>
        </form>
        <Link to="/login">
          <FaArrowLeft className="inline mr-3" />
          Back to login
        </Link>
      </div>
      <div className="absolute bottom-8">
        <p>&copy; 2025 ASTUMSJ library</p>
      </div>
    </div>
  );
};

export default ForgetPassword;

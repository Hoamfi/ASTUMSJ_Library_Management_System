import { useRef, useState, type FormEvent } from "react";
import logo from "../assets/logo.png";
import apiClient from "../services/api-client";
import { Link } from "react-router-dom";

interface Props {
  email: string;
}

const VerifyEmail = ({ email }: Props) => {
  const otpRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isVerified, setVerified] = useState(false);
  const handleVerification = (event: FormEvent) => {
    event.preventDefault();
    if (otpRef.current !== null) {
      console.log(otpRef.current.value);
      apiClient
        .post("/creating/verifyregistration", {
          email: email,
          otp: otpRef.current.value,
        })
        .then(() => {
          setError("");
          setVerified(true);
        })
        .catch((err) => setError(err.response.data));
    }
  };

  return (
    <div className="flex flex-col items-center m-5 h-screen relative">
      <img src={logo} width={90} alt="" />
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-2xl font-semibold my-2"
      >
        Verify your email
      </h1>
      <div className="mt-5">
        <h3>
          we've sent you email verification code to <strong>{email}</strong>
        </h3>
        <div className="mt-5">
          <form onSubmit={handleVerification} className="flex flex-col">
            <div className="py-2 self-center">
              <label htmlFor="otp" className="block mb-2  text-sm font-medium">
                Enter code
              </label>
              <span>
                <input
                  ref={otpRef}
                  type="number"
                  className="border-2 border-gray-300 m-1 px-2 py-2 rounded-lg"
                  id="otp1"
                  required
                />
              </span>
            </div>
            {error && (
              <p className="text-red-500 text-sm self-center">{error}</p>
            )}
            {isVerified && (
              <p className="text-green-500 text-md self-center">
                🎉 your account is successfully verified. <br /> welcome to
                ASTUMSJ Library <br />
                <span>
                  <Link to="/login" className="text-blue-500">
                    Back to login
                  </Link>
                </span>
              </p>
            )}
            <div className="flex justify-end">
              <button
                className="py-2 px-2 bg-black rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer"
                type="submit"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-8">
        <p>&copy; 2025 ASTUMSJ library</p>
      </div>
    </div>
  );
};

export default VerifyEmail;

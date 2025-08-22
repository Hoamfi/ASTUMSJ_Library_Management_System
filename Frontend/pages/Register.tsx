import logo from "../src/assets/logo.png";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Register = () => {
  return (
    <div className="flex flex-col items-center m-5">
      <img src={logo} width={90} alt="" />
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-[2rem] font-semibold my-2"
      >
        Create Account
      </h1>
      <div style={{ maxWidth: "400px", minWidth: "300px" }}>
        <form action="">
          <div>
            <label htmlFor="name" className="block mb-2  text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              placeholder="First and last name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2  text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2  text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              placeholder="Atleast 6 characters"
            />
          </div>
          <div>
            <IoMdInformationCircleOutline className="inline" color="grey" />
            <p className="inline font-medium text-sm text-gray-500 ml-3">
              Passwords must be at least 6 characters.
            </p>
          </div>
          <div>
            <label
              htmlFor="re-password"
              className="block mb-2 mt-4  text-sm font-medium"
            >
              Re-enter password
            </label>
            <input
              type="re-password"
              id="re-password"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              placeholder="Atleast 6 characters"
            />
          </div>
          <div>
            <button className="w-full py-2 px-2 my-6 bg-black rounded-full text-white font-sans hover:bg-black/80 cursor-pointer">
              Create Account
            </button>
          </div>
        </form>
        <div>
          <p
            className="text-md"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            By creating an account, you agree to the ASTUMJ library{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
        <div className="mb-15 mt-10">
          <p>
            Already have an account?{" "}
            <span className="underline cursor-pointer">Sign in</span>
          </p>
        </div>

        <div className="flex justify-around  mt-10">
          <p className="cursor-pointer">Terms of service</p>
          <p className="cursor-pointer">Privacy</p>
          <p className="cursor-pointer">Help</p>
        </div>
        <div className="justify-self-center mt-3">
          <p>&copy; 2025 ASTUMSJ library</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

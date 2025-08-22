import logo from "../src/assets/logo.png";

const Login = () => {
  return (
    <div className="flex flex-col items-center m-5">
      <img src={logo} width={90} alt="" />
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-[2rem] font-semibold my-2"
      >
        Sign in
      </h1>
      <div style={{ maxWidth: "400px", minWidth: "300px" }}>
        <form action="">
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
            />
          </div>
          <div>
            <button className="w-full py-2 px-2 my-6 bg-black rounded-full text-white font-sans hover:bg-black/80 cursor-pointer">
              Sign in
            </button>
          </div>
        </form>
        <div>
          <p
            className="text-md"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            By signing in, you agree to the ASTUMSJ library{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
          
        <div className="my-10">
            <p className="mb-3">New to ASTUMSJ library?</p>
          <button className="w-full py-2 px-2 mb-7 border border-grey rounded-full  font-sans hover:bg-black/10 cursor-pointer">
            Sign up
          </button>
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

export default Login;

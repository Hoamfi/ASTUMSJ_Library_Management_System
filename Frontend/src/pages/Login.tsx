import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

interface Props {
  onLogin: (data: { email: string; password: string }) => void;
  error?: string;
}

const schema = z.object({
  email: z.email("Required"),
  password: z.string({ message: "Required" }),
});

type FormData = z.infer<typeof schema>;

const Login = ({ onLogin, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
        <form action="" onSubmit={handleSubmit((data) => onLogin(data))}>
          <div>
            <label htmlFor="email" className="block mb-2  text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2  text-sm font-medium"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
          <Link to="/register">
            <button className="w-full py-2 px-2 mb-7 border border-grey rounded-full  font-sans hover:bg-black/10 cursor-pointer">
              Sign up
            </button>
          </Link>
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

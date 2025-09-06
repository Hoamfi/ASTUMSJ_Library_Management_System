import logo from "../assets/logo.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useState } from "react";

interface Props {
  emailToVerify: (email: string) => void;
}

const schema = z
  .object({
    name: z
      .string()
      .min(5, { message: "Name must be atleast 5 characters long" }),
    email: z.email("Invalid Email."),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters long" }),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password do not match",
    path: ["rePassword"],
  });

type FormData = z.infer<typeof schema>;

const Register = ({ emailToVerify }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    apiClient
      .post("/creating/register", newUser)
      .then((res) => {
        emailToVerify(data.email);
        navigate("/verifyemail");
      })
      .catch((error) => setError(error.response.data));
  };

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
        Create Account
      </h1>
      <div style={{ maxWidth: "400px", minWidth: "300px" }}>
        <form
          onSubmit={handleSubmit((data) => {
            handleRegister(_.pick(data, ["name", "email", "password"]));
          })}
        >
          <div>
            <label htmlFor="name" className="block mb-2  text-sm font-medium">
              Your Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              placeholder="First and last name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mt-2 mb-1 text-sm font-medium"
            >
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mt-2 mb-1  text-sm font-medium"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              placeholder="Atleast 6 characters"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
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
              {...register("rePassword")}
              type="password"
              id="rePassword"
              className="rounded-full m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm">
                {errors.rePassword.message}
              </p>
            )}
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
            <Link to="/login" className="underline cursor-pointer">
              Sign in
            </Link>
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

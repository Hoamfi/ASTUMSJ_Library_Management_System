import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import _ from "lodash";
import Back from "../components/Back";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  id?: string;
  email?: string;
}

const schema = z
  .object({
    email: z.email({ message: "Email is Required" }),
    currentPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters long" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters long" }),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password do not match",
    path: ["confirmNewPassword"],
  });

type FormData = z.infer<typeof schema>;

const ChangePassword = ({ id, email }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleChangePassword = (data: {
    email: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    const updateProfile = {
      _id: id,
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    apiClient
      .put("/students/changePassword", updateProfile, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => {
        setProfileUpdated(true);
        localStorage.removeItem("token");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <>
      {profileUpdated && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1d293d] p-5 shadow-xl dark:text-white rounded-lg flex flex-col w-md font-sans">
            <h1 className="text-3xl">
              🎉 You've Updated ur Profile Successfully
            </h1>
            <button
              className="py-2 px-2 bg-black rounded-lg text-white font-sans justify-end hover:bg-black/80 cursor-pointer mt-10 mb-3"
              onClick={() => {
                setProfileUpdated(false);
                navigate("/login");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <div className="w-fit mx-auto">
        <Back path="/" />
        <div className="flex flex-col items-center bg-white dark:bg-[#1d293d]  px-10 py-5 my-5  rounded-2xl shadow">
          <h1
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            className="text-[2rem] font-semibold my-2"
          >
            Update Password
          </h1>
          <form
            onSubmit={handleSubmit((data) => {
              handleChangePassword(
                _.pick(data, ["email", "currentPassword", "newPassword"])
              );
            })}
            className="flex flex-col"
          >
            <div className="py-2">
              <label
                htmlFor="email"
                className="block mb-2  text-md font-medium"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                value={email}
                className=" rounded-lg m-1 px-4 py-2 border w-full border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="py-2 md:w-lg lg:w-xl">
              <label
                htmlFor="currentPassword"
                className="block mb-2  text-md font-medium"
              >
                Current Password
              </label>
              <input
                {...register("currentPassword")}
                type="password"
                id="currentPassword"
                className=" rounded-lg m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-red-500 font-medium text-sm">{error}</p>
            )}
            <div className="py-2">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-md font-medium"
              >
                New Password
              </label>
              <input
                {...register("newPassword")}
                type="password"
                id="newPassword"
                className=" rounded-lg m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="py-2">
              <label
                htmlFor="confirmNewPassword"
                className="block mb-2 text-md font-medium"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmNewPassword")}
                type="password"
                id="confirmNewPassword"
                className=" rounded-lg m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
            <div className="self-end ">
              <button className="py-2 px-2 bg-black dark:bg-gray-900 rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

import logo from "../assets/logo.png";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  email: string;
}

const ResetPassword = ({ email }: Props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const schema = z
    .object({
      otp: z.string().length(6, { message: "Invalid OTP" }),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const handlePasswordReset = (otp: string, newPassword: string) => {
  //   console.log(`"${otp}"`);
  //   apiClient
  //     .post("/forgotpassword/verifyotp", { otp: otp, email: email})
  //     .then(() => {
  //       apiClient
  //         .post("/forgotpassword/resetpassword", {
  //           otp: `"${otp}"`,
  //           newPassword: newPassword,
  //         })
  //         .then((res) => setSuccess(res.data))
  //         .catch((err) => setError(err.response.data));
  //     }
  //   )
  //     .catch((err) => setError(err.response.data));
  // };
  const handlePasswordReset = (otp: string, newPassword: string) => {
    console.log(otp);
    // apiClient
    //   .post("/forgotpassword/verifyotp", { otp: otp, email: email})
    //   .then(() => {
        apiClient
          .post("/forgotpassword/resetpassword", {
            otp: otp,
            newPassword: newPassword,
          })
          .then((res) => setSuccess(res.data))
          .catch((err) => setError(err.response.data));
    //   }
    // )
    //   .catch((err) => setError(err.response.data));
  };

  return (
    <div className="flex flex-col items-center m-5 h-screen relative">
      <img src={logo} width={90} alt="" />
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-2xl font-semibold my-2"
      >
        Reset Password
      </h1>
      <div className="mt-5">
        <form
          onSubmit={handleSubmit((data) => {
            handlePasswordReset(data.otp, data.newPassword);
          })}
          className="flex flex-col"
        >
          <div className="py-2">
            <label htmlFor="otp" className="block mb-2 text-sm font-medium">
              Enter Reset Code
            </label>
            <span>
              <input
                {...register("otp")}
                type="number"
                className="border-2 border-gray-300 m-1 px-2 py-2 rounded-lg"
                id="otp1"
                required
              />
            </span>
            {error && <p className="text-red-500 text-sm my-1">{error}</p>}
          </div>
          <div className="py-2">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium"
            >
              New Password
            </label>
            <input
              {...register("newPassword")}
              type="password"
              id="newPassword"
              className="rounded-lg m-1 px-4 py-2 border-1 w-full border-gray-400"
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
              className="block mb-2 text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmNewPassword")}
              type="password"
              id="confirmNewPassword"
              className="rounded-lg m-1 px-4 py-2 border-1 w-full border-gray-400"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
          <div className="self-end ">
            <button className="py-2 px-2 bg-black rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer">
              Reset
            </button>
          </div>
          {success && (
            <span>
              <p className="text-green-500 text-lg">🎉 {success}</p>
              <Link to="/login" className="text-blue-500">
                Back to login
              </Link>
            </span>
          )}
        </form>
      </div>
      <div className="absolute bottom-8">
        <p>&copy; 2025 ASTUMSJ library</p>
      </div>
    </div>
  );
};

export default ResetPassword;

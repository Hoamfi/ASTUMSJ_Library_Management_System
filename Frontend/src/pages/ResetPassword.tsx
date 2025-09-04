import logo from "../assets/logo.png";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const otp: string[] = [];
  const schema = z
    .object({
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
            console.log({ OTP: otp.join(), password: data.newPassword });
          })}
          className="flex flex-col"
        >
          <div className="py-2">
            <label htmlFor="otp" className="block mb-2  text-sm font-medium">
              Enter Reset Code
            </label>
            <span>
              <input
                type="text"
                className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                id="otp1"
                maxLength={1}
                required
                onChange={(e) => (otp[0] = e.target.value)}
              />
              <input
                type="text"
                className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                id="otp2"
                maxLength={1}
                required
                onChange={(e) => (otp[1] = e.target.value)}
              />
              <input
                type="text"
                className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                id="otp3"
                maxLength={1}
                required
                onChange={(e) => (otp[2] = e.target.value)}
              />
              <input
                type="text"
                className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                id="otp4"
                maxLength={1}
                required
                onChange={(e) => (otp[3] = e.target.value)}
              />
              <input
                type="text"
                className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                id="otp5"
                maxLength={1}
                required
                onChange={(e) => (otp[4] = e.target.value)}
              />
              <input
                type="text"
                className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                id="otp6"
                maxLength={1}
                required
                onChange={(e) => (otp[5] = e.target.value)}
              />
            </span>
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
        </form>
      </div>
      <div className="absolute bottom-8">
        <p>&copy; 2025 ASTUMSJ library</p>
      </div>
    </div>
  );
};

export default ResetPassword;

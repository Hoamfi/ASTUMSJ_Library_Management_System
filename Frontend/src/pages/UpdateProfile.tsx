import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import _ from "lodash";

interface Props {
  email?: string;
  error: string;
  onUpdate: (data: {
    email: string;
    currentPassword: string;
    newPassword: string;
  }) => void;
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

const UpdatePassword = ({ email, onUpdate, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  useEffect(() => {
    if (email) setValue("email", email);
  }, [email, setValue]);
  return (
    <div className="flex flex-col items-center justify-center h-full p-5 m-5 shadow-7xl">
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-[2rem] font-semibold my-2"
      >
        Update Password
      </h1>
      <form
        onSubmit={handleSubmit((data) => {
          onUpdate(_.pick(data, ["email", "currentPassword", "newPassword"]));
        })}
        className="flex flex-col"
      >
        <div className="py-2">
          <label htmlFor="email" className="block mb-2  text-lg font-medium">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            // value={user?.email}
            className=" rounded-lg m-1 px-4 py-2 border w-full border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="py-2 md:w-lg lg:w-xl">
          <label
            htmlFor="currentPassword"
            className="block mb-2  text-lg font-medium"
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
        {error && <p className="text-red-500 font-medium text-lg">{error}</p>}
        <div className="py-2">
          <label
            htmlFor="newPassword"
            className="block mb-2  text-lg font-medium"
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
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="py-2">
          <label
            htmlFor="confirmNewPassword"
            className="block mb-2  text-lg font-medium"
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
          <button className="py-2 px-2 bg-black rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;

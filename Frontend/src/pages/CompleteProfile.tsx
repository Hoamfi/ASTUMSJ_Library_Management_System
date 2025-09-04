import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import _, { toInteger } from "lodash";
import { useEffect, useState } from "react";
import Back from "../components/Back";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  fullname: z.any(),
  email: z.any(),
  studyYear: z.string().length(1, { message: "Invalid Year" }),
  campusId: z.string().length(5, { message: "Invalid Id" }),
  department: z.string().min(3, { message: "Invalid Department" }),
});
type FormData = z.infer<typeof schema>;

const CompleteProfile = () => {
  const [idSuffix, setIdSuffix] = useState(0);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/students/me", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setId(res.data._id);
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((error) => console.log(error));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleCompletion(data: FormData) {
    const user = {
      _id: id,
      name: data.fullname,
      email: data.email,
      studyYear: data.studyYear,
      campusId: `UGR/${data.campusId}/${idSuffix}`,
      department: data.department,
    };
    apiClient
      .patch("/students/completeprofile", user, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => setShowSuccessPopUp(true))
      .catch((err) => console.error(err.response.data));
  }

  return (
    <div className=" w-fit mx-auto">
      {showSuccessPopUp && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1d293d] p-5 shadow-xl dark:text-white rounded-lg flex flex-col w-md font-sans">
            <h1 className="text-3xl">
              🎉 You've Successfully Completed Your Profile
            </h1>
            <button
              className="py-2 px-2 bg-black rounded-lg text-white font-sans justify-end hover:bg-black/80 cursor-pointer mt-10 mb-3"
              onClick={() => {
                setShowSuccessPopUp(false);
                navigate("/login");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <Back path="/" />
      <div className="flex flex-col items-center bg-white dark:bg-[#1d293d] px-10 py-5 my-5  rounded-2xl shadow">
        <h1
          style={{ fontFamily: "'Libre Baskerville', serif" }}
          className="text-[2rem] font-semibold my-2"
        >
          Complete Your profile
        </h1>
        <form
          onSubmit={handleSubmit((data) => handleCompletion(data))}
          className="flex flex-col"
        >
          <div className="py-2">
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium"
            >
              Full name
            </label>
            <input
              {...register("fullname")}
              type="text"
              id="fullname"
              value={name}
              className=" rounded-lg m-1 px-4 py-2 border w-full border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
          </div>
          <div className="py-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              value={email}
              className=" rounded-lg m-1 px-4 py-2 border w-full border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
          </div>
          <div className="py-2 md:w-lg lg:w-xl">
            <label
              htmlFor="studyYear"
              className="block mb-2 text-sm font-medium"
            >
              Study Year
            </label>
            <select
              {...register("studyYear")}
              id="email"
              className="rounded-md m-1 dark:bg-[#1d293d] px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              onChange={(e) => setIdSuffix(19 - toInteger(e.target.value))}
            >
              <option></option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
            </select>
            {errors.studyYear && (
              <p className="text-red-500 text-sm">{errors.studyYear.message}</p>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="campusId"
              className="block text-sm mb-2 font-medium"
            >
              Campus Id
            </label>
            <span className=" rounded-lg m-1 px-4 py-2 border w-full border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <span className="mr-1">UGR/</span>
              <input
                {...register("campusId")}
                type="text"
                id="campusId"
                className="border-0 outline-0 bg-none"
              />
              <span>/{idSuffix}</span>
            </span>
            {errors.campusId && (
              <p className="text-red-500 text-sm">{errors.campusId.message}</p>
            )}
          </div>
          <div className="py-2">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-medium"
            >
              Department
            </label>
            <input
              {...register("department")}
              type="text"
              id="department"
              className=" rounded-lg px-4 py-2 border w-full border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
            />
            {errors.department && (
              <p className="text-red-500 text-sm">
                {errors.department.message}
              </p>
            )}
          </div>
          <div className="self-end ">
            <button className="py-2 px-2 bg-black dark:bg-gray-900 rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer">
              Complete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;

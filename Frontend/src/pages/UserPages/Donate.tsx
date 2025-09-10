import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import apiClient from "../../services/api-client";

interface Props {
  id?: string;
}

export default function Donate({ id }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ amount: number; screenshot: FileList }>();

  const handleDonation = (data: { amount: number; screenshot: FileList }) => {
    const imageFile = data.screenshot?.[0];
    const imageData = new FormData();

    imageData.append("image", imageFile);
    if (!id) {
      toast.error("unknown error occured please refresh the page");
      return;
    }

    const toastId = toast.loading("Uploading screenshot...");

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=82bca9b4b1e6512f2421267af231717d`,
        imageData
      )
      .then((res) => {
        const screenshot = res.data.data.url;
        const newdonation = {
          userId: id,
          amount: data.amount,
          screenshot: screenshot,
        };
        apiClient
          .post(`/donations/donate`, newdonation, {
            headers: { "x-auth-token": localStorage.getItem("token") },
          })
          .then((res) => {
            toast.dismiss(toastId);
            toast.success(res.data.message);
            navigate("/");
          })
          .catch((error) => {
            toast.dismiss(toastId);
            toast.error(error.response.data);
          });
      })
      .catch((err) => {
        toast.dismiss(toastId);
        toast.error(err.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        💝 Support Our Library
      </h1>
      <p className="text-gray-700 dark:text-gray-400 text-center mb-6">
        Your donations are crucial in keeping our library running, maintaining
        our collection, and adding more amazing books for everyone to enjoy.
        Every contribution makes a big difference 📚✨
      </p>
      <p>
        <strong className=" text-gray-700 dark:text-gray-400 mx-3">CBE:</strong>{" "}
        1000473423862
      </p>
      <p>
        <strong className=" text-gray-700 dark:text-gray-400 mx-3">
          TeleBirr:
        </strong>{" "}
        0907080605
      </p>
      <form
        onSubmit={handleSubmit((data) => handleDonation(data))}
        className="dark:bg-[#1d293d] shadow-md rounded-2xl p-6 space-y-6 mt-2"
      >
        <div>
          <label
            htmlFor="amount"
            className="block text-gray-700 dark:text-gray-400 font-semibold mb-2"
          >
            Donation Amount (ETB)
          </label>
          <input
            {...register("amount", { required: true })}
            type="number"
            id="amount"
            className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            placeholder="Enter amount"
          />
          {errors.amount?.type === "required" && (
            <p className="text-red-500 text-sm">
              Please enter the payment amount
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="screenshot"
            className="block text-gray-700 dark:text-gray-400 font-semibold mb-2"
          >
            Upload Payment Screenshot
          </label>
          <input
            {...register("screenshot", { required: true })}
            type="file"
            accept="image/*"
            id="screenshot"
            className="w-full text-gray-600 border border-dashed border-gray-400 rounded-lg p-3 cursor-pointer"
          />
          {errors.screenshot?.type === "required" && (
            <p className="text-red-500 text-sm">
              Please consider uploading the payment screenshot
            </p>
          )}
        </div>
        <button className="w-full py-3 px-2 bg-black rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer">
          Submit Donation
        </button>
      </form>
    </div>
  );
}

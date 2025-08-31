import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: { amount: number; screenshot: FileList }) => void;
}

export default function Donate({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ amount: number; screenshot: FileList }>();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        💝 Support Our Library
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Your donations are crucial in keeping our library running, maintaining
        our collection, and adding more amazing books for everyone to enjoy.
        Every contribution makes a big difference 📚✨
      </p>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="amount"
            className="block text-gray-700 font-semibold mb-2"
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
            className="block text-gray-700 font-semibold mb-2"
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

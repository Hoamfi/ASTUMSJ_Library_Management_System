import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import apiClient from "../../services/api-client";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be atleast 10 characters." }),
  catagory: z.string().min(1, { message: "Catagory is required" }),
  publicationYear: z
    .number()
    .min(1900, { message: "Please enter a valid year." })
    .max(new Date().getFullYear(), { message: "Please eznter a valid year." }),
  bookCover: z.any(),
  totalCopies: z.number().positive({ message: "Must be greater than 1" }),
  pages: z.number().positive({ message: "Number of pages cant be -ve" }),
});

type FormData = z.infer<typeof schema>;

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { totalCopies: 1 },
  });

  function handleAddBook(data: FormData) {
    const imageFile = data.bookCover?.[0];
    const imageData = new FormData();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    imageData.append("image", imageFile);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=82bca9b4b1e6512f2421267af231717d`,
        imageData
      )
      .then((res) => {
        console.log(res.data.data.url);
        const newBook = {
          title: data.title,
          author: data.author,
          description: data.description,
          catagory: data.catagory,
          publicationYear: data.publicationYear,
          bookCover: res.data.data.url,
          totalCopies: data.totalCopies,
        };
        apiClient
          .post("/books", newBook, {
            headers: { "x-auth-token": localStorage.getItem("token") },
          })
          .then(() => navigate("/"))
          .catch((error) => setError(error.response.data));
      })
      .catch((error) => setError(error.response.data));
  }

  return (
    <div className="flex flex-col items-center w-fit px-10 py-5 my-5 mx-auto rounded-2xl shadow bg-white dark:bg-[#1d293d]">
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-[2rem] font-semibold my-2"
      >
        Add New Book
      </h1>
      <div className="max-w-sm md:min-w-[400px] lg:min-w-[600px]">
        <form
          onSubmit={handleSubmit((data) => {
            handleAddBook(data);
          })}
        >
          <div>
            <label
              htmlFor="title"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              placeholder="The Psychology of Money"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="author"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Author
            </label>
            <input
              {...register("author")}
              type="text"
              id="author"
              placeholder="Morgan Housel"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="catagory"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Catagories
            </label>
            <select
              {...register("catagory")}
              id="catagory"
              className="rounded-md m-1 dark:bg-[#1d293d] px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            >
              <option></option>
              <option value="islamic">Islamic</option>
              <option value="self">Self Help</option>
              <option value="bussiness">Bussiness</option>
            </select>
            {errors.catagory && (
              <p className="text-red-500 text-sm">{errors.catagory.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="pages"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Pages
            </label>
            <input
              {...register("pages", { valueAsNumber: true })}
              type="number"
              id="pages"
              placeholder="10"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.pages && (
              <p className="text-red-500 text-sm">{errors.pages.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              id="description"
              placeholder="Book Description"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="publicationYear"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Publication Year
            </label>
            <input
              {...register("publicationYear", { valueAsNumber: true })}
              type="string"
              id="publicationYear"
              placeholder="2015"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.publicationYear && (
              <p className="text-red-500 text-sm">
                {errors.publicationYear.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="bookCover"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              Book Cover
            </label>
            <input
              {...register("bookCover", { required: true })}
              type="file"
              accept=".jpg, .png"
              id="bookCover"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.bookCover?.type === "required" && (
              <p className="text-red-500 text-sm">Book cover is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="totalCopies"
              className="block w-full mt-2 mb-1 text-lg font-medium"
            >
              TotalCopies
            </label>
            <input
              {...register("totalCopies", { valueAsNumber: true })}
              type="number"
              id="totalCopies"
              placeholder="10"
              className="rounded-md m-1 px-4 py-2 w-full border border-black/15 sm:text-sm/6 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
            {errors.totalCopies && (
              <p className="text-red-500 text-sm">
                {errors.totalCopies.message}
              </p>
            )}
          </div>
          <div>
            <button className="w-full py-2 px-2 my-6 bg-black dark:bg-gray-900 rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;

import { useEffect, useState } from "react";
import { IoSunny, IoMoonOutline } from "react-icons/io5";

const DarkModeToggler = () => {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`rounded-full px-1 w-fit py-1 ${dark ? "bg-gray-600" : "bg-[#fbbf24]/50"} flex gap-3`}
    >
      <span
        className={`p-1 rounded-full bg-[#fbbf24] transition-all duration-400 flex ${dark ? "opacity-1 " : "opacity-full"}`}
      >
        <IoSunny className="cursor-pointer text-white inline self-center" />
      </span>
      <span
        className={`p-1 rounded-full bg-gray-900 transition-all duration-400 flex ${!dark ? "opacity-1 " : "opacity-full"}`}
      >
        <IoMoonOutline className="cursor-pointer text-white self-center inline" />
      </span>
    </button>
  );
};

export default DarkModeToggler;

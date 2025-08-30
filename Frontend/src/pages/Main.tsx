import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
      {/*  DESKTOP SIDEBAR (base column) */}
      <aside
        className={`hidden shadow-xl lg:block row-span-3 transition-[width] duration-300 ${isOpen ? "w-64" : "w-16"} h-full relative group `}
      >
        <SideBar open={isOpen} />
      </aside>

      {/* MOBILE SIDEBAR  */}
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden bg-transparent"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen shadow-2xl w-64 z-50 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar open={isOpen} />
      </aside>

      {/* HEADER  */}
      <header className="flex items-center col-span-2 md:col-start-2 md:col-span-1">
        <Header isOpen={(state) => setOpen(state)} />
      </header>

      {/* MAIN */}
      <main className="col-span-2 lg:col-start-2 lg:col-span-1 max-h-[84vh] bg-gray-100 overflow-y-auto">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="col-span-2 lg:col-start-2 lg:col-span-1">
        <Footer />
      </footer>
    </div>
  );
};

export default Main;

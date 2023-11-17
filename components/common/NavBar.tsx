// @ts-nocheck
"use client";
//* Imports
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import NavLink from "../core/NavLink";
import Modal from "../modal/Modal";
import LoginForm from "../login/LoginForm";

//* NavBar Component
const NavBar: FC = () => {
    const { pathname } = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (formData) => {
        console.log("handleSubmit: ");
        // closeAndResetModal();
    };

    const handleDeleteHotel = (hotel) => {
        const updatedHotels = hotels.filter((h) => h.id !== hotel.id);
        setHotels(updatedHotels);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeAndResetModal = () => {
        setIsModalOpen(false);
    };


    let isLogged = false;
    if (typeof window !== "undefined") {
        // El código aquí se ejecutará solo en el lado del cliente
        const userString = localStorage.getItem("user");
      
        if (userString !== null) {
          const userData = JSON.parse(userString);
          console.log(userData);
        } else {
          console.log("No hay información de usuario en el localStorage");
        }
        
        if (userString !== null) {
            const userData = JSON.parse(userString);
            isLogged = userData
        } else {
            console.log("No hay información de usuario en el localStorage");
        }
      }

    return (
        <div
            className={
                "navbar duration-100  w-full " +
                (pathname === "/"
                    ? "bg-transparent absolute top-0 z-20"
                    : "bg-orange-600/90 block")
            }
        >
            <header className="text-gray-600 body-font">
                <div className="container flex items-center justify-between px-4 py-3 mx-auto">
                    <Link href="/">
                        <a className="inline-flex items-center text-lg font-semibold gap-x-2">
                            <img
                                src="/images/logo.png"
                                className="w-10 h-10"
                                alt="Website Logo"
                            />
                            <span className="w-40 text-xl font-bold text-white">
                                Events
                            </span>
                        </a>
                    </Link>
                    <nav className="flex items-center justify-center gap-3 text-base md:ml-auto">
                        <NavLink
                            styleName="p-[10px] md:p-[13px] font-semibold duration-300 rounded-xl bg-transparent text-white hover:bg-slate-800/90"
                            href={"/"}
                            activePath={"/"}
                        >
                            Home
                        </NavLink>
                        {isLogged && (
                            <NavLink
                                styleName="p-[10px] md:p-[13px] font-semibold duration-300 rounded-xl bg-transparent text-white hover:bg-slate-800/90"
                                href={"/events"}
                                activePath={"/events"}
                            >
                                Events
                            </NavLink>
                        )}
                        {isLogged || (
                            <div
                                className="p-[10px] cursor-pointer md:p-[13px] font-semibold duration-300 rounded-xl bg-transparent text-white hover:bg-slate-800/90"
                                onClick={openModal}
                            >
                                Sign up
                            </div>
                        )}
                        <a
                            href="https://github.com/enzof10"
                            target="_blank"
                            rel="noreferrer"
                            className="items-center justify-center hidden pt-3 border-t-2 md:flex project-link sm:pt-0 sm:pl-3 sm:border-l-2 sm:border-t-0 border-slate-200/50"
                        >
                            <div className="p-3 duration-300 rounded-full hover:bg-slate-800/90">
                                <img
                                    src="/images/github-icon.svg"
                                    className="fil"
                                    alt="Github Icon"
                                />
                            </div>
                        </a>
                    </nav>
                </div>
            </header>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeAndResetModal}
                contentLabel="Editar Hotel"
                className="modal"
                overlayClassName="overlay"
            >
                <LoginForm onSubmit={handleSubmit} />
                <button
                    onClick={closeAndResetModal}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
};

export default NavBar;

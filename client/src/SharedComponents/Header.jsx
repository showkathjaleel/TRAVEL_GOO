import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import DecodeUser from "./DecodeUser";
import { AuthUser } from "../Context/AuthUser";

export default function Header({ fixed }) {
  const { userAuth } = useContext(AuthUser);
  console.log(" from Header");

  const navigate = useNavigate();
  const [currentuser, setCurrentuser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  useEffect(() => {
    if (userAuth) {
      setIsLoggedIn(true);
      setCurrentuser(userAuth);
    }
  }, [userAuth]);



  const hostTrip = () => {
    navigate("/create-event");
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-socialBlue text-white  mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white "
              href="#pablo"
            >
              TRAVEL GOO
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  className="peer h-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                />
              </div>
            </div>

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

              <li>
              <button
                  className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-3"
                  onClick={hostTrip}
                >
                  Host a Trip
                </button>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Share</span>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">{currentuser.username}</span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

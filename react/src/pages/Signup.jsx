import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios.js";
import Footer from "../components/Footer.jsx";
import { FaEye, FaEyeSlash, FaLightbulb } from "react-icons/fa";
import { Loader as RsuiteLoader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Bulb from "../components/Bulb.jsx";

export default function Signup() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState({ __html: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [openAboutPopup, setOpenAboutPopup] = useState(false);

    const handleOpenAbout = () => {
        setOpenAboutPopup(true);
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPasswordConfirmation = () =>
        setShowPasswordConfirmation(!showPasswordConfirmation);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
        setLoading(true);

        axiosClient
            .post("/signup", {
                name: fullName,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    const errors = error.response.data.errors || {
                        message: [
                            error.response.data.message || "An error occurred",
                        ],
                    };
                    const finalErrors = Object.values(errors).reduce(
                        (accum, next) => [...accum, ...next],
                        []
                    );
                    setError({ __html: finalErrors.join("<br>") });
                } else {
                    setError({ __html: "An error occurred" });
                }
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-between">
            <div className="absolute top-10 right-10">
                <Bulb />
            </div>
            <div className="flex flex-col items-center my-auto w-full max-w-lg mx-auto">
                {error.__html && (
                    <div
                        className="w-full bg-red-100 text-center font-semibold text-sm rounded-md text-red-400 py-2 px-3 mb-2"
                        dangerouslySetInnerHTML={error}
                    ></div>
                )}
                <div className="bg-white drop-shadow-xl p-6 m-4 rounded-lg w-full animated fadeInDown">
                    <form onSubmit={onSubmit}>
                        <h1 className="text-2xl font-semibold text-center my-4">
                            Signup for free
                        </h1>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={(ev) => setFullName(ev.target.value)}
                            className="form-control p-3 my-3"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            className="form-control p-3 my-3"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="form-control p-3 my-3 w-full pr-10"
                            />
                            <span
                                onClick={toggleShowPassword}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            >
                                {showPassword ? (
                                    <FaEye className="w-5 h-5 text-gray-500 mr-2" />
                                ) : (
                                    <FaEyeSlash className="w-5 h-5 text-gray-500 mr-2" />
                                )}
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type={
                                    showPasswordConfirmation
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm password"
                                value={passwordConfirmation}
                                onChange={(ev) =>
                                    setPasswordConfirmation(ev.target.value)
                                }
                                className="form-control p-3 my-3 w-full pr-10"
                            />
                            <span
                                onClick={toggleShowPasswordConfirmation}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            >
                                {showPasswordConfirmation ? (
                                    <FaEye className="w-5 h-5 text-gray-500 mr-2" />
                                ) : (
                                    <FaEyeSlash className="w-5 h-5 text-gray-500 mr-2" />
                                )}
                            </span>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-4 bg-primary font-semibold cursor-pointer text-white text-center rounded-md mt-2"
                        >
                            {loading ? <RsuiteLoader size="sm" /> : "Signup"}
                        </button>
                        <p className="text-center mt-4 text-slate-500 text-sm md:text-base">
                            Have an account?{" "}
                            <Link to="/login" className="text-primary">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

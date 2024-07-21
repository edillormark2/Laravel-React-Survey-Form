import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Loader as RsuiteLoader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Bulb from "../components/Bulb";

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await axiosClient.post("/login", {
                email,
                password,
            });
            setCurrentUser(data.user);
            setUserToken(data.token);
        } catch (error) {
            let errorMessage = "Email or password is incorrect";
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = "Email or password is incorrect";
                } else {
                    const errors = error.response.data.errors || {
                        message: [error.response.data.message || errorMessage],
                    };
                    const finalErrors = Object.values(errors).reduce(
                        (accum, next) => [...accum, ...next],
                        []
                    );
                    errorMessage = finalErrors.join("<br>");
                }
            }
            setError(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-between">
            <div className="absolute top-10 right-10">
                <Bulb />
            </div>
            <div className="flex flex-col items-center my-auto w-full max-w-lg mx-auto">
                {error && (
                    <div
                        className="w-full bg-red-100 text-center font-semibold text-sm rounded-md text-red-400 py-2 px-3 mb-2"
                        dangerouslySetInnerHTML={{ __html: error }}
                    ></div>
                )}
                <div className="bg-white drop-shadow-xl p-6 m-4 rounded-lg w-full animated fadeInDown">
                    <form onSubmit={onSubmit} className="w-full">
                        <h1 className="text-2xl font-semibold text-center my-4">
                            Login into your account
                        </h1>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            className="form-control p-3 my-3"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="form-control p-3 my-3 w-full pr-10"
                                required
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
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-4 font-semibold cursor-pointer text-white text-center rounded-md mt-2 ${
                                loading ? "bg-blue-300" : "bg-blue-500"
                            }`}
                        >
                            {loading ? <RsuiteLoader size="sm" /> : "Login"}
                        </button>

                        <p className="text-center mt-4 text-slate-500 text-sm md:text-base">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-500 ml-1"
                                style={{ textDecoration: "none" }}
                            >
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

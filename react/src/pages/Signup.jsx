import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios.js";

export default function Signup() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

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
            });
    };

    return (
        <div className="animated fadeInDown h-screen">
            <div className="flex flex-col justify-center items-center h-full">
                {error.__html && (
                    <div
                        className="bg-red-500 rounded py-2 px-3 text-white"
                        dangerouslySetInnerHTML={error}
                    ></div>
                )}
                <form
                    onSubmit={onSubmit}
                    className="bg-white drop-shadow-lg p-8 rounded-lg w-96"
                >
                    <h1 className="text-xl font-bold text-center my-4">
                        Signup for free
                    </h1>
                    <input
                        type="text"
                        placeholder="Full Name"
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
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="form-control p-3 my-3"
                    />
                    <input
                        type="password"
                        placeholder="Password Confirmation"
                        value={passwordConfirmation}
                        onChange={(ev) =>
                            setPasswordConfirmation(ev.target.value)
                        }
                        className="form-control p-3 my-3"
                    />
                    <button
                        type="submit"
                        className="w-full p-4 bg-primary font-semibold cursor-pointer text-white text-center rounded-md"
                    >
                        Signup
                    </button>
                    <p className="text-center mt-4 text-slate-500">
                        Already Registered?{" "}
                        <Link to="/login" className="text-primary">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

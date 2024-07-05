import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ __html: "" });

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/login", {
                email,
                password,
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
                        Login into your account
                    </h1>
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
                    <button
                        type="submit"
                        className="w-full p-4 bg-primary font-semibold cursor-pointer text-white text-center rounded-md"
                    >
                        Signup
                    </button>
                    <p className="text-center mt-4 text-slate-500">
                        Not Registered?
                        <Link to="/signup" className="text-primary ml-1">
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

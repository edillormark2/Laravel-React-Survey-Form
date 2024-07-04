import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const onSubmit = (ev) => {
        ev.preventDefault();
    };
    return (
        <div className="animated fadeInDown h-screen">
            <div className="flex justify-center items-center h-full">
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
                        className="form-control p-3 my-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control p-3 my-3"
                    />
                    <div className="p-4 bg-primary font-semibold cursor-pointer text-white text-center rounded-md">
                        Signup
                    </div>
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

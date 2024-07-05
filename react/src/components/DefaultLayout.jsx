import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();

    if (!userToken) {
        return <Navigate to="login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between p-4 drop-shadow-lg bg-white">
                <div className="flex gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `p-2 rounded-md cursor-pointer ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-gray-200"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/surveys"
                        className={({ isActive }) =>
                            `p-2 rounded-md cursor-pointer ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-gray-200"
                            }`
                        }
                    >
                        Surveys
                    </NavLink>
                </div>
                <div className="flex gap-4">
                    <p className="text-center self-center font-semibold text-slate-500">
                        {currentUser.name}
                    </p>
                    <FaUserCircle
                        size={34}
                        className="text-gray-300 self-center"
                    />
                    <div
                        onClick={onLogout}
                        className="py-1 px-2 self-center text-sm cursor-pointer hover:bg-red-500 text-center bg-red-400 rounded-md text-white"
                    >
                        Logout
                    </div>
                </div>
            </div>

            <div className="p-10">
                <Outlet />
            </div>
        </div>
    );
}

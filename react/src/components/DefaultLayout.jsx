import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { currentUser, userToken } = useStateContext();

    if (!userToken) {
        return <Navigate to="login" />;
    }

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
                        {userToken}
                    </p>
                    <FaUserCircle size={34} className="text-gray-300" />
                </div>
            </div>

            <div className="p-10">
                <Outlet />
            </div>
        </div>
    );
}

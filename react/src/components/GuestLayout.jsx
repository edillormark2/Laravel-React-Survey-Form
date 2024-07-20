import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-gray-50 min-h-screen px-4">
            <Outlet />

        </div>
    );
}

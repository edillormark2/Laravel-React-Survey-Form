import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { VscSignOut } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

const UserProfilePopup = ({onLogout}) => {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();


    useEffect(() => {
        axiosClient.get("/me").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);



    return (
        <div className="bg-white p-4 rounded-xl drop-shadow-xl border mt-3 border-gray-300 w-72 relative md:mt-0">
            <div className="flex items-center justify-center mb-4">
                <div className="relative">
                    <FaUserCircle
                        size={85}
                        className="text-gray-300 self-center"
                    />
                    {/* Green dot for active status */}
                    <div className="absolute bottom-2 right-3 transform translate-x-1/2 -translate-y-1/2">
                        <div className="h-3 w-3 bg-green-500 rounded-full" />
                    </div>
                </div>
            </div>
            <div className="text-center mb-4">
                <p className="text-base font-semibold">{currentUser.name}</p>
                <p className=" text-sm text-gray-500">{currentUser.email}</p>
            </div>

            <Divider />

            <div
                onClick={onLogout}
                className="flex items-center w-full p-2 bg-white hover:bg-gray-100 rounded-full mb-1 cursor-pointer mt-2"
            >
                <div className="p-2 bg-gray-300 rounded-full w-10 flex justify-center items-center">
                    <VscSignOut size={22} /> {/* Adjusted size of the icon */}
                </div>
                <span className="ml-2">Log out</span>
            </div>
        </div>
    );
};

export default UserProfilePopup;

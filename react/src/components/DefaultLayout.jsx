import React, { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import Toast from "./Toast";
import UserProfilePopup from "./UserProfilePopup";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();
    const [isUserProfilePopupOpen, setIsUserProfilePopupOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [placement, setPlacement] = useState("bottom-end");

    useEffect(() => {
        if (!userToken) {
            return;
        }

        axiosClient.get("/me").then(({ data }) => {
            setCurrentUser(data);
        });
    }, [userToken, setCurrentUser]);

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    const toggleUserProfilePopup = (event) => {
        setIsUserProfilePopupOpen((prev) => !prev);
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setIsUserProfilePopupOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                anchor &&
                !anchor.contains(event.target) &&
                !event.target.closest(".action-popup")
            ) {
                setIsUserProfilePopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [anchor]);

    if (!userToken) {
        return <Navigate to="login" />;
    }

    return (
        <div className="min-h-screen flex flex-col ">
            <div className="flex justify-between items-center py-4 bg-white px-8 border-b-1 border-gray-200">
                <div className="flex gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `p-2 rounded-md cursor-pointer ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-gray-100"
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
                                    : "hover:bg-gray-100"
                            }`
                        }
                    >
                        Surveys
                    </NavLink>
                </div>
                <div className="flex gap-4">
                    <p className="text-center self-center font-semibold text-slate-500 hidden md:block ">
                        {currentUser.name}
                    </p>
                    <FaUserCircle
                        size={48}
                        className="text-gray-300 self-center cursor-pointer hover:bg-gray-100 p-2 rounded-full"
                        onClick={(event) => toggleUserProfilePopup(event)}
                    />
                </div>
            </div>

            <div className="flex-grow p-4 md:p-10 bg-gray-100">
                <Outlet />
            </div>

            <Toast />

            {isUserProfilePopupOpen && (
                <BasePopup
                    id="simple-popper"
                    open={isUserProfilePopupOpen}
                    anchor={anchor}
                    placement={placement}
                    offset={4}
                    onClose={handleClose}
                >
                    <div className="action-popup">
                        <UserProfilePopup onLogout={onLogout} />
                    </div>
                </BasePopup>
            )}
        </div>
    );
}

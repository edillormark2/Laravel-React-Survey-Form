import React from "react";
import "./App.css";
import GuestLayout from "./components/GuestLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Surveys from "./pages/Surveys";
import SurveyView from "./pages/SurveyView";
import SurveyPublicView from "./pages/SurveyPublicView";
import SurveyResponse from "./pages/SurveyResponse";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Navigate to="/" />,
            },
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/surveys",
                element: <Surveys />,
            },
            {
                path: "/surveys/create",
                element: <SurveyView />,
            },
            {
                path: "/surveys/:id",
                element: <SurveyView />,
            },
            {
                path: "/surveys/:id/responses",
                element: <SurveyResponse />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/survey/public/:slug",
        element: <SurveyPublicView />,
    },
]);

export default router;

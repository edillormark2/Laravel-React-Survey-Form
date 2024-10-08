import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import axiosClient from "../axios.js";
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Footer from "../components/Footer.jsx";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/dashboard`)
            .then((res) => {
                setLoading(false);
                setData(res.data);
                return res;
            })
            .catch((error) => {
                setLoading(false);
                return error;
            });
    }, []);

    const navigate = useNavigate();

    const handleViewResponses = (surveyId) => {
        navigate(`/surveys/${surveyId}/responses`);
    };

    const handleViewDetail = (surveyId, responseId) => {
        navigate(`/surveys/${surveyId}/responses/${responseId}`);
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM, dd yyyy | hh:mm a");
    };

    const isSurveyExpired = (expireDate) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const expiration = new Date(expireDate).setHours(0, 0, 0, 0);
        return expiration <= today;
    };

    return (
        <div>
            {loading && <Loader />}
            {!loading && (
                <div>
                    <div className="flex flex-col lg:flex-row w-full xl:w-3/4 mx-auto gap-5 text-gray-700">
                        <div className="flex flex-col w-full lg:w-3/4">
                            {/* Card section */}
                            <div className="flex gap-4">
                                <DashboardCard
                                    className="order-1 lg:order-2 w-full rounded-lg p-8"
                                    style={{ animationDelay: "0.1s" }}
                                >
                                    <div className="text-4xl md:text-5xl pb-2 font-semibold">
                                        {data.totalSurveys}
                                    </div>
                                    <p className="text-blue-400">
                                        Total Surveys
                                    </p>
                                </DashboardCard>
                                <DashboardCard
                                    className="order-2 lg:order-4 w-full rounded-lg p-8"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <div className="text-4xl md:text-5xl pb-2 font-semibold">
                                        {data.totalAnswers}
                                    </div>
                                    <p className="text-blue-400">
                                        Total Responses
                                    </p>
                                </DashboardCard>
                            </div>

                            {/* Latest survey section */}
                            <div className="mt-4">
                                <DashboardCard
                                    className="order-3 lg:order-1 row-span-2 p-6"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <p className="font-semibold mb-4">
                                        Latest Survey
                                    </p>
                                    {data.latestSurvey && (
                                        <div>
                                            <img
                                                src={
                                                    data.latestSurvey.image_url
                                                }
                                                className="w-full h-72 mx-auto object-cover rounded-lg"
                                            />
                                            <h3 className="font-bold text-xl mb-3 mt-4">
                                                {data.latestSurvey.title}
                                            </h3>
                                            <div className="flex justify-between text-xs md:text-sm mb-1 mt-2">
                                                <div>Created Date:</div>
                                                <div>
                                                    {formatDate(
                                                        data.latestSurvey
                                                            .created_at
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <div>Expire Date:</div>
                                                <div>
                                                    {formatDate(
                                                        data.latestSurvey
                                                            .expire_date
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <div>Status:</div>
                                                <div>
                                                    {isSurveyExpired(
                                                        data.latestSurvey
                                                            .expire_date
                                                    )
                                                        ? "Expired"
                                                        : data.latestSurvey
                                                              .status
                                                        ? "Active"
                                                        : "Closed"}
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-xs md:text-sm mb-1">
                                                <div>Questions:</div>
                                                <div>
                                                    {
                                                        data.latestSurvey
                                                            .questions
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-xs md:text-sm mb-3">
                                                <div>Responses:</div>
                                                <div>
                                                    {data.latestSurvey.answers}
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="flex justify-between mt-4">
                                                <Link
                                                    to={`/surveys/${data.latestSurvey.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="flex text-xs md:text-sm py-2 px-4 hover:bg-blue-50 text-blue-500 rounded-lg">
                                                        <PencilIcon className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                                                        Edit Survey
                                                    </button>
                                                </Link>

                                                <button
                                                    className="flex text-xs md:text-sm py-2 px-4 hover:bg-blue-50 text-blue-500 rounded-lg"
                                                    onClick={() =>
                                                        handleViewResponses(
                                                            data.latestSurvey.id
                                                        )
                                                    }
                                                >
                                                    <EyeIcon className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                                                    View Responses
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {!data.latestSurvey && (
                                        <div className="text-gray-600 text-center py-16">
                                          No surveys available
                                        </div>
                                    )}
                                </DashboardCard>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3">
                            <DashboardCard
                                className="order-4 lg:order-3 row-span-2 p-6"
                                style={{ animationDelay: "0.3s" }}
                            >
                                <p className="font-semibold mb-4">
                                    Latest Responses
                                </p>
                                {data.latestAnswers &&
                                data.latestAnswers.length > 0 ? (
                                    <div className="text-left  h-96 overflow-y-auto">
                                        {data.latestAnswers.map((answer) => (
                                            <div
                                                key={answer.id}
                                                className="border-b-1 border-gray-200 py-2 cursor-pointer"
                                                onClick={() =>
                                                    handleViewDetail(
                                                        answer.survey_id,
                                                        answer.id
                                                    )
                                                }
                                            >
                                                <div className="px-4 py-2 hover:bg-gray-50 rounded-lg flex justify-between ">
                                                    <div className="font-semibold text-blue-400 text-sm md:text-base">
                                                        {answer.survey.title}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs md:text-sm bg-gray-50 py-1 px-2 rounded-lg">
                                                            {formatDate(
                                                                answer.end_date
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-600 text-center py-16">
                                        You don't have responses yet
                                    </div>
                                )}
                            </DashboardCard>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

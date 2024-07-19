import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios.js";
import RespondentAnswerView from "../components/RespondentAnswerView.jsx";
import Loader from "../components/Loader.jsx";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { FaArrowLeft } from "react-icons/fa6";

export default function Respondent() {
    const { surveyId, responseId } = useParams();
    const [responseDetails, setResponseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResponseDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(
                    `/survey/${surveyId}/responses/${responseId}/details`
                );
                setResponseDetails(response.data);
            } catch (error) {
                setError(
                    error.response ? error.response.data.message : error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchResponseDetails();
    }, [surveyId, responseId]);

    if (loading)
        return (
            <div>
                <Loader />
            </div>
        );
    if (error) return <div>Error: {error}</div>;
    if (!responseDetails || !responseDetails.questions)
        return <div>No data available</div>;

    // Ensure answers are included in responseDetails
    const answers = responseDetails.questions.map((question) => ({
        survey_question_id: question.id,
        answer: question.answer || "", // Ensure answer defaults to an empty string if not present
    }));

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <div className="min-h-screen w-full relative">
            <div className="py-8 w-11/12 md:w-3/4 xl:w-1/2 mx-auto">
                <div
                    className="flex justify-between mb-4 bg-white rounded-lg px-4 w-full animate-fade-in-down"
                    style={{ animationDelay: "0.1s" }}
                >
                    <div className="py-2">
                        <Tooltip
                            title="Go Back"
                            placement="bottom"
                            TransitionComponent={Fade}
                        >
                            <div
                                className="rounded-full p-4 cursor-pointer hover:bg-gray-100"
                                onClick={handleGoBack}
                            >
                                <FaArrowLeft className="text-gray-700" />
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div
                    className="bg-white p-4 flex flex-col md:flex-row rounded-lg border border-gray-200 mb-4 animate-fade-in-down"
                    style={{ animationDelay: "0.2s" }}
                >
                    <div className="mr-4 w-full md:w-1/2">
                        <img
                            src={responseDetails.image_url}
                            className="w-full h-80 object-cover rounded-md"
                            alt={responseDetails.title}
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-4xl my-3 font-semibold">
                            {responseDetails.title}
                        </h1>
                        <p className="text-gray-500 text-sm mb-1">
                            Status:{" "}
                            {responseDetails.status ? "Active" : "Closed"}
                        </p>
                        <p className="text-gray-500 text-sm mb-3 max-h-48 overflow-y-auto">
                            {responseDetails.description}
                        </p>
                    </div>
                </div>

                <div
                    className="w-full animate-fade-in-down"
                    style={{ animationDelay: "0.3s" }}
                >
                    {responseDetails.questions.map((q, index) => (
                        <RespondentAnswerView
                            key={q.id}
                            question={q}
                            answer={
                                answers.find(
                                    (a) => a.survey_question_id === q.id
                                )?.answer || ""
                            }
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

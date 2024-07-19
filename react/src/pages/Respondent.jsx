import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios.js";
import RespondentAnswerView from "../components/RespondentAnswerView.jsx";
import Loader from "../components/Loader.jsx";

export default function Respondent() {
    const { surveyId, responseId } = useParams();
    const [responseDetails, setResponseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponseDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(
                    `/survey/${surveyId}/responses/${responseId}/details`
                );
                console.log("API Response:", response.data); // Log the response
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

    return (
        <div className="min-h-screen w-full relative">
            <div className="py-8 w-11/12 md:w-3/4 xl:w-1/2 mx-auto">
                <div>
                    <div className="bg-white p-4 flex flex-col md:flex-row rounded-lg border border-gray-200 mb-4">
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

                    <div className="w-full">
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
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios.js";
import Loader from "../components/Loader";
import { Divider } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";
import { gridClasses } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { FaArrowLeft } from "react-icons/fa6";
import { format } from "date-fns";
import { MdOutlineInfo } from "react-icons/md";

export default function SurveyResponse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState({ title: "", status: true });
    const [responses, setResponses] = useState([]);
    const [responseCount, setResponseCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setLoading(true);
                const [surveyResponse, responsesResponse, countResponse] =
                    await Promise.all([
                        axiosClient.get(`/survey/${id}`),
                        axiosClient.get(`/survey/${id}/responses`),
                        axiosClient.get(`/survey/${id}/responses/count`),
                    ]);
                setSurvey(surveyResponse.data.data);
                setResponses(responsesResponse.data);
                setResponseCount(countResponse.data.count);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSurveyData();
        }
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;
    if (!Array.isArray(responses) || responses.length === 0)
        return <div>No responses found for this survey</div>;

    function handleViewDetail(surveyId, responseId) {
        navigate(`/surveys/${surveyId}/responses/${responseId}`);
    }

    const columns = [
        {
            field: "answer",
            headerName: "Name",
            width: 300,
            flex: 1,
            minWidth: 150,
        },
        {
            field: "date",
            headerName: "Date",
            width: 300,
            flex: 1,
            minWidth: 150,
        },
        {
            field: "time",
            headerName: "Time",
            width: 300,
            flex: 1,
            minWidth: 150,
        },
        {
            field: "action",
            headerAlign: "center",
            headerName: "Action",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <div className="flex justify-center gap-2">
                    <Tooltip
                        arrow
                        title="View Details"
                        placement="right"
                        TransitionComponent={Fade}
                    >
                        <div
                            onClick={() => handleViewDetail(id, params.row.id)}
                            className="p-2 my-2 rounded-lg text-black cursor-pointer border"
                        >
                            <MdOutlineInfo
                                size={18}
                                className="text-gray-600"
                            />
                        </div>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rows = responses
        .flatMap((response, index) =>
            response.answers.map((answer) => {
                const createdAt = new Date(answer.created_at);
                return {
                    id: answer.survey_answer_id,
                    question: answer.survey_question_id,
                    answer: answer.is_special ? answer.answer : "",
                    date: format(createdAt, "MMMM d, yyyy"),
                    time: format(createdAt, "h:mm a"),
                    is_special: answer.is_special,
                };
            })
        )
        .filter((row) => row.is_special);

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <div className="w-full lg:w-9/12 xl:w-8/12 mx-auto">
            <div className="w-full mb-4 text-2xl font-semibold">
                {survey.title} survey responses
            </div>
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
            <div className="w-full flex gap-4 flex-col">
                <div
                    className="bg-white rounded-lg w-full flex bg-gradient-to-r from-blue-400 to-blue-800 animate-fade-in-down"
                    style={{ animationDelay: "0.2s" }}
                >
                    <div className="w-full ml-8 text-white mt-14">
                        <div className="flex gap-2">
                            <p className="text-5xl font-semibold">
                                {responseCount}
                            </p>
                        </div>
                        <p className="text-base">
                            Total responses in this survey
                        </p>
                    </div>
                    <Divider />
                    {survey.image_url && (
                        <img
                            src={survey.image_url}
                            alt={survey.title}
                            className="w-1/2 h-40 object-cover mt-4 mr-4 rounded-t-md"
                        />
                    )}
                </div>

                <div
                    className="bg-white rounded-lg p-4 w-full h-full animate-fade-in-down"
                    style={{ animationDelay: "0.3s" }}
                >
                    <DataGrid
                        sx={{
                            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                { outline: "none" },
                            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                { outline: "none" },
                        }}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10, 20, 50, 100]}
                        getRowId={(row) => row.id}
                    />
                </div>
            </div>
        </div>
    );
}

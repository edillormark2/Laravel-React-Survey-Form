import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios.js";
import Loader from "../components/Loader";

export default function SurveyResponse() {
    const { id } = useParams();
    const [survey, setSurvey] = useState({
        title: "",
        status: true,
    });
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setLoading(true);
                const surveyResponse = await axiosClient.get(`/survey/${id}`);
                setSurvey(surveyResponse.data.data);

                const responsesResponse = await axiosClient.get(
                    `/survey/${id}/responses`
                );
                setResponses(responsesResponse.data);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (id) {
            fetchSurveyData();
        }
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!survey.title) {
        return <div>No survey data found</div>;
    }

    // Check if responses is not an array or is empty
    if (!Array.isArray(responses) || responses.length === 0) {
        return <div>No responses found for this survey</div>;
    }

    return (
        <div>
            <h1>{survey.title}</h1>
            <div>Status: {survey.status ? "Active" : "Draft"}</div>
            <div>Responses:</div>

            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {responses.map((response) =>
                        response.answers.map((answer) => (
                            <tr key={answer.id}>
                                <td>{answer.survey_question_id}</td>
                                <td>{answer.answer}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

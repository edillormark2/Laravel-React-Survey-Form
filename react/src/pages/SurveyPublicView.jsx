import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";
import Loader from "../components/Loader";

export default function SurveyPublicView() {
    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({
        questions: [],
    });
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setSurvey(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [slug]);

    function answerChanged(question, value) {
        answers[question.id] = value;
    }

    function onSubmit(ev) {
        ev.preventDefault();

        axiosClient
            .post(`/survey/${survey.id}/answer`, {
                answers,
            })
            .then((response) => {
                setSurveyFinished(true);
            });
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-gray-50 min-h-screen w-full relative">
            <div className="py-8 w-11/12 md:w-3/4 xl:w-1/2 mx-auto">
                <form onSubmit={(ev) => onSubmit(ev)}>
                    <div>
                        <div className="bg-white p-4 flex flex-col md:flex-row rounded-lg border border-gray-200 mb-4">
                            <div className="mr-4 w-full md:w-1/2">
                                <img
                                    src={survey.image_url}
                                    className="w-full h-80 object-cover rounded-md"
                                    alt={survey.title}
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl my-3 font-semibold">
                                    {survey.title}
                                </h1>
                                <p className="text-gray-500 text-sm mb-1">
                                    Status:{" "}
                                    {survey.status ? "Active" : "Closed"}
                                </p>
                                <p className="text-gray-500 text-sm mb-1">
                                    Expire Date: {survey.expire_date}
                                </p>
                                <p className="text-gray-500 text-sm mb-3">
                                    {survey.description}
                                </p>
                            </div>
                        </div>

                        {surveyFinished && (
                            <div className="py-8 px-6 bg-green-50 text-green-500 border border-green-300 w-full rounded-lg mx-auto ">
                                Thank you for participating in the survey!
                            </div>
                        )}
                        {!surveyFinished && (
                            <>
                                <div>
                                    {(survey.questions || []).map(
                                        (question, index) => (
                                            <PublicQuestionView
                                                key={question.id}
                                                question={question}
                                                index={index}
                                                answerChanged={(val) =>
                                                    answerChanged(question, val)
                                                }
                                            />
                                        )
                                    )}
                                </div>
                                <button
                                    className="bg-blue-500 text-white font-semibold rounded-md py-2 px-3 hover:opacity-70"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

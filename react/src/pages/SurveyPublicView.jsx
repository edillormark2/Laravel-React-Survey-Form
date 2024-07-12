import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {
    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({
        questions: [],
    });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
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

    return (
        <div>
            {loading && <div className="flex justify-center">Loading...</div>}
            {!loading && (
                <form
                    onSubmit={(ev) => onSubmit(ev)}
                    className="flex justify-center w-full mt-10 my-20 m-4"
                >
                    <div>
                        <div className="grid grid-cols-6">
                            <div className="mr-4">
                                <img src={survey.image_url} alt="" />
                            </div>
                            <div className="col-span-5">
                                <h1 className="text-3xl mb-3">
                                    {survey.title}
                                </h1>
                                <p className="text-gray-500 text-sm mb-3">
                                    Expire Date:{survey.expire_date}
                                </p>
                                <p className="text-gray-500 text-sm mb-3">
                                    {survey.description}
                                </p>
                            </div>
                        </div>

                        {surveyFinished && (
                            <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
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
                                <button type="submit"> Submit</button>
                            </>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
}

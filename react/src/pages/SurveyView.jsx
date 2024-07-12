import React, { useEffect, useState } from "react";
import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import axiosClient from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestions from "../components/SurveyQuestions.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function SurveyView() {
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const { id } = useParams();

    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...survey };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        let res = null;
        if (id) {
            res = axiosClient.put(`/survey/${id}`, payload);
        } else {
            res = axiosClient.post("/survey", payload);
        }
        res.then((res) => {
            console.log(res);
            navigate("/surveys");
            if (id) {
                showToast("The survey was updated");
            } else {
                showToast("The survey was created");
            }
        }).catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message);
            }
            console.log(err, err.response);
        });
    };

    const onDelete = () => {};

    function onQuestionsUpdate(questions) {
        setSurvey({ ...survey, questions });
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/survey/${id}`).then(({ data }) => {
                setSurvey(data.data);
                setLoading(false);
            });
        }
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <div className="py-4 font-semibold text-2xl">
                    {!id ? "Create new Survey" : "Update Survey"}
                </div>
                <div className="flex items-center gap-2">
                    <TButton
                        color="green"
                        href={`/survey/public/${survey.slug}`}
                    >
                        <LinkIcon className="h-5 w-4 mr-2" />
                        Public Link
                    </TButton>
                    <TButton color="red" onClick={onDelete}>
                        <TrashIcon className="h-5 w-4 mr-2" />
                        Delete
                    </TButton>
                </div>
            </div>

            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && (
                <form action="#" method="POST" onSubmit={onSubmit}>
                    <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            {error && (
                                <div className="bg-red-100 text-red-500 p-3 rounded-md">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-1 flex items-center">
                                    {survey.image_url && (
                                        <img
                                            src={survey.image_url}
                                            alt=""
                                            className="w-32 h-32 object-cover"
                                        />
                                    )}
                                    {!survey.image_url && (
                                        <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            <PhotoIcon className="w-8 h-8" />
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        className="relative  ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer "
                                    >
                                        <input
                                            type="file"
                                            className="cursor-pointer absolute left-0 top-0 right-0 bottom-0 opacity-0 "
                                            onChange={onImageChoose}
                                        />
                                        Change
                                    </button>
                                </div>
                            </div>

                            {/*Title*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Survey Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={survey.title}
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            title: ev.target.value,
                                        })
                                    }
                                    placeholder="Survey Title"
                                    className="form-control w-full p-2 text-sm border border-gray-200 rounded-md mt-2"
                                />
                            </div>

                            {/*Description*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                                <textarea
                                    name="description"
                                    id="description"
                                    value={survey.description || ""}
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            description: ev.target.value,
                                        })
                                    }
                                    placeholder="Describe your survey"
                                    className="form-control w-full p-2 text-sm border border-gray-200 rounded-md mt-2"
                                ></textarea>
                            </div>

                            {/*Expire Date*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="expire_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Expire Date
                                </label>
                                <input
                                    type="date"
                                    name="expire_date"
                                    id="expire_date"
                                    value={survey.expire_date}
                                    onChange={(ev) =>
                                        setSurvey({
                                            ...survey,
                                            expire_date: ev.target.value,
                                        })
                                    }
                                    className="form-control w-full p-2 text-sm border border-gray-200 rounded-md mt-2"
                                />
                            </div>

                            {/*Active*/}
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        checked={survey.status}
                                        onChange={(ev) =>
                                            setSurvey({
                                                ...survey,
                                                status: ev.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="comments"
                                        className="font-medium text-gray-700"
                                    >
                                        Active
                                    </label>
                                    <p className="text-gray-500">
                                        Whether to make survey publicly
                                        available
                                    </p>
                                </div>
                            </div>

                            <SurveyQuestions
                                questions={survey.questions}
                                onQuestionsUpdate={onQuestionsUpdate}
                            />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <TButton>Save</TButton>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

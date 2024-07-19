import React, { useEffect, useState } from "react";
import {
    ArrowTopRightOnSquareIcon,
    EyeIcon,
    LinkIcon,
    PhotoIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import axiosClient from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestions from "../components/SurveyQuestions.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Loader from "../components/Loader.jsx";
import ShareSurveyPopup from "../components/ShareSurveyPopup.jsx";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { FaArrowLeft } from "react-icons/fa6";

export default function SurveyView() {
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [openSharePopup, setOpenSharePopup] = useState(false);
    const [shareLink, setShareLink] = useState("");

    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: true,
        description: "",
        image: null,
        image_url: null,
        expire_date: new Date().toLocaleDateString("en-CA"),
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

    const onDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this survey?")) {
            axiosClient.delete(`/survey/${id}`).then(() => {
                setSurvey();
                navigate("/surveys");
                showToast("The survey was deleted");
            });
        }
    };

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
    }, [id]);

    const isSurveyExpired = (expireDate) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const expiration = new Date(expireDate).setHours(0, 0, 0, 0);
        return expiration <= today;
    };

    const handleOpenShare = () => {
        setShareLink(`${window.location.origin}/survey/public/${survey.slug}`);
        setOpenSharePopup(true);
    };

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <div className="w-full min-h-screen ">
            {loading && <Loader />}
            {!loading && (
                <div>
                    <div className="w-full lg:w-9/12 xl:w-8/12 mx-auto mb-4 text-2xl font-semibold ">
                        {!id ? "Create new Survey" : "Edit Survey"}
                    </div>
                    <div
                        className="flex justify-between mb-4 bg-white rounded-lg px-4 w-full lg:9/12 xl:w-8/12 mx-auto animate-fade-in-down "
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
                        {id && (
                            <div className="flex items-center gap-2">
                                <Tooltip
                                    title="Share"
                                    placement="bottom"
                                    TransitionComponent={Fade}
                                >
                                    <button
                                        onClick={handleOpenShare}
                                        className="flex items-center rounded-full p-4 cursor-pointer hover:bg-gray-100"
                                    >
                                        <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-800" />
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    title="Preview"
                                    placement="bottom"
                                    TransitionComponent={Fade}
                                >
                                    <a
                                        href={`/survey/public/${survey.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <button className="flex items-center rounded-full p-4 cursor-pointer hover:bg-gray-100">
                                            <EyeIcon className="w-5 h-5 text-gray-800" />
                                        </button>
                                    </a>
                                </Tooltip>
                                <Tooltip
                                    title="Delete"
                                    placement="bottom"
                                    TransitionComponent={Fade}
                                >
                                    <button
                                        onClick={(ev) =>
                                            onDeleteClick(survey.id)
                                        }
                                        className="rounded-full p-4 cursor-pointer hover:bg-gray-100"
                                    >
                                        <TrashIcon className="w-5 h-5 text-gray-800 " />
                                    </button>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                    <div className="w-full lg:9/12 xl:w-8/12 mx-auto ">
                        {error && (
                            <div className="bg-red-100 text-red-500 p-3 rounded-md my-4">
                                {error}
                            </div>
                        )}
                        <form action="#" method="POST" onSubmit={onSubmit}>
                            <div>
                                <div
                                    className="space-y-6 bg-white p-4 rounded-lg border border-gray-200 w-full flex flex-col lg:flex-row animate-fade-in-down "
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    <div className="w-full lg:w-1/2">
                                        <div className="mt-1 flex items-center">
                                            {survey.image_url && (
                                                <img
                                                    src={survey.image_url}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            {!survey.image_url && (
                                                <span className="flex justify-center items-center text-gray-400 w-full h-64 overflow-hidden  bg-gray-100">
                                                    <PhotoIcon className="w-8 h-8" />
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="w-full bg-blue-500 text-white mt-4 relative rounded-md border border-gray-300  py-2 px-3 text-sm font-medium leading-4 shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                        >
                                            <input
                                                type="file"
                                                className="cursor-pointer absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                                onChange={onImageChoose}
                                            />
                                            Choose an Image
                                        </button>
                                    </div>

                                    <div className="w-full px-2 lg:px-10">
                                        {/*Title*/}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="title"
                                                className=" text-base font-semibold"
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
                                        <div className="mb-4">
                                            <label
                                                htmlFor="description"
                                                className=" text-base font-semibold"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                value={survey.description || ""}
                                                onChange={(ev) =>
                                                    setSurvey({
                                                        ...survey,
                                                        description:
                                                            ev.target.value,
                                                    })
                                                }
                                                placeholder="Describe your survey"
                                                className="form-control w-full h-28 p-2 text-sm border border-gray-200 rounded-md mt-2"
                                            ></textarea>
                                        </div>

                                        {/*Expire Date*/}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="expire_date"
                                                className=" text-base font-semibold"
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
                                                        expire_date:
                                                            ev.target.value,
                                                    })
                                                }
                                                className="form-control w-full p-2 text-sm border border-gray-200 rounded-md mt-2"
                                            />
                                            {isSurveyExpired(
                                                survey.expire_date
                                            ) && (
                                                <p className="text-red-500 text-sm mt-2">
                                                    This survey has already
                                                    expired and is now closed to
                                                    public access.
                                                </p>
                                            )}
                                        </div>
                                        {/* Active */}
                                        <div className="w-full">
                                            <label
                                                htmlFor="status"
                                                className="text-base font-semibold"
                                            >
                                                Status
                                            </label>
                                            <div className="flex self-center items-center mt-2">
                                                <input
                                                    id="status"
                                                    name="status"
                                                    type="checkbox"
                                                    checked={
                                                        survey.status &&
                                                        !isSurveyExpired(
                                                            survey.expire_date
                                                        )
                                                    } // Ensure checkbox is checked only if status is true and survey is not expired
                                                    onChange={(ev) => {
                                                        const isChecked =
                                                            ev.target.checked;
                                                        const isExpired =
                                                            isSurveyExpired(
                                                                survey.expire_date
                                                            );

                                                        setSurvey({
                                                            ...survey,
                                                            status:
                                                                isChecked &&
                                                                !isExpired,
                                                        });

                                                        // Automatically set status to false if survey is expired
                                                        if (
                                                            isChecked &&
                                                            isExpired
                                                        ) {
                                                            setSurvey(
                                                                (
                                                                    prevSurvey
                                                                ) => ({
                                                                    ...prevSurvey,
                                                                    status: false,
                                                                })
                                                            );
                                                        }
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                                                />
                                                <div className="ml-2 text-sm w-full">
                                                    <p
                                                        className={
                                                            survey.status &&
                                                            !isSurveyExpired(
                                                                survey.expire_date
                                                            )
                                                                ? "text-gray-500 p-2"
                                                                : "bg-red-50 text-red-500 p-2 rounded"
                                                        }
                                                    >
                                                        {survey.status &&
                                                        !isSurveyExpired(
                                                            survey.expire_date
                                                        )
                                                            ? "Accepting responses"
                                                            : "Not accepting responses"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*Questions */}
                                <div
                                    className="animate-fade-in-down "
                                    style={{ animationDelay: "0.3s" }}
                                >
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
                        <ShareSurveyPopup
                            openSharePopup={openSharePopup}
                            setOpenSharePopup={setOpenSharePopup}
                            shareLink={shareLink}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

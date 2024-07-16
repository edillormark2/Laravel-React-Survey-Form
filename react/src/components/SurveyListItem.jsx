import React, { useState } from "react";
import {
    ArrowTopRightOnSquareIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import TButton from "./core/TButton";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import ShareSurveyPopup from "./ShareSurveyPopup";

export default function SurveyListItem({ survey, onDeleteClick }) {
    const [openSharePopup, setOpenSharePopup] = useState(false);
    const [shareLink, setShareLink] = useState("");

    const isSurveyExpired = (expireDate) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const expiration = new Date(expireDate).setHours(0, 0, 0, 0);
        return expiration < today;
    };

    const handleOpenShare = () => {
        setShareLink(`${window.location.origin}/survey/public/${survey.slug}`);
        setOpenSharePopup(true);
    };

    return (
        <div className="relative flex flex-col p-4 bg-white border border-gray-200 h-[485px] rounded-lg hover:border-blue-500">
            <img
                src={survey.image_url}
                alt={survey.title}
                className=" w-full h-64 object-cover rounded-md"
            />
            <div
                className={`absolute top-6 right-6 text-xs py-1 px-2 rounded-full 
        ${
            isSurveyExpired(survey.expire_date)
                ? "bg-yellow-50 text-yellow-500 border border-yellow-300"
                : survey.status
                ? "bg-green-400 bg-opacity-15 text-green-500 border border-green-300"
                : "bg-red-400 bg-opacity-15 text-red-500 border border-red-300"
        }`}
            >
                {isSurveyExpired(survey.expire_date)
                    ? "Expired"
                    : survey.status
                    ? "Active"
                    : "Closed"}
            </div>

            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            <div className="overflow-hidden flex-1 truncate-ellipsis relative">
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none h-full max-h-32 overflow-hidden text-gray-500">
                    <div
                        className="h-full max-h-32 overflow-hidden"
                        style={{
                            WebkitLineClamp: 4,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {survey.description}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-3">
                <TButton to={`/surveys/${survey.id}`}>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit
                </TButton>
                <div className="flex items-center gap-2">
                    <Tooltip
                        arrow
                        title="Share"
                        placement="bottom"
                        TransitionComponent={Fade}
                    >
                        <button
                            onClick={handleOpenShare}
                            className="flex items-center hover:bg-blue-100 rounded-full p-2 hover:text-blue-500"
                        >
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </button>
                    </Tooltip>
                    <Tooltip
                        arrow
                        title="Preview"
                        placement="bottom"
                        TransitionComponent={Fade}
                    >
                        <a
                            href={`/survey/public/${survey.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="flex items-center hover:bg-green-100 rounded-full p-2 hover:text-green-500">
                                <EyeIcon className="w-5 h-5" />
                            </button>
                        </a>
                    </Tooltip>

                    {survey.id && (
                        <Tooltip
                            arrow
                            title="Delete"
                            placement="bottom"
                            TransitionComponent={Fade}
                        >
                            <button
                                onClick={(ev) => onDeleteClick(survey.id)}
                                className="hover:bg-red-100 rounded-full p-2 hover:text-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    )}
                </div>
            </div>
            <ShareSurveyPopup
                openSharePopup={openSharePopup}
                setOpenSharePopup={setOpenSharePopup}
                shareLink={shareLink}
            />
        </div>
    );
}
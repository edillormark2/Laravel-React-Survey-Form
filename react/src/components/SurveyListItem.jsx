import {
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import TButton from "./core/TButton";

export default function SurveyListItem({ survey, onDeleteClick }) {
    return (
        <div className="flex flex-col p-4 bg-white border border-gray-200  h-[490px] rounded-lg ">
            <img
                src={survey.image_url}
                alt={survey.title}
                className="w-full h-64 object-cover rounded-md"
            />
            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            <div
                dangerouslySetInnerHTML={{ __html: survey.description }}
                className="overflow-hidden flex-1"
            ></div>

            <div className="flex justify-between items-center mt-3">
                <TButton to={`/surveys/${survey.id}`}>
                    <PencilIcon className="w-5 h-5 mr-2 " />
                    Edit
                </TButton>
                <div className="flex items-center">
                    <TButton href={`/survey/public/${survey.slug}`} circle link>
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    </TButton>

                    {survey.id && (
                        <TButton
                            onClick={(ev) => onDeleteClick(survey.id)}
                            circle
                            link
                            color="red"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </TButton>
                    )}
                </div>
            </div>
        </div>
    );
}

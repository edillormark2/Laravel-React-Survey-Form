import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import {
    TrashIcon,
    ChevronDownIcon,
    PlusCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) {
    const [model, setModel] = useState({ ...question });
    const { questionTypes } = useStateContext(); // Ensure this matches PHP enum values

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ["dropdown", "multiple choice", "checkboxes"].includes(type);
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value,
        };
        if (
            !shouldHaveOptions(model.type) &&
            shouldHaveOptions(ev.target.value)
        ) {
            if (!model.data.options) {
                newModel.data = {
                    options: [{ uuid: uuidv4(), text: "" }],
                };
            }
        }
        setModel(newModel);
    }

    function addOption() {
        model.data.options.push({
            uuid: uuidv4(),
            text: "",
        });
        setModel({ ...model });
    }

    function deleteOption(op) {
        model.data.options = model.data.options.filter(
            (option) => option.uuid !== op.uuid
        );
        setModel({ ...model });
    }

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 my-4">
                <div className="flex gap-3 justify-between mb-3 mt-2">
                    {/* Question Text */}
                    <div className="flex w-full">
                        <p className="self-center mr-2">{index + 1}. </p>
                        <input
                            type="text"
                            name="question"
                            id="question"
                            placeholder="Question"
                            value={model.question}
                            onChange={(ev) =>
                                setModel({
                                    ...model,
                                    question: ev.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md  px-3 form-control sm:text-sm"
                        />
                    </div>

                    {/* Question Type */}
                    <div className="relative  min-w-[10rem]">
                        <select
                            id="questionType"
                            name="questionType"
                            value={model.type}
                            onChange={onTypeChange}
                            className="mt-1 block w-full rounded-md py-2 px-3 form-control sm:text-sm pr-10 cursor-pointer"
                        >
                            {questionTypes.map((type) => (
                                <option value={type} key={type}>
                                    {upperCaseFirst(type)}
                                </option>
                            ))}
                        </select>
                        <div className="absolute top-4 right-0 flex items-center pr-3 pointer-events-none self-center ">
                            <ChevronDownIcon className="h-4 w-4 " />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    {shouldHaveOptions() && (
                        <div>
                            {model.data.options.length === 0 && (
                                <div className="text-xs text-gray-600 text-center py-3">
                                    You don't have any options defined
                                </div>
                            )}
                            {model.data.options.length > 0 && (
                                <div>
                                    {model.data.options.map((op, ind) => (
                                        <div className="flex items-center mb-1">
                                            <span className="w-6 text-sm">
                                                {ind + 1}.
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Option"
                                                value={op.text}
                                                onInput={(ev) => {
                                                    op.text = ev.target.value;
                                                    setModel({ ...model });
                                                }}
                                                className="w-full rounded-sm p-2 text-xs border border-gray-300 form-control"
                                            />
                                            <button
                                                onClick={(ev) =>
                                                    deleteOption(op)
                                                }
                                                type="button"
                                                className="h-8 w-8 rounded-full flex items-center text-gray-700 justify-center  hover:bg-red-50 hover:text-red-500 p-2  mx-1"
                                            >
                                                <Tooltip
                                                    arrow
                                                    title="Remove"
                                                    placement="right"
                                                    TransitionComponent={Fade}
                                                >
                                                    <XMarkIcon className="w-5 h-5 " />
                                                </Tooltip>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <h4 className="text-sm font-semibold my-3 flex items-center ml-6">
                                <button
                                    onClick={addOption}
                                    type="button"
                                    className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                                >
                                    Add option
                                </button>
                            </h4>
                        </div>
                    )}
                </div>
                <Divider />
                <div className="flex justify-end my-2 ">
                    <div className="flex items-center self-center">
                        <Tooltip
                            arrow
                            title="Add question"
                            placement="bottom"
                            TransitionComponent={Fade}
                        >
                            <button
                                type="button"
                                className="flex items-center text-xs text-gray-500 hover:bg-green-100 hover:text-green-500 p-2 rounded-full"
                                onClick={() => addQuestion(index + 1)}
                            >
                                <PlusCircleIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>
                        <Tooltip
                            arrow
                            title="Delete question"
                            placement="bottom"
                            TransitionComponent={Fade}
                        >
                            <button
                                type="button"
                                className="flex items-center text-xs text-gray-500 hover:bg-red-100 hover:text-red-500 p-2 rounded-full "
                                onClick={() => deleteQuestion(question)}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    );
}

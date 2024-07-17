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
import Select from "react-select";
import {
    FaAlignJustify,
    FaGripLines,
    FaRegCheckSquare,
    FaRegCircle,
    FaSortDown,
} from "react-icons/fa";
import { HiBars2 } from "react-icons/hi2";

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) {
    const [model, setModel] = useState({ ...question });
    const { questionTypes } = useStateContext(); 

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

    function onTypeChange(option) {
        const newModel = {
            ...model,
            type: option.value,
        };
        if (!shouldHaveOptions(model.type) && shouldHaveOptions(option.value)) {
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

    const questionTypeOptions = questionTypes.map((type) => ({
        value: type,
        label: (
            <div className="flex items-center cursor-pointer">
                {getIcon(type)}
                <span className="ml-2">{upperCaseFirst(type)}</span>
            </div>
        ),
    }));

    function getIcon(type) {
        switch (type) {
            case "short answer":
                return <FaGripLines className="w-4 h-4" />;
            case "paragraph":
                return <FaAlignJustify className="w-4 h-4" />;
            case "checkboxes":
                return <FaRegCheckSquare className="w-4 h-4" />;
            case "multiple choice":
                return <FaRegCircle className="w-4 h-4" />;
            case "dropdown":
                return <FaSortDown className="w-4 h-4" />;
            default:
                return null;
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: "38px",
            cursor: "pointer",
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: "0 6px",
        }),
        input: (provided) => ({
            ...provided,
            margin: "0px",
            padding: "0px",
        }),
        indicatorSeparator: (provided) => ({
            display: "none",
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: "38px",
        }),
    };

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 my-4">
                <div className="flex flex-col lg:flex-row gap-3 justify-between mb-3 mt-2">
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
                            className="mt-1 block w-full rounded-md  py-2 px-3 form-control sm:text-sm"
                        />
                    </div>

                    {/* Question Type */}
                    <div className="relative min-w-[10rem] cursor-pointer w-full lg:w-1/3">
                        <Select
                            value={questionTypeOptions.find(
                                (option) => option.value === model.type
                            )}
                            onChange={onTypeChange}
                            options={questionTypeOptions}
                            styles={customStyles}
                            className="mt-1 block w-full rounded-md sm:text-sm cursor-pointer"
                            isSearchable={false}
                        />
                    </div>
                </div>

                <div className="mb-4 mt-6">
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
                                        <div
                                            className="flex items-center my-2"
                                            key={op.uuid}
                                        >
                                            {model.type ===
                                                "multiple choice" && (
                                                <input
                                                    type="radio"
                                                    className="mr-2 w-6 h-6"
                                                    disabled
                                                />
                                            )}
                                            {model.type === "checkboxes" && (
                                                <input
                                                    type="checkbox"
                                                    className="mr-2  w-5 h-5"
                                                    disabled
                                                />
                                            )}
                                            {model.type === "dropdown" && (
                                                <span className="mr-2 text-sm">
                                                    {ind + 1}.
                                                </span>
                                            )}
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
                                                onClick={() => deleteOption(op)}
                                                type="button"
                                                className="h-8 w-8 rounded-full flex items-center text-gray-700 justify-center hover:bg-red-50 hover:text-red-500 p-2 mx-1"
                                            >
                                                <Tooltip
                                                    arrow
                                                    title="Remove"
                                                    placement="right"
                                                    TransitionComponent={Fade}
                                                >
                                                    <XMarkIcon className="w-5 h-5" />
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
                                    className="flex items-center text-xs py-1 px-2 rounded-md text-white bg-gray-500 hover:bg-gray-700"
                                >
                                    Add option
                                </button>
                            </h4>
                        </div>
                    )}
                </div>
                <Divider />
                <div className="flex justify-end my-2">
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
                                className="flex items-center text-xs text-gray-500 hover:bg-red-100 hover:text-red-500 p-2 rounded-full"
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

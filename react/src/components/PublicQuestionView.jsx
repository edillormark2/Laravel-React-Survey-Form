import React from "react";

export default function PublicQuestionView({ question, index, answerChanged }) {
    let selectedOptions = [];

    function onCheckboxChanged(option, $event) {
        if ($event.target.checked) {
            selectedOptions.push(option.text);
        } else {
            selectedOptions = selectedOptions.filter((op) => op != option.text);
        }
        answerChanged(selectedOptions);
    }

    return (
        <div>
            <fieldset className="mb-4">
                <div>
                    <legend className="text-base font-medium text-gray-900">
                        {index + 1}. {question.question}
                    </legend>
                    <p className="text-gray-500 text-sm">
                        {question.description}
                    </p>
                </div>
                <div className="mt-3">
                    {question.type === "select" && (
                        <div>
                            <select
                                onChange={(ev) =>
                                    answerChanged(ev.target.value)
                                }
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none form-control sm:text-sm"
                            >
                                <option value="">Please Select</option>
                                {question.data.options.map((option) => (
                                    <option
                                        key={option.uuid}
                                        value={option.text}
                                    >
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {question.type === "radio" && (
                        <div>
                            {question.data.options.map((option, ind) => (
                                <div
                                    key={option.uuid}
                                    className="flex items-center"
                                >
                                    <input
                                        id={option.uuid}
                                        name={"question" + question.id}
                                        value={option.text}
                                        onChange={(ev) =>
                                            answerChanged(ev.target.value)
                                        }
                                        type="radio"
                                        className=" h-4 w-4  border-gray-300"
                                    />
                                    <label
                                        htmlFor={option.uuid}
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === "checkbox" && (
                        <div>
                            {question.data.options.map((option, ind) => (
                                <div
                                    key={option.uuid}
                                    className="flex items-center"
                                >
                                    <input
                                        id={option.uuid}
                                        onChange={(ev) =>
                                            onCheckboxChanged(option, ev)
                                        }
                                        type="checkbox"
                                        className=" border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={option.uuid}
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === "Text" && (
                        <div>
                            <input
                                type="text"
                                onChange={(ev) =>
                                    answerChanged(ev.target.value)
                                }
                                className="h-4 w-4 form-control border-gray-300"
                            />
                        </div>
                    )}
                    {question.type === "textarea" && (
                        <div>
                            <textarea
                                onChange={(ev) =>
                                    answerChanged(ev.target.value)
                                }
                                className="mt-1 form-control w-full shadow-sm sm:text-sm border-gray-300 bg-white rounded-md"
                            ></textarea>
                        </div>
                    )}
                </div>
            </fieldset>
            <hr className="mb-4" />
        </div>
    );
}

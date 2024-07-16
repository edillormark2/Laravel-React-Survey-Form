import React from "react";

export default function PublicQuestionView({ question, index, answerChanged }) {
    let selectedOptions = [];

    function onCheckboxChanged(option, $event) {
        if ($event.target.checked) {
            selectedOptions.push(option.text);
        } else {
            selectedOptions = selectedOptions.filter(
                (op) => op !== option.text
            );
        }
        answerChanged(selectedOptions);
    }

    return (
        <div className="bg-white p-4 my-4 border border-gray-200 rounded-lg">
            <fieldset className="mb-4">
                <div>
                    <legend className="text-base font-semibold text-gray-900">
                        {index + 1}. {question.question}
                    </legend>
                    <p className="text-gray-500 text-sm ">
                        {question.description}
                    </p>
                </div>
                <div className="mt-3">
                    {question.type === "dropdown" && (
                        <div>
                            <select
                                onChange={(ev) =>
                                    answerChanged(ev.target.value)
                                }
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none form-control sm:text-sm cursor-pointer"
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
                    {question.type === "multiple choice" && (
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
                                        className="h-5 w-5 text-gray-600 border-gray-300 my-1 cursor-pointer"
                                    />
                                    <label
                                        htmlFor={option.uuid}
                                        className="ml-3 block text-base text-gray-700"
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === "checkboxes" && (
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
                                        className="h-4 w-5 text-gray-600 border-gray-300 rounded my-1  cursor-pointer"
                                    />
                                    <label
                                        htmlFor={option.uuid}
                                        className="ml-3 block text-base text-gray-700"
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === "short answer" && (
                        <div>
                            <input
                                type="text"
                                onChange={(ev) =>
                                    answerChanged(ev.target.value)
                                }
                                className="form-control w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2"
                            />
                        </div>
                    )}
                    {question.type === "paragraph" && (
                        <div>
                            <textarea
                                onChange={(ev) =>
                                    answerChanged(ev.target.value)
                                }
                                className="mt-1 form-control w-full shadow-sm sm:text-sm border-gray-300 bg-white rounded-md p-2"
                            ></textarea>
                        </div>
                    )}
                </div>
            </fieldset>
        </div>
    );
}

import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";

export default function SurveyQuestions({ questions, onQuestionsUpdate }) {
    const [myQuestions, setMyQuestions] = useState([...questions]);

    const addQuestion = (index) => {
        index = index !== undefined ? index : myQuestions.length;
        myQuestions.splice(index, 0, {
            id: uuidv4(),
            type: "short answer",
            question: "",
            description: "",
            data: {},
        });
        setMyQuestions([...myQuestions]);
        onQuestionsUpdate(myQuestions);
    };

    const questionChange = (question) => {
        if (!question) return;
        const newQuestions = myQuestions.map((q) => {
            if (q.id == question.id) {
                return { ...question };
            }
            return q;
        });
        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions);
    };

    const deleteQuestion = (question) => {
        const newQuestions = myQuestions.filter((q) => q.id !== question.id);
        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions);
    };

    useEffect(() => {
        setMyQuestions(questions);
    }, [questions]);

    return (
        <>
            <div className="flex justify-between mt-4">
                <h3 className="text-2xl font-bold">Questions</h3>
                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-md text-blue-500  bg-blue-50 border border-blue-400 hover:bg-blue-100"
                    onClick={() => addQuestion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Add question
                </button>
            </div>
            {myQuestions.length ? (
                myQuestions.map((q, ind) => (
                    <QuestionEditor
                        key={q.id}
                        index={ind}
                        question={q}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    You don't have any question created
                </div>
            )}
        </>
    );
}

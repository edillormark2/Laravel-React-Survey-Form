import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios";

export default function Surveys() {
    //const { surveys } = useStateContext();
    const [surveys, setSurveys] = useState([]);
    console.log(surveys);

    const onDeleteClick = () => {
        console.log("On Delete click");
    };

    useEffect(() => {
        axiosClient.get("/survey").then(({ data }) => {
            setSurveys(data.data);
        });
    }, []);

    return (
        <div>
            <div className="flex justify-end mb-8">
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Create new
                </TButton>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map((survey) => (
                    <SurveyListItem
                        survey={survey}
                        key={survey.id}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </div>
        </div>
    );
}

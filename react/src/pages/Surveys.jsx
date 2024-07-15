import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import Loader from "../components/Loader";

export default function Surveys() {
    const { showToast } = useStateContext();
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);

    const onDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this survey?")) {
            axiosClient.delete(`/survey/${id}`).then(() => {
                getSurveys();
                showToast("The survey was deleted");
            });
        }
    };

    const onPageClick = (link) => {
        getSurveys(link.url);
    };

    const getSurveys = (url) => {
        url = url || "/survey";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSurveys(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <div>
            <div className="flex justify-end mb-8">
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Create new
                </TButton>
            </div>

            {loading && <Loader />}

            {!loading && (
                <div>
                    {surveys.length === 0 && (
                        <div className="py-8 text-center text-gray-500">
                            You don't have surveys created
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {surveys.map((survey) => (
                            <SurveyListItem
                                survey={survey}
                                key={survey.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>
                    {surveys.length > 0 && (
                        <PaginationLinks
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

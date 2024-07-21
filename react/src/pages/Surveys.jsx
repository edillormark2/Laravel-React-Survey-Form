import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import Loader from "../components/Loader";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router-dom";

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

    const breadcrumbLinks = [
        { to: "/dashboard", label: "Home" },
        { to: "", label: "Survey List" },
    ];

    return (
        <div className="w-full  xl:w-11/12 mx-auto ">
            <div className="flex justify-between mb-8 ">
                <div className="py-4 items-center">
                    <p className=" font-semibold text-2xl">Survey List</p>
                    <Breadcrumbs links={breadcrumbLinks} />
                </div>
                <div className="items-center py-4 ">
                    <Link
                        to="/surveys/create"
                        style={{ textDecoration: "none" }}
                    >
                        <button className="flex p-2 bg-emerald-50 border border-emerald-300 text-emerald-500 rounded-lg hover:text-white hover:bg-emerald-300  ">
                            <PlusCircleIcon className="h-6 w-6 mr-0 md:mr-2" />
                            <p className="hidden md:block self-center">Create new</p>
                        </button>
                    </Link>
                </div>
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

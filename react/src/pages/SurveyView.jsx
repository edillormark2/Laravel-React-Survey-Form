import React from "react";

export default function SurveyView() {
    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: [],
    });

    return (
        <div>
            <div>Create new survey</div>
        </div>
    );
}

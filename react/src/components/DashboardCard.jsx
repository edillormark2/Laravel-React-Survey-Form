import React from "react";

export default function DashboardCard({
    title,
    children,
    style = "",
    className = "",
}) {
    return (
        <div
            className={
                "bg-white rounded-lg p-3 animate-fade-in-down " + className
            }
            style={style}
        >
            {title && <h3>{title}</h3>}
            {children}
        </div>
    );
}

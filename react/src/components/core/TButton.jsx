import { Link } from "react-router-dom";

export default function TButton({
    color = "indigo",
    to = "",
    circle = false,
    href = "",
    link = false,
    target = "_blank",
    onClick = () => {},
    children,
}) {
    let classes = [
        "flex",
        "items-center",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "border-2",
        "border-transparent",
    ];

    if (link) {
        classes = [...classes, "transition-colors"];

        switch (color) {
            case "indigo":
                classes = [
                    ...classes,
                    "text-indigo-500",
                    "focus:border-indigo-500",
                ];
                break;
            case "red":
                classes = [...classes, "text-red-500", "focus:border-red-500"];
        }
    } else {
        classes = [
            ...classes,
            "text-white",
            "focus:ring-2",
            "focus:ring-offset-2",
        ];

        switch (color) {
            case "indigo":
                classes = [
                    ...classes,
                    "bg-blue-500",
                    "hover:bg-blue-600",
                    "focus:ring-indigo-500",
                ];
                break;
            case "red":
                classes = [
                    ...classes,
                    "bg-red-50",
                    "text-red-400",
                    "border-1",
                    "border-red-300",
                    "hover:bg-red-500",
                    "hover:text-white",
                ];
                break;
            case "green":
                classes = [
                    ...classes,
                    "bg-emerald-50",
                    "text-emerald-400",
                    "border-1",
                    "border-emerald-300",
                    "hover:bg-emerald-400",
                    "hover:text-white",
                ];
                break;
        }
    }

    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-sm",
        ];
    } else {
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
    }

    return (
        <>
            {href && (
                <a href={href} className={classes.join(" ")} target={target}>
                    {children}
                </a>
            )}
            {to && (
                <Link to={to} className={classes.join(" ")}>
                    {children}
                </Link>
            )}
            {!to && !href && (
                <button onClick={onClick} className={classes.join(" ")}>
                    {children}
                </button>
            )}
        </>
    );
}

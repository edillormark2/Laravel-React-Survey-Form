import React from "react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumbs = ({ links }) => {
    if (!links || links.length === 0) {
        return null;
    }

    return (
        <MuiBreadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className="dark:text-gray-400 text-slate-900 "
        >
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={link.to}
                    style={{
                        textDecoration: "none",
                        color:
                            index === links.length - 1 ? "inherit" : "#3498DB",
                        fontSize: "0.9rem",
                    }}
                    disabled={index === links.length - 1} // Disable the last link
                >
                    {link.label}
                </Link>
            ))}
        </MuiBreadcrumbs>
    );
};

const Link = (props) => {
    if (props.disabled) {
        return <span {...props}>{props.children}</span>;
    }
    return <RouterLink {...props} />;
};

export default Breadcrumbs;

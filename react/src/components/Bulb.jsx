import { FaLightbulb } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import AboutPopup from "./AboutPopup";
import { useState } from "react";

export default function Bulb() {
    const [openAboutPopup, setOpenAboutPopup] = useState(false);

    const handleOpenAbout = () => {
        setOpenAboutPopup(true);
    };

    return (
        <div>
            <Tooltip
                arrow
                title="About"
                placement="bottom"
                TransitionComponent={Fade}
            >
                <div
                    onClick={handleOpenAbout}
                    className="relative cursor-pointer flex items-center justify-center"
                >
                    {/* Animated background */}
                    <div className="absolute rounded-full bg-yellow-200 opacity-75 w-10 h-10 animate-ping"></div>
                    {/* Icon centered on top */}
                    <FaLightbulb
                        size={25}
                        className="relative text-yellow-400 hover:text-yellow-500"
                    />
                </div>
            </Tooltip>
            <AboutPopup
                openAboutPopup={openAboutPopup}
                setOpenAboutPopup={setOpenAboutPopup}
            />
        </div>
    );
}

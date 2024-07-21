import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";

const ShareSurveyPopup = ({ openSharePopup, setOpenSharePopup, shareLink }) => {
    const handleClosePopup = () => {
        setOpenSharePopup(false);
    };
    const { showToast } = useStateContext();

    const isMobile = useMediaQuery("(max-width:600px)");

    const dynamicPopupStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 3,
        width: "min(90%, 600px)",
        maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)",
        overflowY: "auto",
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            showToast("Link copied to clipboard!");
            setOpenSharePopup(false);
        });
    };

    return (
        <div>
            <Modal open={openSharePopup} onClose={handleClosePopup}>
                <Box className="bg-white rounded-xl" sx={dynamicPopupStyle}>
                    <div className="relative mb-6">
                        <div className="absolute -top-3 right-0">
                            <ModalClose
                                variant="outlined"
                                onClick={handleClosePopup}
                            />
                        </div>
                        <div className="text-lg font-semibold mb-2 text-center">
                            Share this survey
                        </div>
                    </div>
                    <Divider />
                    <div className="mt-8">
                        <div className="flex  gap-2">
                            <input
                                type="text"
                                value={shareLink}
                                readOnly
                                className="w-full p-2 border rounded-lg"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="w-20 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ShareSurveyPopup;

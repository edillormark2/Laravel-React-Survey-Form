import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { useMediaQuery } from "@mui/material";
import { Divider } from "@mui/joy";

const AboutPopup = ({ openAboutPopup, setOpenAboutPopup, shareLink }) => {
    const handleClosePopup = () => {
        setOpenAboutPopup(false);
    };

    const isMobile = useMediaQuery("(max-width:600px)");

    const dynamicPopupStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 3,
        width: "auto",
        width: "min(90%, 600px)",
        maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)",
        overflowY: "auto",
    };

    return (
        <div>
            <Modal open={openAboutPopup} onClose={handleClosePopup}>
                <Box
                    className="bg-white rounded-xl shadow-lg"
                    sx={dynamicPopupStyle}
                >
                    <div className="relative mb-6 p-4">
                        <div className="absolute -top-3 right-0">
                            <ModalClose
                                variant="outlined"
                                onClick={handleClosePopup}
                            />
                        </div>
                        <Typography
                            variant="h5"
                            className="font-semibold text-center mb-4"
                        >
                            About SurveyForm
                        </Typography>
                    </div>
                    <Divider />
                    <div className="p-4">
                        <Typography variant="body1" className="mb-8">
                            Welcome to SurveyForm – a web application built with
                            react js + laravel framework
                        </Typography>
                        <Typography variant="h6" className="font-semibold mb-2 mt-2">
                            Features
                        </Typography>
                        <ul className="list-disc list-inside mb-4 p-4 bg-gray-100 rounded-lg mt-4">
                            <li className="mb-2">
                                <strong>Intuitive Dashboard</strong> - Upon
                                logging in, you’ll be greeted by a sleek
                                dashboard showcasing key statistics about your
                                surveys. Track survey and response counts, view
                                the latest surveys and responses, all in one
                                place.
                            </li>
                            <li className="mb-2">
                                <strong>Comprehensive Survey Management</strong>{" "}
                                - Easily manage your surveys with our
                                user-friendly interface. Update existing
                                surveys, preview them before sharing, or delete
                                them with just a click. Our dynamic card-based
                                layout and pagination make navigating through
                                your surveys a breeze.
                            </li>
                            <li className="mb-2">
                                <strong>Customizable Survey Creation</strong> -
                                Create surveys tailored to your needs with
                                various question types including multiple
                                choice, checkboxes, dropdowns, short answers,
                                and paragraphs. Customize your surveys with
                                titles, descriptions, images, and set expiry
                                dates to control when responses are accepted.
                            </li>
                            <li className="mb-2">
                                <strong>Share & Publish</strong> - Once your
                                survey is ready, share it effortlessly by
                                copying the survey link. Choose whether to
                                publish your survey or keep it private – the
                                choice is yours!
                            </li>
                            <li className="mb-2">
                                <strong>Secure & User-Friendly</strong> - Our
                                app is designed with you in mind, featuring a
                                clean, user-friendly interface and robust
                                security measures, including authentication and
                                authorization to keep your data safe.
                            </li>
                        </ul>
                        <Typography variant="h6" className="font-semibold mb-2">
                            Built With
                        </Typography>
                        <ul className="list-disc list-inside p-4 bg-gray-100 rounded-lg mt-4">
                            <li>
                                <strong>React JS</strong> for a dynamic and
                                responsive frontend experience.
                            </li>
                            <li>
                                <strong>Laravel</strong> for a robust and
                                scalable backend solution.
                            </li>
                        </ul>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AboutPopup;

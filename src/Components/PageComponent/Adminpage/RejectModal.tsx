/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal } from "antd";
import { PrimaryOutlineButton, SecondaryOutlineButton } from "../Buttons/Buttons";

interface RejectModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const RejectModal: React.FC<RejectModalProps> = ({ isOpen, closeModal }) => {
    return (
        <Modal
            visible={isOpen}
            onCancel={closeModal}
            footer={null}
            closeIcon={null}
            centered
            width={500}
            className="rounded-lg shadow-lg"
        >
            <div className="p-6">
                <div className="flex flex-col items-center space-y-6">
                    {/* Modal Heading */}
                    <h2 className="text-2xl text-center font-bold mb-4 text-red-600">
                        Delete User
                    </h2>

                    {/* Description */}
                    <p className="text-center text-gray-600 mb-4">
                        Are you sure you want to delete this user? Please select a reason below.
                    </p>

                    {/* Reason Checkboxes */}
                    <div className="space-y-4 w-full">
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="checkbox1" className="form-checkbox h-5 w-5 text-red-600" />
                            <label htmlFor="checkbox1" className="text-gray-700">
                                Does not follow the terms and conditions
                            </label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="checkbox2" className="form-checkbox h-5 w-5 text-red-600" />
                            <label htmlFor="checkbox2" className="text-gray-700">
                                Posts inappropriate content
                            </label>
                        </div>
                    </div>

                    {/* Additional Reason Textarea */}
                    <textarea
                        rows={4}
                        className="p-4 border border-gray-300 rounded-md w-full resize-none focus:ring-2 focus:ring-red-600 outline-none"
                        placeholder="Add additional reasons (optional)"
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4 w-full">
                        <div onClick={closeModal}>
                            <SecondaryOutlineButton title={"Cancel"} />
                        </div>

                        <PrimaryOutlineButton title={"Delete User"} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RejectModal;

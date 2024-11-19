/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal } from "antd";
import {
  PrimaryOutlineButton,
  SecondaryOutlineButton,
} from "../Buttons/Buttons";

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  deletePost: () => void; // Function to delete the post
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  closeModal,
  deletePost,
}) => {
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
            Delete Post
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 mb-4">
            Are you sure you want to delete this post?
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 w-full">
            <div onClick={closeModal}>
              <SecondaryOutlineButton title={"Cancel"} />
            </div>

            <div onClick={deletePost}>
              <PrimaryOutlineButton title={"Delete Post"} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

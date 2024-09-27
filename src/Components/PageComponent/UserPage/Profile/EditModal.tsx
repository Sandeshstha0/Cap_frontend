/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal } from "antd";
import {
  PrimaryOutlineButton,
  SecondaryOutlineButton,
} from "../../Buttons/Buttons";

interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, closeModal }) => {
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
            Edit user
          </h2>

          {/* Description */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-l font-normal">
              {/* Full Name */}
              <div>
                <label className="text-bodydark2 text-medium font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Sandesh Shrestha"
                  className="w-full px-2 py-2 text-bodydark2 text-sm border border-gray-300 rounded-lg mt-2"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 text-bodydark2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="sandesh@123gmail.com"
                  className="w-full px-2 py-2 text-bodydark2 text-sm border border-gray-300 rounded-lg mt-2"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-gray-700 text-bodydark2 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="9812190256"
                  className="w-full px-2 py-2 text-sm text-bodydark2 border border-gray-300 rounded-lg mt-2"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-gray-700 text-bodydark2 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Damauli"
                  className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2"
                />
              </div>

              {/* Other Info */}
              <div>
                <label className="text-gray-700 text-bodydark2 font-medium">
                  Birthday
                </label>
                <input
                  type="date"
                  placeholder="1990-10-10"
                  className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2"
                />
              </div>

              <div>
                <label className="text-gray-700 text-bodydark2 font-medium">
                  Gender
                </label>
                <select className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 w-full">
            <div onClick={closeModal}>
              <SecondaryOutlineButton title={"Cancel"} />
            </div>

            <SecondaryOutlineButton title={"Save"} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;

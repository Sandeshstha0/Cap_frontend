/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Modal } from "antd";
import {
  PrimaryOutlineButton,
  SecondaryOutlineButton,
} from "../../Buttons/Buttons";

interface AddremainderModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddremainderModalProps: React.FC<AddremainderModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal
      visible={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={300}
    
      className="rounded-lg shadow-lg"
    >
      <div className="p-2">
        <div className="flex flex-col items-center space-x-2 space-y-2">
          {/* Modal Heading */}
          <h2 className="text-3xl text-center font-bold mb-2 text-black">
            Set Reminder
          </h2>

          {/* Description */}
          <div className="flex-1 ">
            <div className="grid grid-cols-1 gap-9  text text-l font-normal">

              {/* Date */}
              <div>
                <label className="text-black  text-xl font-medium">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-black text-xl font-medium">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-black text-xl font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                  rows={5}
                ></textarea>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-10 w-full mt-6">
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

export default AddremainderModalProps;

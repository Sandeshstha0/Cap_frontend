/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import {
  PrimaryOutlineButton,
  SecondaryOutlineButton,
} from "../../Buttons/Buttons";

interface AddReminderModalProps {
  isOpen: boolean;
  closeModal: () => void;
  reminder: {
    id?: number;
    title: string; // Added title field
    reminderTime: string;
    description: string;
  } | null; // The reminder to edit or null for add
  isEdit: boolean; // Flag to check if it's in edit mode
  onSubmit: (reminder: {
    id?: number;
    title: string; // Added title field
    reminderTime: string;
    description: string;
  }) => void; // Function to handle add/update
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({
  isOpen,
  closeModal,
  reminder,
  isEdit,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [description, setDescription] = useState("");

  // When the modal is opened and if it's in edit mode, populate the form fields with the current reminder data
  useEffect(() => {
    if (isEdit && reminder) {
      setTitle(reminder.title);
      setReminderTime(reminder.reminderTime);
      setDescription(reminder.description);
    } else {
      setTitle(""); // Clear fields for add mode
      setReminderTime("");
      setDescription("");
    }
  }, [isOpen, isEdit, reminder]);

  const handleSubmit = () => {
    // Create reminder object from form state
    const newReminder = { id: reminder?.id, title, reminderTime, description };
    // Call the onSubmit function (passed from parent) to either add or update the reminder
    onSubmit(newReminder);
    closeModal();
  };

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
            {isEdit ? "Edit Reminder" : "Set Reminder"}
          </h2>

          {/* Form Fields */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-9 text-l font-normal">
              {/* Title */}
              <div>
                <label className="text-black text-xl font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                />
              </div>

              {/* Reminder Time */}
              <div>
                <label className="text-black text-xl font-medium">Reminder Time</label>
                <input
                  type="datetime-local" // Using datetime-local to handle both date and time
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
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
            <div onClick={handleSubmit}>
              <PrimaryOutlineButton title={isEdit ? "Update" : "Save"} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddReminderModal;

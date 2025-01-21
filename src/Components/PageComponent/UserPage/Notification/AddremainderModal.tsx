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
  const [errors, setErrors] = useState<{ title?: string; reminderTime?: string; description?: string }>({});

  useEffect(() => {
    if (isEdit && reminder) {
      setTitle(reminder.title);
      setReminderTime(reminder.reminderTime);
      setDescription(reminder.description);
    } else {
      setTitle("");
      setReminderTime("");
      setDescription("");
    }
    setErrors({});
  }, [isOpen, isEdit, reminder]);

 

  const validate = () => {
    const validationErrors: { title?: string; reminderTime?: string; description?: string } = {};
    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!reminderTime) validationErrors.reminderTime = "Reminder time is required.";
    if (!description.trim()) validationErrors.description = "Description is required.";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newReminder = { id: reminder?.id, title, reminderTime, description };
      onSubmit(newReminder);
      closeModal();
    }
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={400}
      className="rounded-lg shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {isEdit ? "Edit Reminder" : "Set Reminder"}
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.title ? "border-red" : "border-gray-300"
              } rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter title"
            />
            {errors.title && <p className="text-red text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Set Date & Time
            </label>
            <input
              type="datetime-local"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.reminderTime ? "border-red" : "border-gray-300"
              } rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.reminderTime && <p className="text-red text-sm mt-1">{errors.reminderTime}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.description ? "border-red" : "border-gray-300"
              } rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500`}
              rows={4}
              placeholder="Enter description"
            ></textarea>
            {errors.description && <p className="text-red text-sm mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <div onClick={closeModal}>
            <SecondaryOutlineButton title={"Cancel"} />
          </div>
          <div onClick={handleSubmit}>
            <PrimaryOutlineButton title={isEdit ? "Update" : "Save"} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddReminderModal;

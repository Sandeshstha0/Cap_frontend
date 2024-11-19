/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import {
  PrimaryOutlineButton,
  SecondaryOutlineButton,
} from "../../Buttons/Buttons";

interface EditCategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (categoryName: string) => void;
  category: { id: string; name: string } | null; // Category being edited or null for new
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  closeModal,
  onSave,
  category,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set category name when the modal is opened for editing
    if (category) {
      setCategoryName(category.name);
    } else {
      setCategoryName("");
    }
    setError(null); // Clear error on open
  }, [category]);

  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName.trim()); // Send the trimmed category name to the parent
      setCategoryName(""); // Clear the input field
      setError(null); // Clear any previous error
      closeModal(); // Close the modal
    } else {
      setError("Category name cannot be empty.");
    }
  };

  const handleClose = () => {
    setCategoryName(""); // Reset category name on close
    setError(null); // Clear error on close
    closeModal();
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={500}
      className="rounded-lg shadow-lg"
    >
      <div className="p-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Modal Heading */}
          <h2 className="text-3xl font-bold text-center text-black">
            {category ? "Edit Category" : "Add New Category"}
          </h2>

          {/* Description */}
          <div className="w-full">
            <label htmlFor="categoryName" className="block text-xl font-medium text-black">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-sm text-black bg-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter category name"
              aria-label="Category Name"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-10 w-full mt-6">
          <div onClick={handleClose}>
            <SecondaryOutlineButton title={"Cancel"} />
          </div>

          <div onClick={handleSave}>
            <PrimaryOutlineButton title={"Save"} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;

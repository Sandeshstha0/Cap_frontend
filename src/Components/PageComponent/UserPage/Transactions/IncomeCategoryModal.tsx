import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { SecondaryOutlineButton } from "../../Buttons/Buttons";

interface EditCategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (categoryName: string, categoryId?: string) => void; // Support category ID for editing
  category?: { id: string; name: string }; // Optional for editing
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  closeModal,
  onSave,
  category,
}) => {
  const [categoryName, setCategoryName] = useState("");

  // Populate the input field when editing a category
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    } else {
      setCategoryName("");
    }
  }, [category]);

  // Handle form submission
  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName, category?.id); // Pass category name and ID (if editing)
      setCategoryName(""); // Clear the input after saving
      closeModal(); // Close the modal
    } else {
      alert("Please enter a valid category name");
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      closeIcon={null}
      centered
      width={500}
      className="rounded-lg shadow-lg"
    >
      <div className="p-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Modal Heading */}
          <h2 className="text-2xl font-bold text-center text-black">
            {category ? "Edit Category" : "Create New Category"}
          </h2>

          {/* Category Name Input */}
          <div className="w-full">
            <label className="block text-black text-lg font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 w-full">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;

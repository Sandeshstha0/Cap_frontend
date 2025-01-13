import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { SecondaryOutlineButton } from "../../Buttons/Buttons";

interface EditCategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (categoryName: string, categoryId?: string) => void; // Allow categoryId to be optional
  category?: { id: string; name: string } | null; // Allow category to be null for new categories
  existingCategories?: string[]; // Array of existing category names (if you want to check for duplicates)
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  closeModal,
  onSave,
  category,
  existingCategories = [], // Optional, default to an empty array
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string>("");

  // Populate the input field when editing a category
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    } else {
      setCategoryName(""); // Clear input when creating a new category
    }
    setError(""); // Reset error state when input changes
  }, [category]);

  // Handle form submission
  const handleSave = () => {
    if (!categoryName.trim()) {
      setError("Category name cannot be empty");
      return;
    }

    if (categoryName.trim().length < 3) {
      setError("Category name must be at least 3 characters long");
      return;
    }

    if (existingCategories.includes(categoryName.trim())) {
      setError("Category name already exists");
      return;
    }

    // If validation passes, call onSave and close the modal
    onSave(categoryName, category?.id);
    setCategoryName(""); // Clear the input after saving
    closeModal(); // Close the modal
    setError(""); // Reset error state
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
              onChange={(e) => {
                setCategoryName(e.target.value);
                setError(""); // Clear error on input change
              }}
              className={`w-full px-3 py-2 text-black bg-gray-100 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter category name"
            />
            {error && <p className="text-red text-sm mt-2">{error}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 w-full">
            <button className="text-orange-400 font-semibold text-base" onClick={closeModal}> Cancel</button>
          
            <button
              onClick={handleSave}
              className="px-6 font-semibold text-base py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
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

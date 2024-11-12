import React, { useState } from "react";
import { Modal } from "antd";
import { SecondaryOutlineButton } from "../../Buttons/Buttons";

interface EditCategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (categoryName: string) => void; // Pass the category name to the parent on save
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  closeModal,
  onSave,
}) => {
  const [categoryName, setCategoryName] = useState("");

  // Handle form submission
  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName); // Send the new category name to the parent
      setCategoryName(""); // Clear the input after saving
      closeModal(); // Close the modal
    } else {
      alert("Please enter a category name");
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
      <div className="p-2">
        <div className="flex flex-col items-center space-x-2 space-y-2">
          {/* Modal Heading */}
          <h2 className="text-3xl text-center font-bold mb-2 text-black">
            Create new Category
          </h2>

          {/* Category Name Input */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 gap-7">
              <div>
                <label className="text-black text-xl font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                  placeholder="Enter category name"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-10 w-full mt-6">
            <div onClick={closeModal}>
              <SecondaryOutlineButton title="Cancel" />
            </div>
            <div onClick={handleSave}>
              <SecondaryOutlineButton title="Save" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;

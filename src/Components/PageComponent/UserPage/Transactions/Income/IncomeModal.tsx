import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IncomeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: number;
  onSave: (transaction: {
    amount: number;
    type: string;
    date: string;
    description: string;
    category: {
      id: number;
    };
  }) => void;
  transaction?: { id: number; amount: number; type: string; date: string; description: string } | null;
}

const IncomeModal: React.FC<IncomeModalProps> = ({
  isOpen,
  closeModal,
  onSave,
  transaction,
  id,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("INCOME");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Populate the input fields when editing a transaction
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setType(transaction.type);
      setDate(transaction.date);
      setDescription(transaction.description);
    } else {
      setAmount(0); // Clear for new transactions
      setType("INCOME");
      setDescription("");
    }
  }, [transaction]);

  // Validate form fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (amount <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!date) {
      newErrors.date = "Date is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (description.length > 100) {
      newErrors.description = "Description cannot exceed 100 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle form submission
  const handleSave = () => {
    if (validateForm()) {
      onSave({
        amount,
        type,
        date,
        description,
        category: {
          id: id ?? 0,
        },
      });
      setAmount(0); // Reset after saving
      setDescription(""); // Clear description
      closeModal(); // Close the modal

      // Show success toast
      toast.success("Transaction saved successfully!");
    } else {
      // Show error toast
      toast.error("Please fix the errors and try again.");
    }
  };

  return (
    <>
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
              {transaction ? "Edit Transaction" : "Create New Transaction"}
            </h2>

            {/* Amount Input */}
            <div className="w-full">
              <label className="block text-black text-lg font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className={`w-full px-3 py-2 text-black bg-gray-100 border ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter amount"
                required
              />
              {errors.amount && <p className="text-red text-sm">{errors.amount}</p>}
            </div>

            {/* Date Input */}
            <div className="w-full">
              <label className="block text-black text-lg font-medium mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3 py-2 text-black bg-gray-100 border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.date && <p className="text-red text-sm">{errors.date}</p>}
            </div>

            {/* Description Input */}
            <div className="w-full">
              <label className="block text-black text-lg font-medium mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 text-black bg-gray-100 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter description (max-100 characters)"
              />
              {errors.description && <p className="text-red text-sm">{errors.description}</p>}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              {transaction ? "Save Changes" : "Save Transaction"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast container */}
      <ToastContainer/>
    </>
  );
};

export default IncomeModal;

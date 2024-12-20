import React, { useState, useEffect } from "react";
import { Modal } from "antd";

interface ExpenseModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id:number;
  onSave: (transaction: {
    amount: number;
    type: string;
    date: string;
    description: string;
    category:{
      id:number;
    } 
   
  }) => void;
  transaction?: { id: number; amount: number; type: string; date: string; description: string } | null;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  closeModal,
  onSave,
  transaction,
  id
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("EXPENSE");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Populate the input fields when editing a transaction
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setType(transaction.type);
      setDate(transaction.date);
      setDescription(transaction.description);
    } else {
      setAmount(0); // Clear for new transactions
      setType("EXPENSE");
      setDescription("");
    }
  }, [transaction]);

  // Handle form submission
  const handleSave = () => {
    if (amount && description.trim()) {
      onSave({
        amount,
        type,
        date,
        description,
        category  :{
          id:id ?? 0
        } , // Assuming you get categoryId from the transaction
      });
      setAmount(0); // Reset after saving
      setDescription(""); // Clear description
      closeModal(); // Close the modal
    } else {
      alert("Please enter valid transaction data");
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
            {transaction ? "Edit Transaction" : "Create New Transaction"}
          </h2>

          {/* Amount Input */}
          <div className="w-full">
            <label className="block text-black text-lg font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Type Selector */}
          <div className="w-full">
            <label className="block text-black text-lg font-medium mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EXPENSE">EXPENSE</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
          </div>

          {/* Date Input */}
          <div className="w-full">
            <label className="block text-black text-lg font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="w-full">
            <label className="block text-black text-lg font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-black bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
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
  );
};

export default ExpenseModal;

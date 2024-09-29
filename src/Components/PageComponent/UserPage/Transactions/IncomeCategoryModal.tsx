/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal } from "antd";
import {
  PrimaryOutlineButton,
  SecondaryOutlineButton,
} from "../../Buttons/Buttons";

interface EditCategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  closeModal,
}) => {
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
      <div className="p-2">
        <div className="flex flex-col items-center space-x-2 space-y-2">
          {/* Modal Heading */}
          <h2 className="text-3xl text-center font-bold mb-2 text-black">
            Add New Income
          </h2>

          {/* Description */}
          <div className="flex-1 ">
            <div className="grid grid-cols-1 gap-7 text text-l font-normal">
              {/* amount */}
              <div>
                <label className="text-black text-xl font-medium">Amount</label>
                <input
                  type="text"
                  className="w-100 px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                />
              </div>

              {/*Category*/}

              <div>
                <label className="text-black text-xl  font-medium">
                  Category
                </label>
                <select className="w-100 px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark">
                <option value="">Select Category</option>
                  <option value="">Teaching</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>

              {/* Other Info */}
              <div>
                <label className="text-black text-xl font-medium">Date</label>
                <input
                  type="date"
                  className="w-100 px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                />
              </div>
              <div>
              <label className="text-black text-xl font-medium">Description </label>
              <textarea
              
                className="w-100 px-2 py-2 text-sm text-black bg-slate-200 mt-2 focus:outline-none focus:ring-1 focus:ring-offset-graydark"
                rows={5}
              ></textarea>
            </div>

              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-10 w-100 mt-6">
            <div onClick={closeModal}>
              <SecondaryOutlineButton title={"Cancel"} />
            </div>

            <SecondaryOutlineButton title={"Save"} />
          </div>
        </div>
      

    </Modal>
  );
};

export default EditCategoryModal;

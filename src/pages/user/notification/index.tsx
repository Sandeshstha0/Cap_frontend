import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import AddremainderModalProps from "@/Components/PageComponent/UserPage/Notification/AddremainderModal";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import { addReminder, deleteReminder, getNotice, updateReminder } from "@/service/userService";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  data: {
    firstname: string;
    secondname: string;
  };
}

interface Reminder {
  id: number;
  title: string;
  description: string;
  reminderTime: string;
  date?: string; // Optional date
  time?: string; // Optional time
}

export default function Expense() {
  const [editmodalState, setEditModalState] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder | null>(null);

  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<UserData>("/user");

  // Handle submitting new or updated reminder
  const handleReminderSubmit = async (reminder: { id?: number; title: string; reminderTime: string; description: string }) => {
    const formattedReminder = {
      ...reminder,
      date: reminder.reminderTime.split("T")[0], // Extract the date from reminderTime
      time: reminder.reminderTime.split("T")[1], // Extract the time from reminderTime
    };
  
    try {
      if (formattedReminder.id !== undefined) {
        // Update the reminder if id is defined
        await updateReminder(formattedReminder);
        toast.success("Reminder updated successfully!");
      } else {
        // Add a new reminder if id is undefined
        await addReminder(formattedReminder);
        toast.success("Reminder added successfully!");
      }
  
      setIsModalOpen(false); // Close the modal after submitting
      fetchReminders(); // Re-fetch reminders to update the list
    } catch (error) {
      console.error("Error submitting reminder:", error);
    }
  };

    // Handle deleting a reminder
    const handleDelete = async (id: number) => {
      try {
        await deleteReminder(id); // Delete the reminder using the service
        setReminders(reminders.filter(reminder => reminder.id !== id)); // Remove from state
        toast.success("Reminder deleted successfully!");
      } catch (error) {
        console.error("Error deleting reminder:", error);
        toast.error("Failed to delete the reminder. Please try again.");
      }
    };
  

  // Open modal for editing an existing reminder
  const openModalForEdit = (reminder: Reminder) => {
    setReminderToEdit(reminder);
    setIsModalOpen(true);
  };

  // Open modal for adding a new reminder
  const openModalForAdd = () => {
    setReminderToEdit(null);
    setIsModalOpen(true);
  };

  // Fetch reminders
  const fetchReminders = async () => {
    try {
      const response = await getNotice();
      setReminders(response.data); // Ensure data is correctly assigned from response
    } catch (error) {
      console.error("Error fetching reminders:", error);
      setError("Failed to fetch reminders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reminders on mount
  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <UserLayout>
       <ToastContainer />
      <div className="flex-grow bg-gray-100">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h1 className="text-xl md:text-2xl text-orange-400 lg:text-3xl font-bold mb-4">
            Hey, {protectedData?.data?.firstname} {protectedData?.data?.secondname} 👋 !
          </h1>
          <p className="text-lg  text-slate-600  mb-2">
            Did you miss out anything? Welcome to the Reminder Section, you will shortly see your reminders here.
          </p>
          <p className="text-lg  text-slate-600 mb-6">
            and get notified about them by email.
          </p>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 mt-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center pb-4 border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex justify-between bg-white items-center px-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <span>Sort by</span>
                    <select className="border border-gray-300 rounded-md px-2 py-2">
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between space-x-3 mt- items-center px-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
                  />
                </div>

                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 "
                  onClick={openModalForAdd}
                >
                  + Add New
                </button>
              </div>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-l font-medium  tracking-wider">Id</th>
                    <th className="px-6 py-3 text-left text-l font-medium  tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-l font-medium  tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-l font-medium  tracking-wider">Reminder Time</th>
                    <th className="px-6 py-3 text-left text-l font-medium  tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : reminders.length > 0 ? (
                    reminders.map((reminder) => (
                      <tr key={reminder.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{reminder.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reminder.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reminder.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(reminder.reminderTime).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-2"
                            onClick={() => openModalForEdit(reminder)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(reminder.id)}
                          >Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No reminders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <AddremainderModalProps
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            reminder={reminderToEdit}
            isEdit={!!reminderToEdit}
            onSubmit={handleReminderSubmit}
          />
        )}
      </div>
    </UserLayout>
  );
}

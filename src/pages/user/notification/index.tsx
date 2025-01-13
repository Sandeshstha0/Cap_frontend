import { useState, useEffect } from "react";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import AddremainderModalProps from "@/Components/PageComponent/UserPage/Notification/AddremainderModal";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import {
  addReminder,
  deleteReminder,
  getNotice,
  updateReminder,
} from "@/service/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import ReminderAnimation from "@/Components/Animations/ReminderAnimation";

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
}

interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function ReminderPage(): JSX.Element {
  const [editModalState, setEditModalState] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState<Reminder | null>(null);
  const [view, setView] = useState<"table" | "calendar">("table");

  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<UserData>("/user");

  const calendarEvents: CalendarEvent[] = reminders.map((reminder) => ({
    id: reminder.id,
    title: reminder.title,
    reminderTime: reminder.reminderTime,
    description: reminder.description,
    start: new Date(reminder.reminderTime),
    end: new Date(reminder.reminderTime),
    allDay: false,
  }));

  const handleReminderSubmit = async (reminder: {
    id?: number;
    title: string;
    reminderTime: string;
    description: string;
  }): Promise<void> => {
    try {
      const [date, time] = reminder.reminderTime.split("T");
      const payload = {
        ...reminder,
        date,
        time: time.split(".")[0], // Extract time without milliseconds
      };

      if (reminder.id !== undefined) {
        await updateReminder(payload);
        toast.success("Reminder updated successfully!");
      } else {
        await addReminder(payload);
        toast.success("Reminder added successfully!");
      }
      setIsModalOpen(false);
      fetchReminders();
    } catch (error) {
      console.error("Error submitting reminder:", error);
      toast.error("Failed to save the reminder. Please try again.");
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteReminder(id);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
      toast.success("Reminder deleted successfully!");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Failed to delete the reminder. Please try again.");
    }
  };

  const openModalForEdit = (reminder: Reminder): void => {
    setReminderToEdit(reminder);
    setIsModalOpen(true);
  };

  const openModalForAdd = (): void => {
    setReminderToEdit(null);
    setIsModalOpen(true);
  };

  const fetchReminders = async (): Promise<void> => {
    try {
      const response = await getNotice();
      setReminders(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      setError("Failed to fetch reminders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <UserLayout>
      <ToastContainer />
      <div className="flex-grow bg-gray-100">
        <div className="flex justify-between bg-white rounded-lg  shadow-lg">
          <div className="flex space-x-4 items-center">
            <div>
              <ReminderAnimation />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-orange-400 lg:text-3xl font-bold mb-4">
                Hey, {protectedData?.data?.firstname}{" "}
                {protectedData?.data?.secondname} 👋 !
              </h1>
              <p className="text-lg text-slate-600 mb-2">
                Did you miss out any thing? 🤔
              </p>
              <p className="text-lg text-slate-600">
                Here you can add, edit, and delete reminders.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 mt-5 rounded-lg shadow-lg">
          <div className="flex justify-between items-center pb-4 border-gray-200">
            <div className="border-2 border-gray-200 border-orange-400 rounded-lg flex space-x-4">
              <button
                className={`px-4 py-2 rounded-md ${
                  view === "table" ? "bg-orange-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setView("table")}
              >
                Table View
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  view === "calendar"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setView("calendar")}
              >
                Calendar View
              </button>
            </div>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              onClick={openModalForAdd}
            >
              + Add New
            </button>
          </div>

          {view === "table" && (
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-l font-medium">
                      Id
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium">
                      Reminder Time
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : reminders.length > 0 ? (
                    reminders.map((reminder) => (
                      <tr key={reminder.id}>
                        <td className="px-6 py-4">{reminder.id}</td>
                        <td className="px-6 py-4">{reminder.title}</td>
                        <td className="px-6 py-4">{reminder.description}</td>
                        <td className="px-6 py-4">
                          {new Date(reminder.reminderTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-3">
                          <button
                            className="text-blue-600 text-2xl hover:text-blue-900 mr-2 "
                            onClick={() => openModalForEdit(reminder)}
                          >
                            <CiEdit className="hover:scale-125" />
                          </button>
                          <button
                            className="text-red hover:text-red text-2xl hover:scale-125"
                            onClick={() => handleDelete(reminder.id)}
                          >
                            <MdDeleteOutline />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No reminders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {view === "calendar" && (
            <div className="bg-white mt-5 p-6 rounded-lg shadow-lg">
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={(event: any) =>
                  openModalForEdit(event as Reminder)
                }
              />
            </div>
          )}
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

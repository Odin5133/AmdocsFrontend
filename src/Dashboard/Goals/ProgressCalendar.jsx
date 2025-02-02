import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheck } from "react-icons/fa";

const ProgressCalendar = () => {
  const [value, onChange] = useState(new Date());

  // Dummy completed dates
  const completedDates = ["2024-03-05", "2024-03-07", "2024-03-12"];

  return (
    <div className="h-full bg-white rounded-2xl shadow-lg p-4">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date }) =>
          completedDates.includes(date.toISOString().split("T")[0])
            ? "bg-green-100 rounded-full"
            : null
        }
        tileContent={({ date }) =>
          completedDates.includes(date.toISOString().split("T")[0]) && (
            <div className="absolute top-1 right-1">
              <FaCheck className="text-green-600 text-sm" />
            </div>
          )
        }
        className="!border-none !w-full"
      />
    </div>
  );
};

export default ProgressCalendar;

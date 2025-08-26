import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({ selectedDate, onChange }) {
  return (
    <div>
      <Calendar value={selectedDate} onChange={onChange} />
    </div>
  );
}

export default CalendarView;

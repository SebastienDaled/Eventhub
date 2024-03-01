import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

export function Calender({ dates }) {
  const parsedDates = JSON.parse(dates);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div>
      <div className='controlPannel'>
        <button onClick={prevMonth} className='btn__control'>Prev</button>
        <span className='current_location'>{format(currentMonth, 'MMMM yyyy')}</span>
        <button onClick={nextMonth} className='btn__control'>Next</button>
      </div>
      <div>
        <div className='days__titles'>
            <p>Sun</p>
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thu</p>
            <p>Fri</p>
            <p>Sat</p>
        </div>
        <div className='month'>
          {daysInMonth.map((day, index) => (
            <div key={index} className='days'>
              
              {eachDayOfInterval({ start: day, end: day }).map((d, idx) => (
                <div key={idx} className={isSameMonth(d, currentMonth) ? '' : 'disabled'}>
                  <div>{format(d, 'd')}</div>
                  {parsedDates.map((event) =>
                    isSameDay(d, new Date(event.date)) ? <div key={event.title} className='eventName'>{event.title}</div> : null
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isPast, add, addDays } from 'date-fns';
import Link from 'next/link';

export function Calender({ dates }) {
  const parsedDates = JSON.parse(dates);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const Month = currentMonth.getMonth();
  const Year = currentMonth.getFullYear();

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
            <div key={index} className={`days ${isPast(new Date(Year, Month, (index + 2))) ? 'pastDay' : ''}`}>
              {eachDayOfInterval({ start: day, end: day }).map((d, idx) => (
                <div key={idx} className={isSameMonth(d, currentMonth) ? '' : 'disabled'}>
                  <div>{format(d, 'd')}</div>
                  {parsedDates.map((event) =>
                    isSameDay(d, new Date(event.date)) ? <Link href={`${event.path}`} key={event.title} className='eventName'>{event.title}</Link> : null
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
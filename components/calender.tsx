import { useEffect, useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isPast, add, addDays, differenceInDays, isDate } from 'date-fns';
import Link from 'next/link';

export function Calender({ dates }) {
  const parsedDates = JSON.parse(dates);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [amountDaysLastMonth, setAmountDaysLastMonth] = useState(0);

  useEffect(() => {
    setAmountDaysLastMonth(differenceInDays(currentMonth, addMonths(currentMonth, -1)));
  }
  , [currentMonth]);
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const Month = currentMonth.getMonth();
  const Year = currentMonth.getFullYear();

  const firstDay = daysInMonth[0].getDay();
  const amountDays = daysInMonth.length;
  
  const daysInWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div>
      <div className='controlPannel'>
        <button onClick={prevMonth} className='btn__control'>Prev</button>
        <span className='current_location'>{format(currentMonth, 'MMMM yyyy')}</span>
        <button onClick={nextMonth} className='btn__control'>Next</button>
      </div>
      <div>
        <div className='days__titles'>
           {daysInWeek.map((day, index) => (
            <p key={index}>{day}</p>
          ))}
          
        </div>
        <div className='month'>
          {daysInMonth.map((day, index) => (
            // first day of the month needs to be checked if its a monday
            index === 0 ? 
              // shows when the first day of the month is not a monday
              firstDay !== 0 ? 
                <>
                  {Array(firstDay - 1).fill(null).map((_, idx) => (
                    <div key={idx} className={`days otherMontsDay`}>
                      <div>{amountDaysLastMonth - firstDay + 1 + idx + 1}</div>
                    </div>
                  ))}
                  <div key={index} className={`days ${isPast(new Date(Year, Month, (index + 2))) ? 'pastDay' : ''} ${isSameDay(new Date, new Date(Year, Month, (index + 2))) ? 'sameDay' : ''}`}>
                    {eachDayOfInterval({ start: day, end: day }).map((d, idx) => (
                      <div key={idx} className={isSameMonth(d, currentMonth) ? '' : 'disabled'}>
                        <div>{format(d, 'd')}</div>
                        {parsedDates.map((event) =>
                          isSameDay(d, new Date(event.date)) ? <Link href={`${event.path}`} key={event.title} className='eventName'>{event.title}</Link> : null
                        )}
                      </div>
                    ))}
                  </div>
                </>
              :
              // shows when the first day of the month is a monday then nothing special is needed
              null
            :
            // shows when the last day of the month is not a sunday
              index + 1 === amountDays && day.getDay() !== 0 ? 
                <>
                  <div key={index} className={`days ${isPast(new Date(Year, Month, (index + 2))) ? 'pastDay' : ''} ${isSameDay(new Date, new Date(Year, Month, (index + 1))) ? 'sameDay' : ''}`}>
                    {eachDayOfInterval({ start: day, end: day }).map((d, idx) => (
                      <div key={idx} className={isSameMonth(d, currentMonth) ? '' : 'disabled'}>
                        <div>{format(d, 'd')}</div>
                        {parsedDates.map((event) =>
                          isSameDay(d, new Date(event.date)) ? <Link href={`${event.path}`} key={event.title} className='eventName'>{event.title}</Link> : null
                        )}
                      </div>
                    ))}
                  </div>
                  {Array(7 - day.getDay()).fill(null).map((_, idx) => (
                    <div key={idx} className={`days otherMontsDay`}>
                      <div>{idx + 1}</div>
                    </div>
                  ))}
                </>
              :
              // shows when the last day of the month is a sunday then nothing special is needed
              <div key={index} className={`days ${isPast(new Date(Year, Month, (index + 2))) ? 'pastDay' : ''} ${isSameDay(new Date, new Date(Year, Month, (index + 1))) ? 'sameDay' : ''}`}>
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
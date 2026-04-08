import { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

export default function CalendarGrid({ 
  currentDate, 
  selectedRange, 
  onDateClick 
}) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    setCalendarDays(days);
  }, [currentDate]);

  const getDayStatus = (day) => {
    const { start, end } = selectedRange;
    
    if (start && isSameDay(day, start)) {
      return 'selected-start';
    }
    if (end && isSameDay(day, end)) {
      return 'selected-end';
    }
    if (start && end && isWithinInterval(day, { start, end })) {
      return 'selected-between';
    }
    if (start && !end && hoveredDate) {
      const intervalStart = start < hoveredDate ? start : hoveredDate;
      const intervalEnd = start < hoveredDate ? hoveredDate : start;
      if (isWithinInterval(day, { start: intervalStart, end: intervalEnd })) {
        return 'selected-between-hover';
      }
    }
    return '';
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handleMouseEnter = (day) => {
    if (!selectedRange.end && selectedRange.start) {
      setHoveredDate(day);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  return (
    <div className="bg-white rounded-b-xl md:rounded-r-xl md:rounded-bl-none shadow-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-semibold text-stone-500 tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          const status = getDayStatus(day);
          
          return (
            <div
              key={idx}
              onClick={() => onDateClick(day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseLeave={handleMouseLeave}
              className={`
                calendar-cell
                ${!isCurrentMonth ? 'bg-stone-50/50 text-stone-300' : 'bg-white'}
                ${status === 'selected-start' ? 'selected-start' : ''}
                ${status === 'selected-end' ? 'selected-end' : ''}
                ${status === 'selected-between' ? 'selected-between' : ''}
                ${status === 'selected-between-hover' ? 'bg-blue-50' : ''}
              `}
            >
              <span className={`
                absolute top-1 right-1 text-sm font-medium
                ${!isCurrentMonth ? 'text-stone-300' : 'text-stone-600'}
                ${status.includes('selected') ? 'text-white' : ''}
                ${isToday && !status.includes('selected') ? 'bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full -mt-0.5 -mr-0.5' : ''}
              `}>
                {format(day, 'd')}
              </span>
              
              {isCurrentMonth && !status.includes('selected') && (
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-stone-200 rounded-full" />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 flex items-center gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Start/End</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Selected Range</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [selectionStep, setSelectionStep] = useState('start');

  const currentMonth = format(currentDate, 'MMMM yyyy');

  const handleDateClick = (date) => {
    if (selectionStep === 'start') {
      setSelectedRange({ start: date, end: null });
      setSelectionStep('end');
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: date });
      }
      setSelectionStep('start');
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const clearSelection = () => {
    setSelectedRange({ start: null, end: null });
    setSelectionStep('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-stone-600" />
          </button>
          
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-700">
            {currentMonth}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ChevronRight size={24} className="text-stone-600" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex-1 md:w-2/3">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="md:w-2/5">
                <HeroImage currentMonth={currentMonth} />
              </div>
              
              <div className="flex-1">
                <CalendarGrid
                  currentDate={currentDate}
                  selectedRange={selectedRange}
                  onDateClick={handleDateClick}
                />
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-stone-500 px-2">
              <div>
                {selectedRange.start && !selectedRange.end && (
                  <span className="text-blue-600">
                    ✓ Start selected: {format(selectedRange.start, 'MMM dd')}
                    <span className="text-stone-400 ml-2">Click end date →</span>
                  </span>
                )}
                {selectedRange.start && selectedRange.end && (
                  <span className="text-green-600">
                    ✓ Range: {format(selectedRange.start, 'MMM dd')} - {format(selectedRange.end, 'MMM dd')}
                  </span>
                )}
                {!selectedRange.start && (
                  <span>Click a date to start selection</span>
                )}
              </div>
              {(selectedRange.start || selectedRange.end) && (
                <button
                  onClick={clearSelection}
                  className="text-xs text-stone-400 hover:text-red-500 underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          <div className="md:w-1/3">
            <NotesSection selectedRange={selectedRange} />
          </div>
        </div>
        
        <div className="text-center mt-8 text-xs text-stone-400">
          Interactive Calendar • Select any date range • Add notes to your selection
        </div>
      </div>
    </div>
  );
}
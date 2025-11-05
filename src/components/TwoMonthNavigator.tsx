import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface TwoMonthNavigatorProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  showWeekNumbers?: boolean;
  showWeekdayInitials?: boolean;
}

const TwoMonthNavigator = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  showWeekNumbers = true,
  showWeekdayInitials = true,
}: TwoMonthNavigatorProps) => {
  const months = [0, 1].map(offset => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + offset);
    return date;
  });

  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = new Array(7).fill(null);
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      currentWeek[i] = null;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      currentWeek[date.getDay()] = date;
      
      if (date.getDay() === 6 || day === daysInMonth) {
        weeks.push([...currentWeek]);
        currentWeek = new Array(7).fill(null);
      }
    }

    const getWeekNumber = (date: Date) => {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    return (
      <div className="flex-1 min-w-0">
        <div className="text-center font-medium text-sm mb-2">{monthName}</div>
        {showWeekdayInitials && (
          <div className="grid grid-cols-7 gap-px mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground py-1">
                {day}
              </div>
            ))}
          </div>
        )}
        <div className="space-y-px">
          {weeks.map((week, weekIdx) => {
            const weekNum = week.find(d => d !== null) ? getWeekNumber(week.find(d => d !== null)!) : null;
            return (
              <div key={weekIdx} className="flex gap-px">
                {showWeekNumbers && (
                  <div className="text-xs text-muted-foreground flex items-center justify-center w-6">
                    {weekNum}
                  </div>
                )}
                {week.map((date, dayIdx) => {
                  const isSelected = date && 
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();
                  
                  return (
                    <button
                      key={dayIdx}
                      onClick={() => date && onDateSelect(date)}
                      disabled={!date}
                      className={`
                        flex-1 aspect-square flex items-center justify-center text-sm
                        hover:bg-accent transition-colors
                        ${!date ? 'invisible' : ''}
                        ${isSelected ? 'bg-blue-400 text-white hover:bg-blue-500' : ''}
                      `}
                    >
                      {date?.getDate()}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onMonthChange('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-4 flex-1">
          {months.map((monthDate, idx) => (
            <div key={idx} className="flex-1">
              {renderMonth(monthDate)}
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onMonthChange('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TwoMonthNavigator;

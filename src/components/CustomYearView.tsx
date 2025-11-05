interface CustomYearViewProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CustomYearView = ({ currentDate, selectedDate, onDateSelect }: CustomYearViewProps) => {
  const year = currentDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' });
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

    return (
      <div className="border rounded p-2 bg-card">
        <div className="text-center font-medium text-xs mb-1">{monthName}</div>
        <div className="grid grid-cols-7 gap-px text-[10px]">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-px mt-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 gap-px">
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
                      aspect-square flex items-center justify-center text-[10px]
                      hover:bg-accent transition-colors rounded
                      ${!date ? 'invisible' : ''}
                      ${isSelected ? 'bg-blue-400 text-white hover:bg-blue-500' : ''}
                    `}
                  >
                    {date?.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {months.map((monthDate, idx) => (
        <div key={idx}>
          {renderMonth(monthDate)}
        </div>
      ))}
    </div>
  );
};

export default CustomYearView;

import { ChevronLeft, ChevronRight, Calendar, Clock, Grid3x3, CalendarDays } from 'lucide-react';
import { Button } from './ui/button';
import { CalendarView } from '@/types/calendar';

interface CustomToolbarProps {
  currentDate: Date;
  view: CalendarView;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  onViewChange: (view: CalendarView) => void;
}

const CustomToolbar = ({ currentDate, view, onNavigate, onViewChange }: CustomToolbarProps) => {
  const getDateTitle = () => {
    switch (view) {
      case 'timeGridDay':
        return currentDate.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
      case 'timeGridWeek': {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      case 'dayGridMonth':
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'customYear':
      case 'multiMonthYear':
        return currentDate.getFullYear().toString();
      default:
        return '';
    }
  };

  return (
    <div className="space-y-3 mb-4">
      {/* Custom Navigation Icons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('prev')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          <Button
            variant={view === 'timeGridDay' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('timeGridDay')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Day
          </Button>
          <Button
            variant={view === 'timeGridWeek' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('timeGridWeek')}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Week
          </Button>
          <Button
            variant={view === 'dayGridMonth' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('dayGridMonth')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Month
          </Button>
          <Button
            variant={view === 'customYear' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('customYear')}
          >
            <Grid3x3 className="h-4 w-4 mr-2" />
            Year
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('next')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Date Title */}
      <div className="text-center text-2xl font-bold text-emerald-600">
        {getDateTitle()}
      </div>

      {/* Default Header Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('prev')}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('today')}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('next')}
          >
            Next
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === 'dayGridMonth' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('dayGridMonth')}
          >
            Month
          </Button>
          <Button
            variant={view === 'timeGridWeek' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('timeGridWeek')}
          >
            Week
          </Button>
          <Button
            variant={view === 'timeGridDay' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('timeGridDay')}
          >
            Day
          </Button>
          <Button
            variant={view === 'customYear' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('customYear')}
          >
            Year
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;

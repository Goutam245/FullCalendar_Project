import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { CalendarEvent, CalendarSettings, CalendarView } from '@/types/calendar';
import { sampleEvents } from '@/data/sampleEvents';
import { getFruitForDate } from '@/data/fruitImages';
import CustomToolbar from '@/components/CustomToolbar';
import TwoMonthNavigator from '@/components/TwoMonthNavigator';
import FruitDisplay from '@/components/FruitDisplay';
import CustomYearView from '@/components/CustomYearView';
import EventModal from '@/components/EventModal';
import SettingsPanel from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 29));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 29));
  const [view, setView] = useState<CalendarView>('timeGridDay');
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [navigatorDate, setNavigatorDate] = useState(new Date(2025, 9, 1));
  const [showSettings, setShowSettings] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const [settings, setSettings] = useState<CalendarSettings>({
    loggedIn: true,
    uid: 1,
    weekNumbers: true,
    weekdayInitials: true,
    dayNavigator: true,
    weekNavigator: false,
    monthNavigator: false,
    yearNavigator: false,
  });

  const currentFruit = getFruitForDate(
    selectedDate,
    events.find(e => 
      e.start.toDateString() === selectedDate.toDateString() && e.photo
    )?.photo
  );

  const shouldShowNavigator = () => {
    switch (view) {
      case 'timeGridDay': return settings.dayNavigator;
      case 'timeGridWeek': return settings.weekNavigator;
      case 'dayGridMonth': return settings.monthNavigator;
      case 'customYear': return settings.yearNavigator;
      default: return false;
    }
  };

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    if (direction === 'today') {
      const today = new Date();
      setCurrentDate(today);
      setSelectedDate(today);
      calendarApi.today();
    } else {
      calendarApi[direction]();
      const newDate = calendarApi.getDate();
      setCurrentDate(newDate);
      setSelectedDate(newDate);
    }
  };

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    if (newView !== 'customYear') {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi && newView !== 'multiMonthYear') {
        calendarApi.changeView(newView);
      }
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi && view !== 'customYear') {
      calendarApi.gotoDate(date);
    }
  };

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setEventModalOpen(true);
    }
  };

  const handleDateClick = (info: any) => {
    setSelectedDate(info.date);
    setSelectedEvent(null);
    setEventModalOpen(true);
  };

  const handleEventSave = (eventData: Partial<CalendarEvent>) => {
    if (selectedEvent) {
      const updatedEvents = events.map(e =>
        e.id === selectedEvent.id ? { ...e, ...eventData } : e
      );
      setEvents(updatedEvents);
      toast({ title: 'Event updated successfully' });
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        uid: settings.uid,
        title: eventData.title || '',
        category: eventData.category,
        start: eventData.start || new Date(),
        end: eventData.end || new Date(),
        color: eventData.color || '#3B82F6',
        photo: eventData.photo,
        url: eventData.url,
      };
      setEvents([...events, newEvent]);
      toast({ title: 'Event created successfully' });
    }
    
    if (settings.loggedIn) {
      localStorage.setItem('calendar-events', JSON.stringify(events));
    }
  };

  useEffect(() => {
    if (settings.loggedIn) {
      const saved = localStorage.getItem('calendar-events');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setEvents(parsed.map((e: any) => ({
            ...e,
            start: new Date(e.start),
            end: new Date(e.end),
          })));
        } catch (e) {
          console.error('Failed to parse saved events');
        }
      }
    }
  }, [settings.loggedIn]);

  const renderEventContent = (eventInfo: any) => {
    const event = events.find(e => e.id === eventInfo.event.id);
    
    if (view === 'timeGridDay') {
      return (
        <div className="flex items-center gap-2 px-2 py-1">
          <div 
            className="w-1 h-full absolute left-0 top-0 bottom-0"
            style={{ backgroundColor: eventInfo.event.backgroundColor }}
          />
          {event?.category && (
            <span className="text-xs">📅</span>
          )}
          <span className="text-sm truncate">{eventInfo.event.title}</span>
        </div>
      );
    }
    
    if (view === 'timeGridWeek' || view === 'dayGridMonth') {
      return (
        <div className="flex items-center gap-1 px-1">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: eventInfo.event.backgroundColor }}
          />
          <span className="text-xs">
            {eventInfo.timeText && <span className="font-medium">{eventInfo.timeText} </span>}
            {eventInfo.event.title}
          </span>
        </div>
      );
    }
    
    return <div>{eventInfo.event.title}</div>;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">FullCalendar Customization</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {showSettings && (
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        )}

        <CustomToolbar
          currentDate={currentDate}
          view={view}
          onNavigate={handleNavigate}
          onViewChange={handleViewChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {view === 'customYear' ? (
              <CustomYearView
                currentDate={currentDate}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            ) : (
              <div className="fc-custom-wrapper">
                <style>{`
                  .fc-custom-wrapper .fc-event {
                    background-color: transparent !important;
                    border: none !important;
                    color: hsl(var(--foreground)) !important;
                  }
                  .fc-custom-wrapper .fc-h-event {
                    background-color: transparent !important;
                  }
                  .fc-custom-wrapper .fc-daygrid-event {
                    background-color: transparent !important;
                  }
                  .fc-custom-wrapper .fc-timegrid-event {
                    background-color: transparent !important;
                  }
                  .fc-toolbar {
                    display: none !important;
                  }
                `}</style>
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
                  initialView={view}
                  initialDate={currentDate}
                  headerToolbar={false}
                  events={events.map(e => ({
                    id: e.id,
                    title: e.title,
                    start: e.start,
                    end: e.end,
                    backgroundColor: e.color,
                    borderColor: e.color,
                  }))}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  height="auto"
                  eventClick={handleEventClick}
                  dateClick={handleDateClick}
                  eventContent={renderEventContent}
                />
              </div>
            )}
          </div>

          {shouldShowNavigator() && (
            <div className="space-y-4">
              <FruitDisplay fruit={currentFruit} />
              <TwoMonthNavigator
                currentDate={navigatorDate}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                onMonthChange={(direction) => {
                  const newDate = new Date(navigatorDate);
                  newDate.setMonth(navigatorDate.getMonth() + (direction === 'next' ? 1 : -1));
                  setNavigatorDate(newDate);
                }}
                showWeekNumbers={settings.weekNumbers}
                showWeekdayInitials={settings.weekdayInitials}
              />
            </div>
          )}
        </div>

        <EventModal
          isOpen={eventModalOpen}
          onClose={() => {
            setEventModalOpen(false);
            setSelectedEvent(null);
          }}
          onSave={handleEventSave}
          event={selectedEvent}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default Index;

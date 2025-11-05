export interface CalendarEvent {
  id: string;
  uid: number;
  title: string;
  category?: string;
  start: Date;
  end: Date;
  color: string;
  photo?: string;
  url?: string;
}

export interface FruitImage {
  id: number;
  name: string;
  image: string;
  description?: string;
  url?: string;
}

export interface CalendarSettings {
  loggedIn: boolean;
  uid: number;
  weekNumbers: boolean;
  weekdayInitials: boolean;
  dayNavigator: boolean;
  weekNavigator: boolean;
  monthNavigator: boolean;
  yearNavigator: boolean;
}

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'multiMonthYear' | 'customYear';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CalendarEvent } from '@/types/calendar';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => void;
  event?: CalendarEvent | null;
  selectedDate?: Date;
}

const EventModal = ({ isOpen, onClose, onSave, event, selectedDate }: EventModalProps) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    category: '',
    start: new Date(),
    end: new Date(),
    color: '#3B82F6',
    photo: '',
    url: '',
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (selectedDate) {
      const start = new Date(selectedDate);
      start.setHours(9, 0, 0, 0);
      const end = new Date(selectedDate);
      end.setHours(10, 0, 0, 0);
      setFormData({
        title: '',
        category: '',
        start,
        end,
        color: '#3B82F6',
        photo: '',
        url: '',
      });
    }
  }, [event, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Meeting">Meeting</SelectItem>
                <SelectItem value="Phone Call">Phone Call</SelectItem>
                <SelectItem value="Appointment">Appointment</SelectItem>
                <SelectItem value="Alarm">Alarm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start">Start</Label>
              <Input
                id="start"
                type="datetime-local"
                value={formData.start ? formatDateTimeLocal(new Date(formData.start)) : ''}
                onChange={(e) => setFormData({ ...formData, start: new Date(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="end">End</Label>
              <Input
                id="end"
                type="datetime-local"
                value={formData.end ? formatDateTimeLocal(new Date(formData.end)) : ''}
                onChange={(e) => setFormData({ ...formData, end: new Date(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="#3B82F6"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="photo">Photo URL (Optional)</Label>
            <Input
              id="photo"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="url">Link URL (Optional)</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {event ? 'Update' : 'Create'} Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;

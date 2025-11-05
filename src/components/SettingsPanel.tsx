import { CalendarSettings } from '@/types/calendar';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onSettingsChange: (settings: CalendarSettings) => void;
}

const SettingsPanel = ({ settings, onSettingsChange }: SettingsPanelProps) => {
  const updateSetting = (key: keyof CalendarSettings, value: boolean | number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="loggedIn">Logged In (Save to Storage)</Label>
          <Switch
            id="loggedIn"
            checked={settings.loggedIn}
            onCheckedChange={(checked) => updateSetting('loggedIn', checked)}
          />
        </div>

        <div>
          <Label htmlFor="uid">User ID</Label>
          <Input
            id="uid"
            type="number"
            value={settings.uid}
            onChange={(e) => updateSetting('uid', parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="weekNumbers">Show Week Numbers</Label>
          <Switch
            id="weekNumbers"
            checked={settings.weekNumbers}
            onCheckedChange={(checked) => updateSetting('weekNumbers', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="weekdayInitials">Show Weekday Initials</Label>
          <Switch
            id="weekdayInitials"
            checked={settings.weekdayInitials}
            onCheckedChange={(checked) => updateSetting('weekdayInitials', checked)}
          />
        </div>

        <div className="border-t pt-4 space-y-3">
          <p className="text-sm font-medium">2-Month Navigator Display</p>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="dayNavigator">Day View</Label>
            <Switch
              id="dayNavigator"
              checked={settings.dayNavigator}
              onCheckedChange={(checked) => updateSetting('dayNavigator', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="weekNavigator">Week View</Label>
            <Switch
              id="weekNavigator"
              checked={settings.weekNavigator}
              onCheckedChange={(checked) => updateSetting('weekNavigator', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="monthNavigator">Month View</Label>
            <Switch
              id="monthNavigator"
              checked={settings.monthNavigator}
              onCheckedChange={(checked) => updateSetting('monthNavigator', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="yearNavigator">Year View</Label>
            <Switch
              id="yearNavigator"
              checked={settings.yearNavigator}
              onCheckedChange={(checked) => updateSetting('yearNavigator', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;

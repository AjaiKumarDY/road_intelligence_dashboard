import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const NetworkControlBar = ({ onZoneChange, onTimeRangeChange, onAlertFilterChange, onAutoRefreshToggle }) => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('15min');
  const [selectedAlertFilter, setSelectedAlertFilter] = useState('all');
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);

  const zoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'downtown', label: 'Downtown District' },
    { value: 'highway', label: 'Highway Network' },
    { value: 'suburban', label: 'Suburban Areas' },
    { value: 'industrial', label: 'Industrial Zone' },
    { value: 'airport', label: 'Airport Corridor' }
  ];

  const timeRangeOptions = [
    { value: '15min', label: 'Last 15 minutes' },
    { value: '1hr', label: 'Last 1 hour' },
    { value: '4hr', label: 'Last 4 hours' },
    { value: '12hr', label: 'Last 12 hours' },
    { value: '24hr', label: 'Last 24 hours' }
  ];

  const alertFilterOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleZoneChange = (value) => {
    setSelectedZone(value);
    onZoneChange?.(value);
  };

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleAlertFilterChange = (value) => {
    setSelectedAlertFilter(value);
    onAlertFilterChange?.(value);
  };

  const handleAutoRefreshToggle = () => {
    const newState = !autoRefreshEnabled;
    setAutoRefreshEnabled(newState);
    onAutoRefreshToggle?.(newState);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Zone Selector */}
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <Select
              options={zoneOptions}
              value={selectedZone}
              onChange={handleZoneChange}
              placeholder="Select Zone"
              className="min-w-48"
            />
          </div>

          {/* Time Range Picker */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <Select
              options={timeRangeOptions}
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
              placeholder="Time Range"
              className="min-w-40"
            />
          </div>

          {/* Alert Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <Select
              options={alertFilterOptions}
              value={selectedAlertFilter}
              onChange={handleAlertFilterChange}
              placeholder="Filter Alerts"
              className="min-w-36"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auto Refresh Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefreshEnabled ? "default" : "outline"}
              onClick={handleAutoRefreshToggle}
              iconName={autoRefreshEnabled ? "Play" : "Pause"}
              iconPosition="left"
              size="sm"
            >
              Auto Refresh
            </Button>
            <span className="text-xs text-muted-foreground font-data">
              {autoRefreshEnabled ? '1min' : 'OFF'}
            </span>
          </div>

          {/* Manual Refresh */}
          <Button
            variant="ghost"
            iconName="RefreshCw"
            size="sm"
            onClick={() => window.location?.reload()}
          >
            Refresh
          </Button>

          {/* Export Data */}
          <Button
            variant="outline"
            iconName="Download"
            size="sm"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkControlBar;
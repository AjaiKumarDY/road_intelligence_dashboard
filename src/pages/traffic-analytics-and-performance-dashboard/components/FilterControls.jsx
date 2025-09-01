import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  dateRange, 
  onDateRangeChange, 
  selectedSegments, 
  onSegmentChange, 
  granularity, 
  onGranularityChange,
  onExport 
}) => {
  const datePresets = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const roadSegments = [
    { id: 'highway-101', name: 'Highway 101', type: 'highway' },
    { id: 'interstate-95', name: 'Interstate 95', type: 'interstate' },
    { id: 'route-66', name: 'Route 66', type: 'highway' },
    { id: 'main-street', name: 'Main Street', type: 'arterial' },
    { id: 'broadway', name: 'Broadway Ave', type: 'arterial' },
    { id: 'oak-street', name: 'Oak Street', type: 'local' }
  ];

  const granularityOptions = [
    { value: 'hourly', label: 'Hourly', icon: 'Clock' },
    { value: 'daily', label: 'Daily', icon: 'Calendar' },
    { value: 'weekly', label: 'Weekly', icon: 'CalendarDays' }
  ];

  const handleSegmentToggle = (segmentId) => {
    const updatedSegments = selectedSegments?.includes(segmentId)
      ? selectedSegments?.filter(id => id !== segmentId)
      : [...selectedSegments, segmentId];
    onSegmentChange(updatedSegments);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-foreground">Date Range:</label>
              <select 
                value={dateRange}
                onChange={(e) => onDateRangeChange(e?.target?.value)}
                className="bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {datePresets?.map(preset => (
                  <option key={preset?.value} value={preset?.value}>{preset?.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Granularity Selector */}
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-foreground">Granularity:</label>
              <div className="flex bg-surface rounded-lg p-1">
                {granularityOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => onGranularityChange(option?.value)}
                    className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
                      granularity === option?.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={12} />
                    <span>{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150"
        >
          <Icon name="Download" size={16} />
          <span className="text-sm font-medium">Export Data</span>
        </button>
      </div>
      {/* Road Segments Multi-Select */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Route" size={16} className="text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">Road Segments:</label>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {roadSegments?.map((segment) => (
            <div
              key={segment?.id}
              onClick={() => handleSegmentToggle(segment?.id)}
              className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedSegments?.includes(segment?.id)
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-surface hover:bg-muted/50 text-foreground'
              }`}
            >
              <div className={`flex items-center justify-center w-4 h-4 border rounded ${
                selectedSegments?.includes(segment?.id)
                  ? 'border-primary bg-primary' :'border-border bg-background'
              }`}>
                {selectedSegments?.includes(segment?.id) && (
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{segment?.name}</div>
                <div className="text-xs opacity-70 capitalize">{segment?.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            {selectedSegments?.length} of {roadSegments?.length} segments selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => onSegmentChange(roadSegments?.map(s => s?.id))}
              className="text-xs text-primary hover:text-primary/80 transition-colors duration-150"
            >
              Select All
            </button>
            <span className="text-xs text-muted-foreground">|</span>
            <button
              onClick={() => onSegmentChange([])}
              className="text-xs text-primary hover:text-primary/80 transition-colors duration-150"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenanceGanttChart = ({ scheduleData }) => {
  const [viewMode, setViewMode] = useState('month');
  const [selectedProject, setSelectedProject] = useState(null);

  const viewModes = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' }
  ];

  const getProjectColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-primary';
      case 'scheduled': return 'bg-warning';
      case 'delayed': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getResourceConflictIndicator = (hasConflict) => {
    if (hasConflict) {
      return (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-background">
          <div className="absolute inset-0 bg-error rounded-full animate-ping"></div>
        </div>
      );
    }
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimelineHeaders = () => {
    const headers = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      headers?.push(date?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
    }
    
    return headers;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Maintenance Schedule Timeline</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" iconName="Calendar">
              Add Schedule
            </Button>
            <Button variant="ghost" iconName="Download">
              Export
            </Button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.id}
                onClick={() => setViewMode(mode?.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === mode?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode?.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Resource Conflict</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">In Progress</span>
            </div>
          </div>
        </div>
      </div>
      {/* Gantt Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Timeline Header */}
          <div className="flex border-b border-border bg-surface">
            <div className="w-64 p-3 border-r border-border">
              <span className="text-sm font-medium text-muted-foreground">Project</span>
            </div>
            <div className="flex-1 flex">
              {getTimelineHeaders()?.map((header, index) => (
                <div key={index} className="flex-1 p-3 border-r border-border text-center">
                  <span className="text-sm font-medium text-muted-foreground">{header}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Rows */}
          <div className="divide-y divide-border">
            {scheduleData?.map((project) => (
              <div
                key={project?.id}
                className={`flex hover:bg-muted/50 transition-colors ${
                  selectedProject === project?.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => setSelectedProject(selectedProject === project?.id ? null : project?.id)}
              >
                {/* Project Info */}
                <div className="w-64 p-3 border-r border-border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getProjectColor(project?.status)}`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {project?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {project?.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex-1 relative">
                  <div className="h-full flex">
                    {getTimelineHeaders()?.map((_, index) => (
                      <div key={index} className="flex-1 border-r border-border relative">
                        {/* Project Bar */}
                        {index >= 1 && index <= 4 && (
                          <div className="absolute top-1/2 transform -translate-y-1/2 mx-2">
                            <div
                              className={`h-6 rounded relative ${getProjectColor(project?.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                              style={{
                                width: `${Math.min(100, (project?.progress || 0))}%`
                              }}
                            >
                              {getResourceConflictIndicator(project?.hasResourceConflict)}
                              
                              {/* Progress Text */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-medium text-white">
                                  {project?.progress || 0}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Selected Project Details */}
      {selectedProject && (
        <div className="p-4 border-t border-border bg-surface">
          {(() => {
            const project = scheduleData?.find(p => p?.id === selectedProject);
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{project?.name}</h4>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{formatDate(project?.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium text-foreground">{formatDate(project?.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium text-foreground">${project?.budget?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Team Lead</p>
                    <p className="font-medium text-foreground">{project?.teamLead}</p>
                  </div>
                </div>
                {project?.hasResourceConflict && (
                  <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
                    <Icon name="AlertTriangle" size={16} className="text-error" />
                    <span className="text-sm text-error font-medium">
                      Resource conflict detected with overlapping projects
                    </span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default MaintenanceGanttChart;
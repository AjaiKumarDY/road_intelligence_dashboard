import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenancePriorityQueue = ({ tasks }) => {
  const [filter, setFilter] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);

  const filters = [
    { id: 'all', label: 'All Tasks', count: tasks?.length },
    { id: 'overdue', label: 'Overdue', count: tasks?.filter(t => t?.status === 'overdue')?.length },
    { id: 'scheduled', label: 'Scheduled', count: tasks?.filter(t => t?.status === 'scheduled')?.length },
    { id: 'in-progress', label: 'In Progress', count: tasks?.filter(t => t?.status === 'in-progress')?.length }
  ];

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks?.filter(task => task?.status === filter);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'overdue': { color: 'bg-error text-error-foreground', label: 'Overdue' },
      'scheduled': { color: 'bg-primary text-primary-foreground', label: 'Scheduled' },
      'in-progress': { color: 'bg-warning text-warning-foreground', label: 'In Progress' },
      'completed': { color: 'bg-success text-success-foreground', label: 'Completed' }
    };

    const config = statusConfig?.[status] || statusConfig?.scheduled;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Maintenance Priority Queue</h3>
          <Button variant="ghost" iconName="Plus" iconPosition="left">
            Add Task
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filters?.map((filterOption) => (
            <button
              key={filterOption?.id}
              onClick={() => setFilter(filterOption?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === filterOption?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{filterOption?.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                filter === filterOption?.id
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-background text-muted-foreground'
              }`}>
                {filterOption?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Task List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTasks?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No tasks found for the selected filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredTasks?.map((task) => (
              <div key={task?.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon 
                        name={getPriorityIcon(task?.priority)} 
                        size={16} 
                        className={getPriorityColor(task?.priority)} 
                      />
                      <h4 className="font-medium text-foreground">{task?.title}</h4>
                      {getStatusBadge(task?.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{task?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{task?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{formatDate(task?.scheduledDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{task?.assignedTo}</span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedTask === task?.id && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Estimated Cost</p>
                            <p className="font-medium text-foreground">${task?.estimatedCost?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium text-foreground">{task?.estimatedDuration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Resources Required</p>
                            <p className="font-medium text-foreground">{task?.resourcesRequired?.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Inspection</p>
                            <p className="font-medium text-foreground">{formatDate(task?.lastInspection)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedTask(expandedTask === task?.id ? null : task?.id)}
                      iconName={expandedTask === task?.id ? "ChevronUp" : "ChevronDown"}
                    />
                    <Button variant="ghost" iconName="MoreVertical" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenancePriorityQueue;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAlertFeed = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  // Mock alert data
  const mockAlerts = [
    {
      id: 'ALT-001',
      severity: 'critical',
      type: 'accident',
      title: 'Multi-Vehicle Accident',
      location: 'I-95 Northbound, Mile 42',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      assignedTo: 'Unit-7',
      description: 'Three-car collision blocking two lanes. Emergency services en route.',
      estimatedClearTime: '45 min'
    },
    {
      id: 'ALT-002',
      severity: 'high',
      type: 'construction',
      title: 'Emergency Road Repair',
      location: 'Main St & 5th Ave',
      timestamp: new Date(Date.now() - 900000),
      status: 'in-progress',
      assignedTo: 'Crew-3',
      description: 'Water main break causing road surface damage. Lane closure required.',
      estimatedClearTime: '2 hours'
    },
    {
      id: 'ALT-003',
      severity: 'medium',
      type: 'weather',
      title: 'Heavy Rain Advisory',
      location: 'Downtown District',
      timestamp: new Date(Date.now() - 1800000),
      status: 'monitoring',
      assignedTo: 'Weather-Team',
      description: 'Reduced visibility and potential flooding in low-lying areas.',
      estimatedClearTime: '1 hour'
    },
    {
      id: 'ALT-004',
      severity: 'low',
      type: 'maintenance',
      title: 'Scheduled Sensor Maintenance',
      location: 'Highway 101, Sensor Grid 7',
      timestamp: new Date(Date.now() - 3600000),
      status: 'scheduled',
      assignedTo: 'Tech-2',
      description: 'Routine calibration of traffic monitoring sensors.',
      estimatedClearTime: '30 min'
    },
    {
      id: 'ALT-005',
      severity: 'high',
      type: 'traffic',
      title: 'Severe Congestion',
      location: 'Bridge District',
      timestamp: new Date(Date.now() - 600000),
      status: 'active',
      assignedTo: 'Traffic-Control',
      description: 'Unusual traffic buildup causing 20+ minute delays.',
      estimatedClearTime: '1.5 hours'
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'high': return 'bg-warning/10 border-warning/20';
      case 'medium': return 'bg-primary/10 border-primary/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'accident': return 'Car';
      case 'construction': return 'Construction';
      case 'weather': return 'Cloud';
      case 'maintenance': return 'Settings';
      case 'traffic': return 'Traffic';
      default: return 'AlertTriangle';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'AlertCircle';
      case 'in-progress': return 'Clock';
      case 'monitoring': return 'Eye';
      case 'scheduled': return 'Calendar';
      default: return 'Info';
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === filter);

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp?.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Live Alert Feed</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground font-data">Live</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1 mt-3">
          {['all', 'critical', 'high', 'medium', 'low']?.map((severity) => (
            <Button
              key={severity}
              variant={filter === severity ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(severity)}
              className="text-xs capitalize"
            >
              {severity}
            </Button>
          ))}
        </div>
      </div>
      {/* Alert List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-muted-foreground">No alerts matching current filter</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-3 rounded-lg border ${getSeverityBg(alert?.severity)} hover:bg-opacity-20 transition-colors duration-150`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-1 rounded ${getSeverityBg(alert?.severity)}`}>
                      <Icon 
                        name={getTypeIcon(alert?.type)} 
                        size={16} 
                        className={getSeverityColor(alert?.severity)} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {alert?.title}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityBg(alert?.severity)} ${getSeverityColor(alert?.severity)}`}>
                          {alert?.severity?.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {alert?.location}
                      </p>
                      
                      <p className="text-xs text-foreground mb-2 line-clamp-2">
                        {alert?.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name={getStatusIcon(alert?.status)} size={12} />
                            <span className="capitalize">{alert?.status}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={12} />
                            <span>{alert?.assignedTo}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={12} />
                            <span>ETC: {alert?.estimatedClearTime}</span>
                          </div>
                        </div>
                        <span className="font-data">
                          {formatTimeAgo(alert?.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="MessageSquare" />
                    <Button variant="ghost" size="sm" iconName="MoreVertical" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filteredAlerts?.length} of {alerts?.length} alerts</span>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh Feed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveAlertFeed;
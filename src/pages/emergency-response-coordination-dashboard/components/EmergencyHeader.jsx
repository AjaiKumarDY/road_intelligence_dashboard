import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertLevel, setAlertLevel] = useState('moderate');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const emergencyStats = {
    activeIncidents: 7,
    avgResponseTime: "4.2 min",
    availableUnits: 23,
    criticalAlerts: 2
  };

  const getAlertLevelColor = () => {
    switch (alertLevel) {
      case 'low': return 'bg-success text-success-foreground';
      case 'moderate': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertLevelIcon = () => {
    switch (alertLevel) {
      case 'low': return 'CheckCircle';
      case 'moderate': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Emergency Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getAlertLevelColor()}`}>
              <Icon name={getAlertLevelIcon()} size={24} />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Emergency Response Center
              </h2>
              <p className="text-sm text-muted-foreground">
                Alert Level: <span className="font-medium capitalize">{alertLevel}</span>
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-error" />
              <div>
                <p className="text-2xl font-bold text-foreground">{emergencyStats?.activeIncidents}</p>
                <p className="text-xs text-muted-foreground">Active Incidents</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <div>
                <p className="text-2xl font-bold text-foreground">{emergencyStats?.avgResponseTime}</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">{emergencyStats?.availableUnits}</p>
                <p className="text-xs text-muted-foreground">Available Units</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={20} className="text-error animate-pulse-alert" />
              <div>
                <p className="text-2xl font-bold text-foreground">{emergencyStats?.criticalAlerts}</p>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Time and Controls */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-lg font-data font-bold text-foreground">
              {currentTime?.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentTime?.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAlertLevel(alertLevel === 'high' ? 'low' : 'high')}
              className="flex items-center justify-center w-10 h-10 bg-surface hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <Icon name="Settings" size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHeader;
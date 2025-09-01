import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkKPICard = ({ title, value, unit, status, trend, trendValue, icon, description }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'excellent': return 'bg-success/10';
      case 'good': return 'bg-primary/10';
      case 'warning': return 'bg-warning/10';
      case 'critical': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up' && (title?.includes('Score') || title?.includes('Flow'))) return 'text-success';
    if (trend === 'up') return 'text-error';
    if (trend === 'down' && (title?.includes('Incidents') || title?.includes('Response'))) return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${getStatusBgColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getStatusBgColor()}`}>
            <Icon name={icon} size={20} className={getStatusColor()} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={getTrendIcon()} size={14} className={getTrendColor()} />
          <span className={`text-xs font-data ${getTrendColor()}`}>
            {trendValue}
          </span>
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className={`text-2xl font-bold ${getStatusColor()}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground font-data">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBgColor()} ${getStatusColor()}`}>
          {status?.toUpperCase()}
        </span>
        <span className="text-xs text-muted-foreground font-data">
          Last updated: {new Date()?.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};

export default NetworkKPICard;
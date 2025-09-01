import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, unit, change, changeType, icon, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
};

export default MetricsCard;
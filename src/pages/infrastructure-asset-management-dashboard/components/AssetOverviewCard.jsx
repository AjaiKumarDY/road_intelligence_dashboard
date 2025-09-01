import React from 'react';
import Icon from '../../../components/AppIcon';

const AssetOverviewCard = ({ title, value, change, changeType, icon, color }) => {
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
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default AssetOverviewCard;
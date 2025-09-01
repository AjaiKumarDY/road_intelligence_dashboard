import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AssetConditionMatrix = ({ conditionData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedAssetType, setSelectedAssetType] = useState('all');

  const timeframes = [
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' },
    { id: '2years', label: '2 Years' }
  ];

  const assetTypes = [
    { id: 'all', label: 'All Assets' },
    { id: 'bridges', label: 'Bridges' },
    { id: 'roads', label: 'Roads' },
    { id: 'signals', label: 'Traffic Signals' },
    { id: 'signs', label: 'Road Signs' }
  ];

  const getConditionColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    if (score >= 40) return 'bg-error';
    return 'bg-destructive';
  };

  const getConditionIntensity = (score) => {
    const opacity = Math.max(0.3, score / 100);
    return { opacity };
  };

  const getPredictiveRecommendation = (trend) => {
    if (trend === 'declining') {
      return {
        icon: 'TrendingDown',
        text: 'Schedule preventive maintenance',
        color: 'text-warning'
      };
    } else if (trend === 'critical') {
      return {
        icon: 'AlertTriangle',
        text: 'Immediate attention required',
        color: 'text-error'
      };
    } else {
      return {
        icon: 'TrendingUp',
        text: 'Condition stable',
        color: 'text-success'
      };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Asset Condition Matrix</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-muted-foreground">Timeframe:</label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {timeframes?.map((timeframe) => (
                <option key={timeframe?.id} value={timeframe?.id}>
                  {timeframe?.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-muted-foreground">Asset Type:</label>
            <select
              value={selectedAssetType}
              onChange={(e) => setSelectedAssetType(e?.target?.value)}
              className="px-3 py-1 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {assetTypes?.map((type) => (
                <option key={type?.id} value={type?.id}>
                  {type?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Matrix Grid */}
      <div className="p-4">
        <div className="grid grid-cols-12 gap-1 mb-4">
          {/* Month Headers */}
          <div className="col-span-2"></div>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']?.map((month) => (
            <div key={month} className="text-center text-xs font-medium text-muted-foreground py-2">
              {month}
            </div>
          ))}

          {/* Asset Rows */}
          {conditionData?.map((asset, assetIndex) => (
            <React.Fragment key={asset?.id}>
              <div className="col-span-2 flex items-center py-2 pr-2">
                <div className="text-sm font-medium text-foreground truncate">
                  {asset?.name}
                </div>
              </div>
              {asset?.monthlyScores?.map((score, monthIndex) => (
                <div
                  key={`${asset?.id}-${monthIndex}`}
                  className="aspect-square relative group cursor-pointer"
                >
                  <div
                    className={`w-full h-full rounded ${getConditionColor(score)} hover:scale-110 transition-transform`}
                    style={getConditionIntensity(score)}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      Score: {score}/100
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-muted-foreground">Condition Score:</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-success"></div>
              <span className="text-xs text-muted-foreground">80-100</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-warning"></div>
              <span className="text-xs text-muted-foreground">60-79</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-error"></div>
              <span className="text-xs text-muted-foreground">40-59</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-destructive"></div>
              <span className="text-xs text-muted-foreground">&lt;40</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
      {/* Predictive Recommendations */}
      <div className="p-4 border-t border-border bg-surface">
        <h4 className="text-sm font-semibold text-foreground mb-3">Predictive Maintenance Recommendations</h4>
        <div className="space-y-2">
          {conditionData?.slice(0, 3)?.map((asset) => {
            const recommendation = getPredictiveRecommendation(asset?.trend);
            return (
              <div key={asset?.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={recommendation?.icon} 
                    size={16} 
                    className={recommendation?.color} 
                  />
                  <span className="text-sm text-foreground">{asset?.name}</span>
                </div>
                <span className={`text-sm ${recommendation?.color}`}>
                  {recommendation?.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssetConditionMatrix;
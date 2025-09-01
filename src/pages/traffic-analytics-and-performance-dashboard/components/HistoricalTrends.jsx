import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const HistoricalTrends = ({ data, selectedMetric, onMetricChange, forecastEnabled, onForecastToggle }) => {
  const metrics = [
    { value: 'volume', label: 'Traffic Volume', color: 'var(--color-primary)', icon: 'BarChart3' },
    { value: 'speed', label: 'Average Speed', color: 'var(--color-success)', icon: 'Gauge' },
    { value: 'incidents', label: 'Safety Incidents', color: 'var(--color-error)', icon: 'AlertTriangle' },
    { value: 'efficiency', label: 'Network Efficiency', color: 'var(--color-accent)', icon: 'TrendingUp' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${getMetricUnit(entry?.dataKey)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getMetricUnit = (metric) => {
    switch (metric) {
      case 'volume': return ' vehicles';
      case 'speed': return ' mph';
      case 'incidents': return ' incidents';
      case 'efficiency': return '%';
      default: return '';
    }
  };

  const selectedMetricData = metrics?.find(m => m?.value === selectedMetric);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Historical Trend Analysis</h3>
          <p className="text-sm text-muted-foreground">Long-term patterns with seasonal highlighting</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Metric:</label>
            <select 
              value={selectedMetric}
              onChange={(e) => onMetricChange(e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {metrics?.map(metric => (
                <option key={metric?.value} value={metric?.value}>{metric?.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="forecast"
              checked={forecastEnabled}
              onChange={(e) => onForecastToggle(e?.target?.checked)}
              className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring focus:ring-2"
            />
            <label htmlFor="forecast" className="text-sm text-muted-foreground">
              Show Forecast
            </label>
          </div>
        </div>
      </div>
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedMetricData?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={selectedMetricData?.color} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="period" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetricData?.color}
              fillOpacity={1}
              fill="url(#colorMetric)"
              strokeWidth={2}
              name={`${selectedMetricData?.label} (Historical)`}
            />
            {forecastEnabled && (
              <Area
                type="monotone"
                dataKey={`${selectedMetric}Forecast`}
                stroke="var(--color-warning)"
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorForecast)"
                strokeWidth={2}
                name={`${selectedMetricData?.label} (Forecast)`}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics?.map((metric) => (
          <div 
            key={metric?.value}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedMetric === metric?.value 
                ? 'border-primary bg-primary/5' :'border-border bg-surface hover:bg-muted/50'
            }`}
            onClick={() => onMetricChange(metric?.value)}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                selectedMetric === metric?.value ? 'bg-primary/20' : 'bg-muted'
              }`}>
                <Icon 
                  name={metric?.icon} 
                  size={16} 
                  className={selectedMetric === metric?.value ? 'text-primary' : 'text-muted-foreground'}
                />
              </div>
              <span className={`text-sm font-medium ${
                selectedMetric === metric?.value ? 'text-primary' : 'text-foreground'
              }`}>
                {metric?.label}
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {selectedMetric === metric?.value ? 'Currently selected' : 'Click to view trend'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalTrends;
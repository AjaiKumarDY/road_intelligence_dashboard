import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ResponseAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('response-time');
  const [timeRange, setTimeRange] = useState('24h');

  const responseTimeData = [
    { hour: '00:00', avgTime: 4.2, incidents: 3 },
    { hour: '02:00', avgTime: 3.8, incidents: 1 },
    { hour: '04:00', avgTime: 3.5, incidents: 2 },
    { hour: '06:00', avgTime: 5.1, incidents: 8 },
    { hour: '08:00', avgTime: 6.8, incidents: 12 },
    { hour: '10:00', avgTime: 5.9, incidents: 9 },
    { hour: '12:00', avgTime: 7.2, incidents: 15 },
    { hour: '14:00', avgTime: 6.5, incidents: 11 },
    { hour: '16:00', avgTime: 8.1, incidents: 18 },
    { hour: '18:00', avgTime: 7.8, incidents: 16 },
    { hour: '20:00', avgTime: 6.2, incidents: 10 },
    { hour: '22:00', avgTime: 5.4, incidents: 7 }
  ];

  const incidentTypeData = [
    { name: 'Accidents', value: 45, color: '#EF4444' },
    { name: 'Road Work', value: 25, color: '#F59E0B' },
    { name: 'Weather', value: 15, color: '#10B981' },
    { name: 'Mechanical', value: 10, color: '#3B82F6' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const performanceMetrics = [
    {
      id: 'avg-response',
      label: 'Avg Response Time',
      value: '5.2 min',
      change: '-12%',
      trend: 'down',
      icon: 'Clock',
      color: 'text-success'
    },
    {
      id: 'resolution-rate',
      label: 'Resolution Rate',
      value: '94.2%',
      change: '+3%',
      trend: 'up',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 'resource-utilization',
      label: 'Resource Utilization',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: 'Users',
      color: 'text-warning'
    },
    {
      id: 'incidents-today',
      label: 'Incidents Today',
      value: '127',
      change: '-8%',
      trend: 'down',
      icon: 'AlertTriangle',
      color: 'text-success'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend, change) => {
    if (trend === 'up') {
      return change?.startsWith('+') ? 'text-success' : 'text-error';
    } else {
      return change?.startsWith('-') ? 'text-success' : 'text-error';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{`Time: ${label}`}</p>
          <p className="text-sm text-muted-foreground">
            {`Avg Response: ${payload?.[0]?.value} min`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Incidents: ${payload?.[0]?.payload?.incidents}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Response Analytics
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-1 text-sm bg-surface border border-border rounded-md text-foreground"
          >
            <option value="response-time">Response Time</option>
            <option value="incident-types">Incident Types</option>
            <option value="performance">Performance</option>
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1 text-sm bg-surface border border-border rounded-md text-foreground"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>
      {/* Performance Metrics Grid */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics?.map((metric) => (
            <div key={metric?.id} className="p-3 bg-surface rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon name={metric?.icon} size={20} className={metric?.color} />
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(metric?.trend)} 
                    size={14} 
                    className={getTrendColor(metric?.trend, metric?.change)} 
                  />
                  <span className={`text-xs font-medium ${getTrendColor(metric?.trend, metric?.change)}`}>
                    {metric?.change}
                  </span>
                </div>
              </div>
              <p className="text-lg font-bold text-foreground">{metric?.value}</p>
              <p className="text-xs text-muted-foreground">{metric?.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Charts */}
      <div className="flex-1 p-4">
        {selectedMetric === 'response-time' && (
          <div className="h-full">
            <h4 className="text-sm font-medium text-foreground mb-4">
              Average Response Time by Hour
            </h4>
            <div className="w-full h-64" aria-label="Response Time Chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedMetric === 'incident-types' && (
          <div className="h-full">
            <h4 className="text-sm font-medium text-foreground mb-4">
              Incident Distribution by Type
            </h4>
            <div className="w-full h-64" aria-label="Incident Types Chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incidentTypeData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      color: 'var(--color-foreground)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {incidentTypeData?.map((item) => (
                <div key={item?.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {item?.name} ({item?.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedMetric === 'performance' && (
          <div className="h-full">
            <h4 className="text-sm font-medium text-foreground mb-4">
              Daily Incident Volume
            </h4>
            <div className="w-full h-64" aria-label="Performance Chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'Incidents']}
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      color: 'var(--color-foreground)'
                    }}
                  />
                  <Bar 
                    dataKey="incidents" 
                    fill="var(--color-primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <span className="text-sm text-muted-foreground">
          Data updated 2 minutes ago
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm bg-surface border border-border rounded-md hover:bg-muted transition-colors duration-200">
            <Icon name="Download" size={14} className="mr-1" />
            Export
          </button>
          <button className="px-3 py-1 text-sm bg-surface border border-border rounded-md hover:bg-muted transition-colors duration-200">
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseAnalytics;
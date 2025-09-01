import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComparativeAnalysis = ({ data, comparisonMode, onModeChange }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${entry?.dataKey?.includes('efficiency') ? '%' : ' vehicles'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Comparative Performance Analysis</h3>
          <p className="text-sm text-muted-foreground">Side-by-side road segment comparison</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-surface rounded-lg p-1">
            <button
              onClick={() => onModeChange('period')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
                comparisonMode === 'period' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Period-over-Period
            </button>
            <button
              onClick={() => onModeChange('year')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
                comparisonMode === 'year' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Year-over-Year
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span>Traffic Volume Comparison</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="segment" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="currentVolume" 
                  fill="var(--color-primary)" 
                  name="Current Period"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="previousVolume" 
                  fill="var(--color-secondary)" 
                  name="Previous Period"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Gauge" size={16} className="text-accent" />
            <span>Efficiency Comparison</span>
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="segment" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="currentEfficiency" 
                  fill="var(--color-accent)" 
                  name="Current Efficiency"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="previousEfficiency" 
                  fill="var(--color-warning)" 
                  name="Previous Efficiency"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.slice(0, 3)?.map((segment) => (
          <div key={segment?.segment} className="bg-surface rounded-lg p-4">
            <h5 className="text-sm font-medium text-foreground mb-3">{segment?.segment}</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Volume Change</span>
                <span className={`text-xs font-medium ${
                  segment?.volumeChange > 0 ? 'text-success' : 'text-error'
                }`}>
                  {segment?.volumeChange > 0 ? '+' : ''}{segment?.volumeChange}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Efficiency Change</span>
                <span className={`text-xs font-medium ${
                  segment?.efficiencyChange > 0 ? 'text-success' : 'text-error'
                }`}>
                  {segment?.efficiencyChange > 0 ? '+' : ''}{segment?.efficiencyChange}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Avg Speed</span>
                <span className="text-xs font-medium text-foreground">{segment?.avgSpeed} mph</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
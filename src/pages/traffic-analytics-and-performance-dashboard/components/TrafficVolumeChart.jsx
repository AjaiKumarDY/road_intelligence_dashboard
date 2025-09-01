import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrafficVolumeChart = ({ data, selectedSegment, onSegmentChange }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey === 'volume' ? 'Traffic Volume' : 'Congestion Level'}: ${entry?.value}${entry?.dataKey === 'volume' ? ' vehicles' : '%'}`}
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
          <h3 className="text-lg font-semibold text-foreground">Traffic Volume & Congestion Analysis</h3>
          <p className="text-sm text-muted-foreground">Real-time traffic patterns with congestion overlay</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedSegment}
            onChange={(e) => onSegmentChange(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Segments</option>
            <option value="highway-101">Highway 101</option>
            <option value="interstate-95">Interstate 95</option>
            <option value="route-66">Route 66</option>
            <option value="main-street">Main Street</option>
          </select>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="volume" 
              fill="var(--color-primary)" 
              name="Traffic Volume"
              opacity={0.8}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="congestion" 
              stroke="var(--color-warning)" 
              strokeWidth={3}
              name="Congestion Level (%)"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficVolumeChart;
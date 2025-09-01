import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostTrackingSection = ({ budgetData, roiData, costTrends }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [activeChart, setActiveChart] = useState('budget');

  const periods = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' }
  ];

  const chartTypes = [
    { id: 'budget', label: 'Budget Burn Rate', icon: 'TrendingUp' },
    { id: 'roi', label: 'ROI Analysis', icon: 'DollarSign' },
    { id: 'distribution', label: 'Cost Distribution', icon: 'PieChart' }
  ];

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1)}%`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {
                entry?.name?.includes('ROI') || entry?.name?.includes('%') 
                  ? formatPercentage(entry?.value)
                  : formatCurrency(entry?.value)
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderBudgetChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="month" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickFormatter={formatCurrency}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="budgeted" fill="#2563EB" name="Budgeted" radius={[4, 4, 0, 0]} />
        <Bar dataKey="actual" fill="#10B981" name="Actual Spend" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderROIChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={roiData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="project" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="roi" 
          stroke="#F59E0B" 
          strokeWidth={3}
          dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
          name="ROI %"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={costTrends}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {costTrends?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'budget':
        return renderBudgetChart();
      case 'roi':
        return renderROIChart();
      case 'distribution':
        return renderDistributionChart();
      default:
        return renderBudgetChart();
    }
  };

  const calculateBudgetUtilization = () => {
    const totalBudgeted = budgetData?.reduce((sum, item) => sum + item?.budgeted, 0);
    const totalSpent = budgetData?.reduce((sum, item) => sum + item?.actual, 0);
    return ((totalSpent / totalBudgeted) * 100)?.toFixed(1);
  };

  const calculateAverageROI = () => {
    const totalROI = roiData?.reduce((sum, item) => sum + item?.roi, 0);
    return (totalROI / roiData?.length)?.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Cost Tracking & ROI Analysis</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" iconName="Download">
              Export Report
            </Button>
            <Button variant="ghost" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Period Selector */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {periods?.map((period) => (
                <button
                  key={period?.id}
                  onClick={() => setSelectedPeriod(period?.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {period?.label}
                </button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {chartTypes?.map((chart) => (
                <button
                  key={chart?.id}
                  onClick={() => setActiveChart(chart?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeChart === chart?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={chart?.icon} size={16} />
                  <span>{chart?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Budget Utilization</p>
              <p className="text-lg font-bold text-foreground">{calculateBudgetUtilization()}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average ROI</p>
              <p className="text-lg font-bold text-success">{calculateAverageROI()}%</p>
            </div>
          </div>
        </div>
      </div>
      {/* Chart Area */}
      <div className="p-4">
        {renderActiveChart()}
      </div>
      {/* Summary Cards */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Budget Summary */}
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Wallet" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Budget Status</h4>
                <p className="text-sm text-muted-foreground">Current fiscal year</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(budgetData?.reduce((sum, item) => sum + item?.budgeted, 0))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(budgetData?.reduce((sum, item) => sum + item?.actual, 0))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium text-success">
                  {formatCurrency(
                    budgetData?.reduce((sum, item) => sum + item?.budgeted, 0) - 
                    budgetData?.reduce((sum, item) => sum + item?.actual, 0)
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Top Performing Projects */}
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="TrendingUp" size={20} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Top ROI Projects</h4>
                <p className="text-sm text-muted-foreground">Best performing</p>
              </div>
            </div>
            <div className="space-y-2">
              {roiData?.slice(0, 3)?.map((project, index) => (
                <div key={project?.project} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate">{project?.project}</span>
                  <span className="font-medium text-success">{formatPercentage(project?.roi)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Alerts */}
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Budget Alerts</h4>
                <p className="text-sm text-muted-foreground">Requires attention</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="AlertCircle" size={14} className="text-warning" />
                <span className="text-muted-foreground">3 projects over budget</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Clock" size={14} className="text-error" />
                <span className="text-muted-foreground">2 delayed payments</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="TrendingDown" size={14} className="text-success" />
                <span className="text-muted-foreground">15% under Q3 target</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostTrackingSection;
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NetworkKPICard from './components/NetworkKPICard';
import NetworkControlBar from './components/NetworkControlBar';
import NetworkHeatMap from './components/NetworkHeatMap';
import LiveAlertFeed from './components/LiveAlertFeed';
import IncidentManagementTable from './components/IncidentManagementTable';

const RealTimeNetworkOperationsDashboard = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('15min');
  const [alertFilter, setAlertFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: "Network Health Score",
      value: "94.2",
      unit: "%",
      status: "excellent",
      trend: "up",
      trendValue: "+2.1%",
      icon: "Activity",
      description: "Overall network performance and reliability"
    },
    {
      title: "Active Incidents",
      value: "12",
      unit: "",
      status: "warning",
      trend: "up",
      trendValue: "+3",
      icon: "AlertTriangle",
      description: "Currently reported traffic incidents"
    },
    {
      title: "Average Response Time",
      value: "4.2",
      unit: "min",
      status: "good",
      trend: "down",
      trendValue: "-0.8min",
      icon: "Clock",
      description: "Mean emergency response time"
    },
    {
      title: "Traffic Flow Index",
      value: "87.5",
      unit: "%",
      status: "good",
      trend: "up",
      trendValue: "+1.3%",
      icon: "BarChart3",
      description: "Current traffic flow efficiency"
    },
    {
      title: "Road Surface Conditions",
      value: "91.8",
      unit: "%",
      status: "excellent",
      trend: "stable",
      trendValue: "0%",
      icon: "Road",
      description: "Overall road infrastructure quality"
    },
    {
      title: "Weather Impact Rating",
      value: "2.1",
      unit: "/10",
      status: "good",
      trend: "down",
      trendValue: "-0.5",
      icon: "Cloud",
      description: "Current weather impact on traffic"
    }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
        // Here you would typically fetch fresh data
      }, 60000); // 1 minute intervals

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    // Handle zone change logic
  };

  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
    // Handle time range change logic
  };

  const handleAlertFilterChange = (filter) => {
    setAlertFilter(filter);
    // Handle alert filter change logic
  };

  const handleAutoRefreshToggle = (enabled) => {
    setAutoRefresh(enabled);
    if (enabled) {
      setLastUpdated(new Date());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-full mx-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Real-Time Network Operations Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive monitoring and incident management for road infrastructure
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <span className="font-data text-foreground">
                  {lastUpdated?.toLocaleTimeString('en-US', { 
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Network Control Bar */}
          <NetworkControlBar
            onZoneChange={handleZoneChange}
            onTimeRangeChange={handleTimeRangeChange}
            onAlertFilterChange={handleAlertFilterChange}
            onAutoRefreshToggle={handleAutoRefreshToggle}
          />

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {kpiData?.map((kpi, index) => (
              <NetworkKPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                status={kpi?.status}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                icon={kpi?.icon}
                description={kpi?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Heat Map - Takes 2/3 width on xl screens */}
            <div className="xl:col-span-2">
              <NetworkHeatMap />
            </div>

            {/* Live Alert Feed - Takes 1/3 width on xl screens */}
            <div className="xl:col-span-1">
              <LiveAlertFeed />
            </div>
          </div>

          {/* Incident Management Table */}
          <div className="mb-6">
            <IncidentManagementTable />
          </div>

          {/* Footer Status Bar */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-muted-foreground">System Status:</span>
                  <span className="text-success font-medium">Operational</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Data Sources:</span>
                  <span className="text-foreground font-data">247 Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Network Coverage:</span>
                  <span className="text-primary font-data">89.2%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>© {new Date()?.getFullYear()} Road Intelligence Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeNetworkOperationsDashboard;
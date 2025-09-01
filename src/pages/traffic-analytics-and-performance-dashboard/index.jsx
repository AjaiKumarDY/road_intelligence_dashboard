import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import TrafficVolumeChart from './components/TrafficVolumeChart';
import CongestionHotspots from './components/CongestionHotspots';
import ComparativeAnalysis from './components/ComparativeAnalysis';
import HistoricalTrends from './components/HistoricalTrends';
import FilterControls from './components/FilterControls';

const TrafficAnalyticsAndPerformanceDashboard = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedSegments, setSelectedSegments] = useState(['highway-101', 'interstate-95', 'main-street']);
  const [granularity, setGranularity] = useState('hourly');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [comparisonMode, setComparisonMode] = useState('period');
  const [selectedMetric, setSelectedMetric] = useState('volume');
  const [forecastEnabled, setForecastEnabled] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for metrics cards
  const metricsData = [
    {
      title: "Average Daily Traffic Volume",
      value: "47,832",
      unit: "vehicles",
      change: "+12.5%",
      changeType: "positive",
      icon: "BarChart3",
      description: "24-hour average across all monitored segments"
    },
    {
      title: "Peak Congestion Duration",
      value: "2.4",
      unit: "hours",
      change: "-8.2%",
      changeType: "positive",
      icon: "Clock",
      description: "Daily average of high-congestion periods"
    },
    {
      title: "Network Efficiency Score",
      value: "78.5",
      unit: "%",
      change: "+5.1%",
      changeType: "positive",
      icon: "Gauge",
      description: "Overall road network performance rating"
    },
    {
      title: "Safety Incident Rate",
      value: "0.23",
      unit: "per 1K vehicles",
      change: "-15.3%",
      changeType: "positive",
      icon: "Shield",
      description: "Incidents per thousand vehicles processed"
    }
  ];

  // Mock data for traffic volume chart
  const trafficVolumeData = [
    { time: "00:00", volume: 1200, congestion: 15 },
    { time: "02:00", volume: 800, congestion: 8 },
    { time: "04:00", volume: 600, congestion: 5 },
    { time: "06:00", volume: 3200, congestion: 45 },
    { time: "08:00", volume: 5800, congestion: 78 },
    { time: "10:00", volume: 4200, congestion: 52 },
    { time: "12:00", volume: 4800, congestion: 58 },
    { time: "14:00", volume: 4600, congestion: 55 },
    { time: "16:00", volume: 5200, congestion: 68 },
    { time: "18:00", volume: 6100, congestion: 82 },
    { time: "20:00", volume: 3800, congestion: 38 },
    { time: "22:00", volume: 2400, congestion: 25 }
  ];

  // Mock data for congestion hotspots
  const hotspotsData = [
    {
      id: 1,
      location: "Highway 101 & Interstate 95 Junction",
      severity: "critical",
      congestionLevel: 89,
      avgDelay: 12.5,
      avgSpeed: 18,
      volume: "5,240 veh/hr"
    },
    {
      id: 2,
      location: "Main Street Bridge",
      severity: "high",
      congestionLevel: 76,
      avgDelay: 8.2,
      avgSpeed: 25,
      volume: "3,890 veh/hr"
    },
    {
      id: 3,
      location: "Broadway & Oak Street",
      severity: "high",
      congestionLevel: 71,
      avgDelay: 6.8,
      avgSpeed: 28,
      volume: "2,650 veh/hr"
    },
    {
      id: 4,
      location: "Route 66 Tunnel",
      severity: "medium",
      congestionLevel: 58,
      avgDelay: 4.5,
      avgSpeed: 35,
      volume: "4,120 veh/hr"
    },
    {
      id: 5,
      location: "Industrial District Access",
      severity: "medium",
      congestionLevel: 52,
      avgDelay: 3.8,
      avgSpeed: 38,
      volume: "1,980 veh/hr"
    }
  ];

  // Mock data for comparative analysis
  const comparativeData = [
    {
      segment: "Highway 101",
      currentVolume: 48500,
      previousVolume: 43200,
      currentEfficiency: 72,
      previousEfficiency: 68,
      volumeChange: 12.3,
      efficiencyChange: 5.9,
      avgSpeed: 52
    },
    {
      segment: "Interstate 95",
      currentVolume: 52100,
      previousVolume: 49800,
      currentEfficiency: 78,
      previousEfficiency: 75,
      volumeChange: 4.6,
      efficiencyChange: 4.0,
      avgSpeed: 58
    },
    {
      segment: "Route 66",
      currentVolume: 38900,
      previousVolume: 41200,
      currentEfficiency: 81,
      previousEfficiency: 79,
      volumeChange: -5.6,
      efficiencyChange: 2.5,
      avgSpeed: 45
    },
    {
      segment: "Main Street",
      currentVolume: 28400,
      previousVolume: 26800,
      currentEfficiency: 65,
      previousEfficiency: 62,
      volumeChange: 6.0,
      efficiencyChange: 4.8,
      avgSpeed: 32
    },
    {
      segment: "Broadway",
      currentVolume: 22100,
      previousVolume: 24500,
      currentEfficiency: 69,
      previousEfficiency: 71,
      volumeChange: -9.8,
      efficiencyChange: -2.8,
      avgSpeed: 35
    }
  ];

  // Mock data for historical trends
  const historicalData = [
    { 
      period: "Jan 2024", 
      volume: 42000, 
      speed: 48, 
      incidents: 23, 
      efficiency: 72,
      volumeForecast: 44000,
      speedForecast: 50,
      incidentsForecast: 20,
      efficiencyForecast: 75
    },
    { 
      period: "Feb 2024", 
      volume: 45000, 
      speed: 46, 
      incidents: 28, 
      efficiency: 70,
      volumeForecast: 46000,
      speedForecast: 48,
      incidentsForecast: 25,
      efficiencyForecast: 73
    },
    { 
      period: "Mar 2024", 
      volume: 48000, 
      speed: 44, 
      incidents: 31, 
      efficiency: 68,
      volumeForecast: 49000,
      speedForecast: 46,
      incidentsForecast: 28,
      efficiencyForecast: 71
    },
    { 
      period: "Apr 2024", 
      volume: 46000, 
      speed: 47, 
      incidents: 25, 
      efficiency: 74,
      volumeForecast: 47000,
      speedForecast: 49,
      incidentsForecast: 22,
      efficiencyForecast: 76
    },
    { 
      period: "May 2024", 
      volume: 49000, 
      speed: 45, 
      incidents: 29, 
      efficiency: 71,
      volumeForecast: 50000,
      speedForecast: 47,
      incidentsForecast: 26,
      efficiencyForecast: 74
    },
    { 
      period: "Jun 2024", 
      volume: 51000, 
      speed: 43, 
      incidents: 33, 
      efficiency: 69,
      volumeForecast: 52000,
      speedForecast: 45,
      incidentsForecast: 30,
      efficiencyForecast: 72
    },
    { 
      period: "Jul 2024", 
      volume: 53000, 
      speed: 42, 
      incidents: 35, 
      efficiency: 67,
      volumeForecast: 54000,
      speedForecast: 44,
      incidentsForecast: 32,
      efficiencyForecast: 70
    },
    { 
      period: "Aug 2024", 
      volume: 50000, 
      speed: 44, 
      incidents: 30, 
      efficiency: 73,
      volumeForecast: 51000,
      speedForecast: 46,
      incidentsForecast: 27,
      efficiencyForecast: 75
    },
    { 
      period: "Sep 2024", 
      volume: 47832, 
      speed: 46, 
      incidents: 26, 
      efficiency: 78,
      volumeForecast: 48500,
      speedForecast: 48,
      incidentsForecast: 23,
      efficiencyForecast: 80
    }
  ];

  // Update timestamp every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    // Mock export functionality
    const exportData = {
      dateRange,
      selectedSegments,
      granularity,
      metrics: metricsData,
      trafficData: trafficVolumeData,
      hotspots: hotspotsData,
      comparative: comparativeData,
      historical: historicalData,
      exportedAt: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `traffic-analytics-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Traffic Analytics & Performance Dashboard - Road Intelligence</title>
        <meta name="description" content="Comprehensive traffic analytics dashboard providing insights into road network performance, congestion patterns, and safety metrics for transportation authorities." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Traffic Analytics & Performance</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of traffic patterns, congestion trends, and network performance metrics
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated?.toLocaleTimeString('en-US', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedSegments={selectedSegments}
            onSegmentChange={setSelectedSegments}
            granularity={granularity}
            onGranularityChange={setGranularity}
            onExport={handleExport}
          />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                description={metric?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Traffic Volume Chart - 2 columns */}
            <div className="lg:col-span-2">
              <TrafficVolumeChart
                data={trafficVolumeData}
                selectedSegment={selectedSegment}
                onSegmentChange={setSelectedSegment}
              />
            </div>

            {/* Congestion Hotspots - 1 column */}
            <div className="lg:col-span-1">
              <CongestionHotspots hotspots={hotspotsData} />
            </div>
          </div>

          {/* Comparative Analysis - Full Width */}
          <div className="mb-8">
            <ComparativeAnalysis
              data={comparativeData}
              comparisonMode={comparisonMode}
              onModeChange={setComparisonMode}
            />
          </div>

          {/* Historical Trends - Full Width */}
          <div className="mb-8">
            <HistoricalTrends
              data={historicalData}
              selectedMetric={selectedMetric}
              onMetricChange={setSelectedMetric}
              forecastEnabled={forecastEnabled}
              onForecastToggle={setForecastEnabled}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrafficAnalyticsAndPerformanceDashboard;
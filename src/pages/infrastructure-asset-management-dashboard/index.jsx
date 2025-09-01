import React, { useState, useEffect } from 'react';

import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import AssetOverviewCard from './components/AssetOverviewCard';
import AssetMap from './components/AssetMap';
import MaintenancePriorityQueue from './components/MaintenancePriorityQueue';
import AssetConditionMatrix from './components/AssetConditionMatrix';
import MaintenanceGanttChart from './components/MaintenanceGanttChart';
import CostTrackingSection from './components/CostTrackingSection';

const InfrastructureAssetManagementDashboard = () => {
  const [selectedAssetType, setSelectedAssetType] = useState('all');
  const [maintenanceStatus, setMaintenanceStatus] = useState('all');
  const [budgetPeriod, setBudgetPeriod] = useState('current');
  const [conditionThreshold, setConditionThreshold] = useState(60);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for assets
  const assets = [
    {
      id: 'asset-001',
      name: 'Brooklyn Bridge',
      type: 'Bridge',
      location: 'Brooklyn, NY',
      conditionScore: 85,
      lastInspection: '2024-08-15',
      nextMaintenance: '2024-10-01',
      estimatedCost: 125000,
      coordinates: { lat: 40.7061, lng: -73.9969 }
    },
    {
      id: 'asset-002',
      name: 'Highway 95 Section A',
      type: 'Road',
      location: 'Interstate 95',
      conditionScore: 72,
      lastInspection: '2024-08-20',
      nextMaintenance: '2024-09-15',
      estimatedCost: 85000,
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 'asset-003',
      name: 'Traffic Signal Grid 12',
      type: 'Traffic Signal',
      location: 'Manhattan District',
      conditionScore: 45,
      lastInspection: '2024-08-25',
      nextMaintenance: '2024-09-05',
      estimatedCost: 35000,
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 'asset-004',
      name: 'Road Sign Cluster 8',
      type: 'Road Signs',
      location: 'Queens Boulevard',
      conditionScore: 91,
      lastInspection: '2024-08-18',
      nextMaintenance: '2024-11-01',
      estimatedCost: 15000,
      coordinates: { lat: 40.7282, lng: -73.7949 }
    },
    {
      id: 'asset-005',
      name: 'Tunnel Ventilation System',
      type: 'Infrastructure',
      location: 'Lincoln Tunnel',
      conditionScore: 68,
      lastInspection: '2024-08-22',
      nextMaintenance: '2024-09-30',
      estimatedCost: 200000,
      coordinates: { lat: 40.7614, lng: -74.0055 }
    },
    {
      id: 'asset-006',
      name: 'Pedestrian Overpass 3',
      type: 'Bridge',
      location: 'Central Park East',
      conditionScore: 78,
      lastInspection: '2024-08-12',
      nextMaintenance: '2024-10-15',
      estimatedCost: 95000,
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    {
      id: 'asset-007',
      name: 'Highway 278 Interchange',
      type: 'Road',
      location: 'Staten Island',
      conditionScore: 52,
      lastInspection: '2024-08-28',
      nextMaintenance: '2024-09-10',
      estimatedCost: 150000,
      coordinates: { lat: 40.5795, lng: -74.1502 }
    },
    {
      id: 'asset-008',
      name: 'Smart Traffic Control Hub',
      type: 'Traffic Signal',
      location: 'Times Square',
      conditionScore: 88,
      lastInspection: '2024-08-30',
      nextMaintenance: '2024-12-01',
      estimatedCost: 45000,
      coordinates: { lat: 40.7580, lng: -73.9855 }
    }
  ];

  // Mock maintenance tasks
  const maintenanceTasks = [
    {
      id: 'task-001',
      title: 'Bridge Deck Resurfacing',
      description: 'Complete resurfacing of the main deck structure with anti-slip coating application',
      location: 'Brooklyn Bridge',
      priority: 'critical',
      status: 'overdue',
      scheduledDate: '2024-08-25',
      assignedTo: 'Team Alpha',
      estimatedCost: 125000,
      estimatedDuration: '14 days',
      resourcesRequired: ['Heavy Machinery', 'Traffic Control', 'Materials'],
      lastInspection: '2024-07-15'
    },
    {
      id: 'task-002',
      title: 'Signal Controller Upgrade',
      description: 'Replace outdated traffic signal controllers with smart adaptive systems',
      location: 'Traffic Signal Grid 12',
      priority: 'high',
      status: 'scheduled',
      scheduledDate: '2024-09-05',
      assignedTo: 'Team Beta',
      estimatedCost: 35000,
      estimatedDuration: '5 days',
      resourcesRequired: ['Electrical Team', 'Software Installation', 'Testing Equipment'],
      lastInspection: '2024-08-01'
    },
    {
      id: 'task-003',
      title: 'Pavement Crack Sealing',
      description: 'Seal longitudinal and transverse cracks to prevent water infiltration',
      location: 'Highway 95 Section A',
      priority: 'medium',
      status: 'in-progress',
      scheduledDate: '2024-09-01',
      assignedTo: 'Team Gamma',
      estimatedCost: 85000,
      estimatedDuration: '10 days',
      resourcesRequired: ['Crack Sealing Equipment', 'Traffic Management', 'Materials'],
      lastInspection: '2024-08-10'
    },
    {
      id: 'task-004',
      title: 'Ventilation System Maintenance',
      description: 'Comprehensive maintenance of tunnel ventilation fans and control systems',
      location: 'Lincoln Tunnel',
      priority: 'high',
      status: 'scheduled',
      scheduledDate: '2024-09-30',
      assignedTo: 'Team Delta',
      estimatedCost: 200000,
      estimatedDuration: '21 days',
      resourcesRequired: ['HVAC Specialists', 'Electrical Team', 'Safety Equipment'],
      lastInspection: '2024-08-05'
    },
    {
      id: 'task-005',
      title: 'Sign Replacement Program',
      description: 'Replace weathered road signs with new reflective materials',
      location: 'Queens Boulevard',
      priority: 'low',
      status: 'scheduled',
      scheduledDate: '2024-11-01',
      assignedTo: 'Team Epsilon',
      estimatedCost: 15000,
      estimatedDuration: '3 days',
      resourcesRequired: ['Sign Installation Team', 'Materials', 'Traffic Control'],
      lastInspection: '2024-08-20'
    },
    {
      id: 'task-006',
      title: 'Structural Inspection',
      description: 'Annual comprehensive structural integrity assessment',
      location: 'Pedestrian Overpass 3',
      priority: 'medium',
      status: 'scheduled',
      scheduledDate: '2024-10-15',
      assignedTo: 'Team Zeta',
      estimatedCost: 95000,
      estimatedDuration: '7 days',
      resourcesRequired: ['Structural Engineers', 'Testing Equipment', 'Documentation'],
      lastInspection: '2024-07-30'
    }
  ];

  // Mock condition matrix data
  const conditionMatrixData = [
    {
      id: 'asset-001',
      name: 'Brooklyn Bridge',
      monthlyScores: [88, 87, 85, 84, 85, 86, 85, 84, 83, 85],
      trend: 'stable'
    },
    {
      id: 'asset-002',
      name: 'Highway 95 Section A',
      monthlyScores: [78, 76, 74, 72, 70, 68, 70, 72, 71, 72],
      trend: 'declining'
    },
    {
      id: 'asset-003',
      name: 'Traffic Signal Grid 12',
      monthlyScores: [65, 58, 52, 48, 45, 42, 40, 43, 45, 45],
      trend: 'critical'
    },
    {
      id: 'asset-004',
      name: 'Road Sign Cluster 8',
      monthlyScores: [89, 90, 91, 92, 91, 90, 91, 92, 91, 91],
      trend: 'stable'
    },
    {
      id: 'asset-005',
      name: 'Tunnel Ventilation',
      monthlyScores: [75, 73, 71, 69, 68, 66, 67, 68, 69, 68],
      trend: 'declining'
    }
  ];

  // Mock schedule data for Gantt chart
  const scheduleData = [
    {
      id: 'project-001',
      name: 'Bridge Maintenance Program',
      location: 'Brooklyn Bridge',
      status: 'in-progress',
      startDate: '2024-09-01',
      endDate: '2024-10-15',
      progress: 35,
      budget: 125000,
      teamLead: 'John Smith',
      hasResourceConflict: false
    },
    {
      id: 'project-002',
      name: 'Highway Resurfacing',
      location: 'Highway 95',
      status: 'scheduled',
      startDate: '2024-09-15',
      endDate: '2024-11-30',
      progress: 0,
      budget: 85000,
      teamLead: 'Sarah Johnson',
      hasResourceConflict: true
    },
    {
      id: 'project-003',
      name: 'Signal System Upgrade',
      location: 'Manhattan District',
      status: 'scheduled',
      startDate: '2024-10-01',
      endDate: '2024-11-15',
      progress: 0,
      budget: 35000,
      teamLead: 'Mike Davis',
      hasResourceConflict: false
    },
    {
      id: 'project-004',
      name: 'Tunnel Ventilation Overhaul',
      location: 'Lincoln Tunnel',
      status: 'scheduled',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      progress: 0,
      budget: 200000,
      teamLead: 'Lisa Chen',
      hasResourceConflict: true
    }
  ];

  // Mock budget and ROI data
  const budgetData = [
    { month: 'Jan', budgeted: 500000, actual: 485000 },
    { month: 'Feb', budgeted: 520000, actual: 510000 },
    { month: 'Mar', budgeted: 480000, actual: 495000 },
    { month: 'Apr', budgeted: 550000, actual: 535000 },
    { month: 'May', budgeted: 600000, actual: 580000 },
    { month: 'Jun', budgeted: 580000, actual: 595000 }
  ];

  const roiData = [
    { project: 'Bridge Maintenance', roi: 15.2 },
    { project: 'Highway Resurfacing', roi: 22.8 },
    { project: 'Signal Upgrade', roi: 18.5 },
    { project: 'Tunnel Overhaul', roi: 12.3 },
    { project: 'Sign Replacement', roi: 25.1 }
  ];

  const costTrends = [
    { name: 'Materials', value: 1200000 },
    { name: 'Labor', value: 800000 },
    { name: 'Equipment', value: 600000 },
    { name: 'Permits', value: 200000 },
    { name: 'Other', value: 150000 }
  ];

  // Filter options
  const assetTypeOptions = [
    { value: 'all', label: 'All Asset Types' },
    { value: 'bridges', label: 'Bridges' },
    { value: 'roads', label: 'Roads' },
    { value: 'signals', label: 'Traffic Signals' },
    { value: 'signs', label: 'Road Signs' },
    { value: 'infrastructure', label: 'Infrastructure' }
  ];

  const maintenanceStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'completed', label: 'Completed' }
  ];

  const budgetPeriodOptions = [
    { value: 'current', label: 'Current Fiscal Year' },
    { value: 'previous', label: 'Previous Fiscal Year' },
    { value: 'quarterly', label: 'Current Quarter' },
    { value: 'monthly', label: 'Current Month' }
  ];

  // Calculate KPI values
  const totalAssets = assets?.length;
  const maintenanceBacklog = maintenanceTasks?.filter(task => task?.status === 'overdue' || task?.status === 'scheduled')?.length;
  const budgetUtilization = ((budgetData?.reduce((sum, item) => sum + item?.actual, 0) / budgetData?.reduce((sum, item) => sum + item?.budgeted, 0)) * 100)?.toFixed(1);
  const predictedFailures = assets?.filter(asset => asset?.conditionScore < conditionThreshold)?.length;

  const handleAssetSelect = (asset) => {
    console.log('Selected asset:', asset);
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
  };

  const handleExportReport = () => {
    console.log('Exporting maintenance report...');
  };

  useEffect(() => {
    // Simulate data updates every 4 hours
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 4 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Infrastructure Asset Management</h1>
            <p className="text-muted-foreground mt-1">
              Monitor asset conditions, track maintenance schedules, and optimize resource allocation
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated?.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <Button variant="ghost" onClick={handleRefreshData} iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="default" onClick={handleExportReport} iconName="Download">
              Export Report
            </Button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Asset Type Filter"
              options={assetTypeOptions}
              value={selectedAssetType}
              onChange={setSelectedAssetType}
            />
            <Select
              label="Maintenance Status"
              options={maintenanceStatusOptions}
              value={maintenanceStatus}
              onChange={setMaintenanceStatus}
            />
            <Select
              label="Budget Period"
              options={budgetPeriodOptions}
              value={budgetPeriod}
              onChange={setBudgetPeriod}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Condition Threshold</label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={conditionThreshold}
                  onChange={(e) => setConditionThreshold(parseInt(e?.target?.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground w-12">{conditionThreshold}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AssetOverviewCard
            title="Total Assets Under Management"
            value={totalAssets?.toLocaleString()}
            change="+2.3%"
            changeType="positive"
            icon="Building"
            color="bg-primary"
          />
          <AssetOverviewCard
            title="Maintenance Backlog"
            value={maintenanceBacklog}
            change="-5.1%"
            changeType="positive"
            icon="Wrench"
            color="bg-warning"
          />
          <AssetOverviewCard
            title="Budget Utilization"
            value={`${budgetUtilization}%`}
            change="+1.8%"
            changeType="positive"
            icon="DollarSign"
            color="bg-success"
          />
          <AssetOverviewCard
            title="Predicted Failure Alerts"
            value={predictedFailures}
            change="+12.5%"
            changeType="negative"
            icon="AlertTriangle"
            color="bg-error"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Asset Map */}
          <div className="lg:col-span-8">
            <AssetMap assets={assets} onAssetSelect={handleAssetSelect} />
          </div>

          {/* Maintenance Priority Queue */}
          <div className="lg:col-span-4">
            <MaintenancePriorityQueue tasks={maintenanceTasks} />
          </div>
        </div>

        {/* Asset Condition Matrix */}
        <AssetConditionMatrix conditionData={conditionMatrixData} />

        {/* Maintenance Gantt Chart */}
        <MaintenanceGanttChart scheduleData={scheduleData} />

        {/* Cost Tracking Section */}
        <CostTrackingSection 
          budgetData={budgetData}
          roiData={roiData}
          costTrends={costTrends}
        />
      </div>
    </div>
  );
};

export default InfrastructureAssetManagementDashboard;
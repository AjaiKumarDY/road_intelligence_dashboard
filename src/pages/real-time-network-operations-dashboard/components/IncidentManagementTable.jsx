import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const IncidentManagementTable = () => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock incident data
  const mockIncidents = [
    {
      id: 'INC-2024-001',
      type: 'accident',
      severity: 'critical',
      title: 'Multi-Vehicle Collision',
      location: 'I-95 Northbound, Mile 42.3',
      reportedBy: 'Traffic Camera #247',
      timestamp: new Date('2024-09-01T16:05:00'),
      status: 'active',
      assignedTeam: 'Emergency Response Unit 7',
      estimatedResolution: '45 minutes',
      priority: 1,
      affectedLanes: 2,
      trafficImpact: 'Severe'
    },
    {
      id: 'INC-2024-002',
      type: 'maintenance',
      severity: 'high',
      title: 'Emergency Pothole Repair',
      location: 'Main Street & 5th Avenue',
      reportedBy: 'Citizen Report #1247',
      timestamp: new Date('2024-09-01T15:45:00'),
      status: 'in-progress',
      assignedTeam: 'Maintenance Crew 3',
      estimatedResolution: '2 hours',
      priority: 2,
      affectedLanes: 1,
      trafficImpact: 'Moderate'
    },
    {
      id: 'INC-2024-003',
      type: 'weather',
      severity: 'medium',
      title: 'Flooding Risk Assessment',
      location: 'Downtown District - Low Areas',
      reportedBy: 'Weather Station #12',
      timestamp: new Date('2024-09-01T15:30:00'),
      status: 'monitoring',
      assignedTeam: 'Weather Response Team',
      estimatedResolution: '1 hour',
      priority: 3,
      affectedLanes: 0,
      trafficImpact: 'Low'
    },
    {
      id: 'INC-2024-004',
      type: 'traffic',
      severity: 'high',
      title: 'Unusual Congestion Pattern',
      location: 'Bridge District - All Approaches',
      reportedBy: 'AI Traffic Analysis',
      timestamp: new Date('2024-09-01T15:15:00'),
      status: 'investigating',
      assignedTeam: 'Traffic Control Center',
      estimatedResolution: '90 minutes',
      priority: 2,
      affectedLanes: 4,
      trafficImpact: 'High'
    },
    {
      id: 'INC-2024-005',
      type: 'infrastructure',
      severity: 'low',
      title: 'Traffic Light Malfunction',
      location: 'Oak Street & Elm Avenue',
      reportedBy: 'Sensor Network',
      timestamp: new Date('2024-09-01T14:50:00'),
      status: 'resolved',
      assignedTeam: 'Signal Maintenance',
      estimatedResolution: 'Completed',
      priority: 4,
      affectedLanes: 0,
      trafficImpact: 'Minimal'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10';
      case 'high': return 'bg-warning/10';
      case 'medium': return 'bg-primary/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error';
      case 'in-progress': return 'text-warning';
      case 'monitoring': return 'text-primary';
      case 'investigating': return 'text-primary';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'accident': return 'Car';
      case 'maintenance': return 'Construction';
      case 'weather': return 'Cloud';
      case 'traffic': return 'Traffic';
      case 'infrastructure': return 'Settings';
      default: return 'AlertTriangle';
    }
  };

  const getTrafficImpactColor = (impact) => {
    switch (impact) {
      case 'Severe': return 'text-error';
      case 'High': return 'text-warning';
      case 'Moderate': return 'text-primary';
      case 'Low': return 'text-success';
      case 'Minimal': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const filteredIncidents = statusFilter === 'all' 
    ? mockIncidents 
    : mockIncidents?.filter(incident => incident?.status === statusFilter);

  const sortedIncidents = [...filteredIncidents]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'timestamp') {
      aValue = aValue?.getTime();
      bValue = bValue?.getTime();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Active Incident Management</h3>
          
          <div className="flex items-center space-x-4">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by Status"
              className="min-w-36"
            />
            
            <Button variant="outline" size="sm" iconName="Plus">
              New Incident
            </Button>
            
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Incident ID</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Type</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('severity')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Severity</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Reported</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Assigned Team</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Impact</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedIncidents?.map((incident, index) => (
              <tr 
                key={incident?.id}
                className={`border-b border-border hover:bg-muted/30 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                }`}
              >
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${getSeverityBg(incident?.severity)}`}>
                      <Icon 
                        name={getTypeIcon(incident?.type)} 
                        size={14} 
                        className={getSeverityColor(incident?.severity)} 
                      />
                    </div>
                    <span className="text-sm font-data text-foreground">
                      {incident?.id}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground capitalize">
                    {incident?.type}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBg(incident?.severity)} ${getSeverityColor(incident?.severity)}`}>
                    {incident?.severity?.toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  <div>
                    <div className="text-sm text-foreground font-medium">
                      {incident?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {incident?.location}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div>
                    <div className="text-sm text-foreground font-data">
                      {formatTimestamp(incident?.timestamp)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {incident?.reportedBy}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      incident?.status === 'active' ? 'bg-error animate-pulse' :
                      incident?.status === 'in-progress' ? 'bg-warning' :
                      incident?.status === 'resolved' ? 'bg-success' : 'bg-primary'
                    }`} />
                    <span className={`text-sm capitalize ${getStatusColor(incident?.status)}`}>
                      {incident?.status?.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">
                    {incident?.assignedTeam}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ETC: {incident?.estimatedResolution}
                  </div>
                </td>
                <td className="p-3">
                  <div>
                    <div className={`text-sm font-medium ${getTrafficImpactColor(incident?.trafficImpact)}`}>
                      {incident?.trafficImpact}
                    </div>
                    {incident?.affectedLanes > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {incident?.affectedLanes} lane{incident?.affectedLanes > 1 ? 's' : ''} affected
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="MessageSquare" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {sortedIncidents?.length} of {mockIncidents?.length} incidents
          </span>
          <div className="flex items-center space-x-2">
            <span>Priority incidents requiring immediate attention: </span>
            <span className="text-error font-medium">
              {mockIncidents?.filter(i => i?.priority <= 2 && i?.status !== 'resolved')?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentManagementTable;
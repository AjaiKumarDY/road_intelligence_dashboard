import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IncidentTable = () => {
  const [sortField, setSortField] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const incidents = [
    {
      id: 'INC-001',
      type: 'Multi-Vehicle Accident',
      location: 'Times Square, NYC',
      priority: 1,
      status: 'active',
      reportedAt: '2025-09-01T16:08:30',
      responseTime: '3.2 min',
      assignedUnits: 3,
      estimatedClearance: '45 min',
      severity: 'high'
    },
    {
      id: 'INC-002',
      type: 'Road Work Emergency',
      location: 'Herald Square, NYC',
      priority: 2,
      status: 'responding',
      reportedAt: '2025-09-01T16:05:15',
      responseTime: '6.8 min',
      assignedUnits: 2,
      estimatedClearance: '2 hours',
      severity: 'medium'
    },
    {
      id: 'INC-003',
      type: 'Weather Related',
      location: 'Central Park East',
      priority: 3,
      status: 'monitoring',
      reportedAt: '2025-09-01T16:02:45',
      responseTime: '12.1 min',
      assignedUnits: 1,
      estimatedClearance: '30 min',
      severity: 'low'
    },
    {
      id: 'INC-004',
      type: 'Traffic Signal Malfunction',
      location: 'Broadway & 42nd St',
      priority: 4,
      status: 'resolved',
      reportedAt: '2025-09-01T15:45:20',
      responseTime: '8.5 min',
      assignedUnits: 1,
      estimatedClearance: 'Completed',
      severity: 'medium'
    },
    {
      id: 'INC-005',
      type: 'Vehicle Breakdown',
      location: 'FDR Drive Southbound',
      priority: 5,
      status: 'en-route',
      reportedAt: '2025-09-01T16:10:10',
      responseTime: '2.1 min',
      assignedUnits: 1,
      estimatedClearance: '20 min',
      severity: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-error text-error-foreground';
      case 'responding': return 'bg-warning text-warning-foreground';
      case 'en-route': return 'bg-primary text-primary-foreground';
      case 'monitoring': return 'bg-secondary text-secondary-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority <= 2) return 'AlertTriangle';
    if (priority <= 4) return 'AlertCircle';
    return 'Info';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedIncidents = incidents?.filter(incident => filterStatus === 'all' || incident?.status === filterStatus)?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'reportedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Incident Management
        </h3>
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-1 text-sm bg-surface border border-border rounded-md text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="responding">Responding</option>
            <option value="en-route">En Route</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
          
          <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
            <Icon name="Plus" size={16} className="mr-1" />
            New Incident
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border sticky top-0">
            <tr>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Priority</span>
                  <Icon 
                    name={sortField === 'priority' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Incident ID</span>
                  <Icon 
                    name={sortField === 'id' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('reportedAt')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Reported</span>
                  <Icon 
                    name={sortField === 'reportedAt' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Response Time</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Units</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">ETC</th>
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedIncidents?.map((incident) => (
              <tr key={incident?.id} className="border-b border-border hover:bg-surface/50 transition-colors duration-200">
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getPriorityIcon(incident?.priority)} 
                      size={16} 
                      className={getSeverityColor(incident?.severity)} 
                    />
                    <span className="text-sm font-medium text-foreground">#{incident?.priority}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm font-medium text-foreground">{incident?.id}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{incident?.type}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{incident?.location}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident?.status)}`}>
                    {incident?.status?.replace('-', ' ')?.toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{formatTime(incident?.reportedAt)}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{incident?.responseTime}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{incident?.assignedUnits}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">{incident?.estimatedClearance}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                      <Icon name="Eye" size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                      <Icon name="Edit" size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                      <Icon name="MapPin" size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <span className="text-sm text-muted-foreground">
          Showing {filteredAndSortedIncidents?.length} of {incidents?.length} incidents
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm bg-surface border border-border rounded-md hover:bg-muted transition-colors duration-200">
            <Icon name="ChevronLeft" size={14} className="mr-1" />
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-foreground">1 of 1</span>
          <button className="px-3 py-1 text-sm bg-surface border border-border rounded-md hover:bg-muted transition-colors duration-200">
            Next
            <Icon name="ChevronRight" size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentTable;
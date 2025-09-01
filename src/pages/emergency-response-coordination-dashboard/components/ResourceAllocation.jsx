import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ResourceAllocation = () => {
  const [selectedResourceType, setSelectedResourceType] = useState('all');

  const resourceTypes = [
    { id: 'police', name: 'Police', icon: 'Shield', color: 'text-blue-400' },
    { id: 'fire', name: 'Fire', icon: 'Flame', color: 'text-red-400' },
    { id: 'medical', name: 'Medical', icon: 'Heart', color: 'text-green-400' },
    { id: 'maintenance', name: 'Maintenance', icon: 'Wrench', color: 'text-yellow-400' }
  ];

  const resources = [
    {
      id: 'POLICE-01',
      type: 'police',
      name: 'Patrol Unit 01',
      status: 'on-scene',
      location: 'Times Square',
      assignedIncident: 'INC-001',
      eta: 'On Scene',
      lastUpdate: '2 min ago'
    },
    {
      id: 'POLICE-02',
      type: 'police',
      name: 'Patrol Unit 02',
      status: 'available',
      location: 'Midtown Precinct',
      assignedIncident: null,
      eta: '5 min',
      lastUpdate: '1 min ago'
    },
    {
      id: 'FIRE-03',
      type: 'fire',
      name: 'Engine 03',
      status: 'en-route',
      location: 'En Route to Times Square',
      assignedIncident: 'INC-001',
      eta: '2 min',
      lastUpdate: '30 sec ago'
    },
    {
      id: 'MED-07',
      type: 'medical',
      name: 'Ambulance 07',
      status: 'dispatched',
      location: 'Hospital District',
      assignedIncident: 'INC-001',
      eta: '5 min',
      lastUpdate: '1 min ago'
    },
    {
      id: 'MAINT-12',
      type: 'maintenance',
      name: 'Tow Truck 12',
      status: 'available',
      location: 'Depot',
      assignedIncident: null,
      eta: '10 min',
      lastUpdate: '3 min ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'dispatched': return 'bg-primary text-primary-foreground';
      case 'en-route': return 'bg-warning text-warning-foreground';
      case 'on-scene': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'dispatched': return 'Send';
      case 'en-route': return 'Navigation';
      case 'on-scene': return 'MapPin';
      default: return 'Clock';
    }
  };

  const filteredResources = selectedResourceType === 'all' 
    ? resources 
    : resources?.filter(resource => resource?.type === selectedResourceType);

  const getResourceStats = () => {
    const stats = resourceTypes?.map(type => {
      const typeResources = resources?.filter(r => r?.type === type?.id);
      const available = typeResources?.filter(r => r?.status === 'available')?.length;
      const total = typeResources?.length;
      return { ...type, available, total };
    });
    return stats;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Resource Allocation
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedResourceType}
            onChange={(e) => setSelectedResourceType(e?.target?.value)}
            className="px-3 py-1 text-sm bg-surface border border-border rounded-md text-foreground"
          >
            <option value="all">All Resources</option>
            {resourceTypes?.map(type => (
              <option key={type?.id} value={type?.id}>{type?.name}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Resource Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-3">
          {getResourceStats()?.map((stat) => (
            <div key={stat?.id} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-muted ${stat?.color}`}>
                <Icon name={stat?.icon} size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{stat?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {stat?.available}/{stat?.total} Available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Resource List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredResources?.map((resource) => {
            const resourceType = resourceTypes?.find(t => t?.id === resource?.type);
            return (
              <div key={resource?.id} className="p-3 bg-surface rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-muted ${resourceType?.color}`}>
                      <Icon name={resourceType?.icon || 'Truck'} size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{resource?.name}</p>
                      <p className="text-xs text-muted-foreground">{resource?.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(resource?.status)}`}>
                    {resource?.status?.replace('-', ' ')?.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground">{resource?.location}</span>
                  </div>
                  
                  {resource?.assignedIncident && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Incident:</span>
                      <span className="text-foreground">{resource?.assignedIncident}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="text-foreground">{resource?.eta}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Update:</span>
                    <span className="text-foreground">{resource?.lastUpdate}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  {resource?.status === 'available' && (
                    <button className="flex-1 px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                      <Icon name="Send" size={12} className="mr-1" />
                      Dispatch
                    </button>
                  )}
                  
                  <button className="flex-1 px-3 py-1 text-xs bg-surface text-foreground border border-border rounded-md hover:bg-muted transition-colors duration-200">
                    <Icon name="MessageSquare" size={12} className="mr-1" />
                    Contact
                  </button>
                  
                  <button className="px-3 py-1 text-xs bg-surface text-foreground border border-border rounded-md hover:bg-muted transition-colors duration-200">
                    <Icon name="MapPin" size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Request Backup
          </button>
          <button className="flex-1 px-4 py-2 bg-surface text-foreground border border-border rounded-md hover:bg-muted transition-colors duration-200 text-sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CommandPanel = () => {
  const [selectedIncident, setSelectedIncident] = useState('INC-001');
  const [activeTab, setActiveTab] = useState('details');

  const incidentDetails = {
    'INC-001': {
      id: 'INC-001',
      type: 'Multi-Vehicle Accident',
      severity: 'high',
      location: 'Times Square, NYC',
      reportedAt: '2025-09-01T16:08:30',
      status: 'active',
      assignedUnits: [
        { id: 'POLICE-01', type: 'Police', status: 'on-scene', eta: 'arrived' },
        { id: 'FIRE-03', type: 'Fire Rescue', status: 'en-route', eta: '2 min' },
        { id: 'MED-07', type: 'Ambulance', status: 'dispatched', eta: '5 min' }
      ],
      timeline: [
        { time: '16:08:30', event: 'Incident reported via 911 call', status: 'reported' },
        { time: '16:09:15', event: 'Police unit POLICE-01 dispatched', status: 'dispatched' },
        { time: '16:10:45', event: 'Fire rescue FIRE-03 dispatched', status: 'dispatched' },
        { time: '16:11:20', event: 'Police unit arrived on scene', status: 'on-scene' },
        { time: '16:12:00', event: 'Traffic diversion activated', status: 'active' }
      ],
      communications: [
        { time: '16:11:45', unit: 'POLICE-01', message: 'Two vehicles involved, requesting tow trucks' },
        { time: '16:12:10', unit: 'DISPATCH', message: 'Tow trucks dispatched, ETA 10 minutes' }
      ]
    }
  };

  const currentIncident = incidentDetails?.[selectedIncident];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-scene': return 'text-error';
      case 'en-route': return 'text-warning';
      case 'dispatched': return 'text-primary';
      case 'available': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-scene': return 'MapPin';
      case 'en-route': return 'Navigation';
      case 'dispatched': return 'Send';
      case 'available': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Command Center
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedIncident}
            onChange={(e) => setSelectedIncident(e?.target?.value)}
            className="px-3 py-1 text-sm bg-surface border border-border rounded-md text-foreground"
          >
            <option value="INC-001">INC-001</option>
            <option value="INC-002">INC-002</option>
            <option value="INC-003">INC-003</option>
          </select>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {['details', 'units', 'timeline', 'comms']?.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-medium capitalize transition-colors duration-200 ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'comms' ? 'Communications' : tab}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-foreground">{currentIncident?.id}</h4>
              <span className={`px-3 py-1 text-sm rounded-full ${getSeverityColor(currentIncident?.severity)}`}>
                {currentIncident?.severity?.toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <p className="text-foreground">{currentIncident?.type}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="text-foreground">{currentIncident?.location}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Reported At</label>
                <p className="text-foreground">
                  {new Date(currentIncident.reportedAt)?.toLocaleString()}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="text-foreground capitalize">{currentIncident?.status}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                Update Status
              </button>
              <button className="flex-1 px-4 py-2 bg-surface text-foreground border border-border rounded-md hover:bg-muted transition-colors duration-200">
                Add Note
              </button>
            </div>
          </div>
        )}

        {activeTab === 'units' && (
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-foreground">Assigned Units</h4>
            {currentIncident?.assignedUnits?.map((unit) => (
              <div key={unit?.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getStatusColor(unit?.status)}`}>
                    <Icon name={getStatusIcon(unit?.status)} size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{unit?.id}</p>
                    <p className="text-sm text-muted-foreground">{unit?.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getStatusColor(unit?.status)}`}>
                    {unit?.status?.replace('-', ' ')?.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">ETA: {unit?.eta}</p>
                </div>
              </div>
            ))}
            
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 mt-4">
              <Icon name="Plus" size={16} className="mr-2" />
              Dispatch Additional Unit
            </button>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-foreground">Incident Timeline</h4>
            <div className="space-y-3">
              {currentIncident?.timeline?.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full mt-1">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{event?.event}</p>
                      <span className="text-xs text-muted-foreground">{event?.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comms' && (
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-foreground">Communications Log</h4>
            <div className="space-y-3">
              {currentIncident?.communications?.map((comm, index) => (
                <div key={index} className="p-3 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{comm?.unit}</span>
                    <span className="text-xs text-muted-foreground">{comm?.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comm?.message}</p>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2 pt-4">
              <input
                type="text"
                placeholder="Type message..."
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandPanel;
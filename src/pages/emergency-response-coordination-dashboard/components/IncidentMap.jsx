import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const IncidentMap = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [mapView, setMapView] = useState('incidents');

  const incidents = [
    {
      id: 'INC-001',
      type: 'accident',
      severity: 'high',
      location: { lat: 40.7589, lng: -73.9851, address: 'Times Square, NYC' },
      status: 'active',
      responseUnits: 3,
      estimatedClearance: '45 min',
      description: 'Multi-vehicle collision blocking 2 lanes'
    },
    {
      id: 'INC-002',
      type: 'roadwork',
      severity: 'medium',
      location: { lat: 40.7505, lng: -73.9934, address: 'Herald Square, NYC' },
      status: 'responding',
      responseUnits: 2,
      estimatedClearance: '2 hours',
      description: 'Emergency road repair - single lane closure'
    },
    {
      id: 'INC-003',
      type: 'weather',
      severity: 'low',
      location: { lat: 40.7614, lng: -73.9776, address: 'Central Park East' },
      status: 'monitoring',
      responseUnits: 1,
      estimatedClearance: '30 min',
      description: 'Flooding on eastbound lanes'
    }
  ];

  const responseUnits = [
    { id: 'UNIT-001', type: 'police', location: { lat: 40.7580, lng: -73.9855 }, status: 'en-route', eta: '3 min' },
    { id: 'UNIT-002', type: 'fire', location: { lat: 40.7520, lng: -73.9940 }, status: 'on-scene', eta: 'arrived' },
    { id: 'UNIT-003', type: 'medical', location: { lat: 40.7600, lng: -73.9800 }, status: 'available', eta: '8 min' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'accident': return 'Car';
      case 'roadwork': return 'Construction';
      case 'weather': return 'Cloud';
      default: return 'AlertTriangle';
    }
  };

  const getUnitIcon = (type) => {
    switch (type) {
      case 'police': return 'Shield';
      case 'fire': return 'Flame';
      case 'medical': return 'Heart';
      default: return 'Truck';
    }
  };

  const getUnitColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'en-route': return 'text-warning';
      case 'on-scene': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Incident Map
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapView('incidents')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              mapView === 'incidents' ?'bg-primary text-primary-foreground' :'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            Incidents
          </button>
          <button
            onClick={() => setMapView('units')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              mapView === 'units' ?'bg-primary text-primary-foreground' :'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            Units
          </button>
          <button
            onClick={() => setMapView('traffic')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              mapView === 'traffic' ?'bg-primary text-primary-foreground' :'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            Traffic
          </button>
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative bg-surface">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Emergency Response Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7589,-73.9851&z=14&output=embed"
          className="rounded-b-lg"
        />

        {/* Map Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Incident Markers */}
          {mapView === 'incidents' && incidents?.map((incident, index) => (
            <div
              key={incident?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedIncident(incident)}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getSeverityColor(incident?.severity)} shadow-elevation-2`}>
                <Icon name={getIncidentIcon(incident?.type)} size={16} />
              </div>
              {selectedIncident?.id === incident?.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-2 p-3 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{incident?.id}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(incident?.severity)}`}>
                      {incident?.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident?.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{incident?.responseUnits} units</span>
                    <span>ETC: {incident?.estimatedClearance}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Response Unit Markers */}
          {mapView === 'units' && responseUnits?.map((unit, index) => (
            <div
              key={unit?.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${25 + index * 20}%`,
                top: `${40 + index * 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`flex items-center justify-center w-6 h-6 bg-surface border-2 border-current rounded-full ${getUnitColor(unit?.status)}`}>
                <Icon name={getUnitIcon(unit?.type)} size={12} />
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Low Priority</span>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="flex items-center justify-center w-10 h-10 bg-popover border border-border rounded-lg shadow-elevation-1 hover:bg-muted transition-colors duration-200">
            <Icon name="ZoomIn" size={16} className="text-foreground" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-popover border border-border rounded-lg shadow-elevation-1 hover:bg-muted transition-colors duration-200">
            <Icon name="ZoomOut" size={16} className="text-foreground" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-popover border border-border rounded-lg shadow-elevation-1 hover:bg-muted transition-colors duration-200">
            <Icon name="RotateCcw" size={16} className="text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentMap;
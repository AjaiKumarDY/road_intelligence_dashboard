import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RoadDetection = () => {
  const [detectionMode, setDetectionMode] = useState('real-time');
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const roadDetections = [
    {
      id: 'RD-001',
      type: 'pothole',
      severity: 'high',
      location: { lat: 40.7589, lng: -73.9851, address: 'Broadway & 7th Ave' },
      confidence: 95,
      detectedAt: '2025-09-01T16:45:30',
      status: 'verified',
      dimensions: { width: '2.5m', depth: '15cm', length: '3.2m' },
      riskLevel: 'high',
      description: 'Large pothole affecting vehicle traffic',
      reportedBy: 'AI Detection System'
    },
    {
      id: 'RD-002',
      type: 'crack',
      severity: 'medium',
      location: { lat: 40.7505, lng: -73.9934, address: '34th St & Herald Square' },
      confidence: 87,
      detectedAt: '2025-09-01T16:30:15',
      status: 'pending',
      dimensions: { width: '5cm', depth: '3cm', length: '15m' },
      riskLevel: 'medium',
      description: 'Longitudinal crack in asphalt surface',
      reportedBy: 'Mobile Detection Unit'
    },
    {
      id: 'RD-003',
      type: 'surface_wear',
      severity: 'low',
      location: { lat: 40.7614, lng: -73.9776, address: 'Central Park East' },
      confidence: 78,
      detectedAt: '2025-09-01T16:20:45',
      status: 'monitoring',
      dimensions: { width: '3m', depth: '1cm', length: '25m' },
      riskLevel: 'low',
      description: 'Surface wear affecting road quality',
      reportedBy: 'Drone Survey'
    }
  ];

  const detectionStats = {
    totalDetections: 47,
    highPriority: 8,
    mediumPriority: 21,
    lowPriority: 18,
    scanningProgress: 78,
    lastUpdate: '2025-09-01T16:52:30'
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDetectionIcon = (type) => {
    switch (type) {
      case 'pothole': return 'AlertTriangle';
      case 'crack': return 'Zap';
      case 'surface_wear': return 'Layers';
      case 'debris': return 'Trash2';
      default: return 'Search';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-error';
      case 'pending': return 'text-warning';
      case 'monitoring': return 'text-primary';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-error';
  };

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (detectionMode === 'real-time') {
        // Simulate new detections or updates
        console.log('Checking for new road detections...');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [detectionMode]);

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Detection Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Road Detection System
          </h3>
          {isScanning && (
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs">Scanning...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={detectionMode}
            onChange={(e) => setDetectionMode(e?.target?.value)}
            className="px-3 py-1 text-sm bg-surface border border-border rounded-md text-foreground"
          >
            <option value="real-time">Real-time</option>
            <option value="historical">Historical</option>
            <option value="predictive">Predictive</option>
          </select>
          
          <button
            onClick={startScanning}
            disabled={isScanning}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
          >
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </div>
      {/* Detection Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{detectionStats?.totalDetections}</div>
            <div className="text-xs text-muted-foreground">Total Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">{detectionStats?.highPriority}</div>
            <div className="text-xs text-muted-foreground">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{detectionStats?.mediumPriority}</div>
            <div className="text-xs text-muted-foreground">Medium Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{detectionStats?.lowPriority}</div>
            <div className="text-xs text-muted-foreground">Low Priority</div>
          </div>
        </div>
        
        {/* Scanning Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>Area Coverage</span>
            <span>{detectionStats?.scanningProgress}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${detectionStats?.scanningProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Detection Map Container */}
      <div className="flex-1 relative bg-surface">
        {/* Road Detection Map */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Road Detection Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7589,-73.9851&z=16&output=embed"
          className="rounded-b-lg"
        />

        {/* Detection Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {roadDetections?.map((detection, index) => (
            <div
              key={detection?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${15 + index * 28}%`,
                top: `${25 + index * 12}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedDetection(detection)}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getSeverityColor(detection?.severity)} shadow-elevation-2 relative`}>
                <Icon name={getDetectionIcon(detection?.type)} size={16} />
                
                {/* Confidence Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-popover border border-border rounded-full flex items-center justify-center">
                  <span className={`text-xs font-bold ${getConfidenceColor(detection?.confidence)}`}>
                    {Math.round(detection?.confidence / 10)}
                  </span>
                </div>
              </div>
              
              {selectedDetection?.id === detection?.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevation-2 p-4 z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{detection?.id}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(detection?.severity)}`}>
                        {detection?.severity}
                      </span>
                      <span className={`text-xs ${getConfidenceColor(detection?.confidence)}`}>
                        {detection?.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Type: </span>
                      <span className="text-foreground capitalize">{detection?.type?.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Location: </span>
                      <span className="text-foreground">{detection?.location?.address}</span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Dimensions: </span>
                      <span className="text-foreground">{detection?.dimensions?.length} × {detection?.dimensions?.width}</span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Status: </span>
                      <span className={`capitalize ${getStatusColor(detection?.status)}`}>{detection?.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">{detection?.description}</p>
                  
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 transition-colors duration-200">
                      Verify Issue
                    </button>
                    <button className="flex-1 px-3 py-1 bg-surface text-foreground border border-border rounded text-xs hover:bg-muted transition-colors duration-200">
                      Generate Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detection Legend */}
        <div className="absolute bottom-4 left-4 bg-popover border border-border rounded-lg p-3 shadow-elevation-2 max-w-48">
          <h4 className="text-sm font-medium text-foreground mb-2">Detection Types</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={12} className="text-error" />
              <span className="text-xs text-muted-foreground">Potholes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={12} className="text-warning" />
              <span className="text-xs text-muted-foreground">Cracks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Layers" size={12} className="text-success" />
              <span className="text-xs text-muted-foreground">Surface Wear</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Trash2" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Debris</span>
            </div>
          </div>
        </div>

        {/* Detection Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="flex items-center justify-center w-10 h-10 bg-popover border border-border rounded-lg shadow-elevation-1 hover:bg-muted transition-colors duration-200">
            <Icon name="Camera" size={16} className="text-foreground" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-popover border border-border rounded-lg shadow-elevation-1 hover:bg-muted transition-colors duration-200">
            <Icon name="Filter" size={16} className="text-foreground" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-popover border border-border rounded-lg shadow-elevation-1 hover:bg-muted transition-colors duration-200">
            <Icon name="Download" size={16} className="text-foreground" />
          </button>
        </div>

        {/* Real-time Status Indicator */}
        {detectionMode === 'real-time' && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-popover border border-border rounded-lg px-3 py-2 shadow-elevation-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-foreground">Live Detection Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadDetection;
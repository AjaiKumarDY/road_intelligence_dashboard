import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkHeatMap = () => {
  const [activeLayers, setActiveLayers] = useState(['traffic', 'incidents']);
  const [mapView, setMapView] = useState('satellite');

  const layerOptions = [
    { id: 'traffic', label: 'Traffic Density', icon: 'Car', color: 'text-blue-400' },
    { id: 'incidents', label: 'Active Incidents', icon: 'AlertTriangle', color: 'text-red-400' },
    { id: 'weather', label: 'Weather Impact', icon: 'Cloud', color: 'text-yellow-400' },
    { id: 'maintenance', label: 'Maintenance Zones', icon: 'Construction', color: 'text-orange-400' },
    { id: 'cameras', label: 'Traffic Cameras', icon: 'Camera', color: 'text-green-400' },
    { id: 'sensors', label: 'IoT Sensors', icon: 'Radio', color: 'text-purple-400' }
  ];

  const mapViewOptions = [
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'roadmap', label: 'Roadmap', icon: 'Map' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => 
      prev?.includes(layerId) 
        ? prev?.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  // Mock coordinates for demonstration
  const mockLocation = "40.7128,-74.0060"; // New York City coordinates

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Network Heat Map</h3>
          
          <div className="flex items-center space-x-4">
            {/* Map View Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {mapViewOptions?.map((option) => (
                <Button
                  key={option?.id}
                  variant={mapView === option?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMapView(option?.id)}
                  iconName={option?.icon}
                  className="px-3"
                >
                  {option?.label}
                </Button>
              ))}
            </div>

            {/* Fullscreen Toggle */}
            <Button variant="ghost" size="sm" iconName="Maximize2">
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-sm text-muted-foreground mr-2">Layers:</span>
          {layerOptions?.map((layer) => (
            <Button
              key={layer?.id}
              variant={activeLayers?.includes(layer?.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleLayer(layer?.id)}
              iconName={layer?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {layer?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-slate-800">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Road Network Heat Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mockLocation}&z=12&output=embed`}
          className="w-full h-full"
        />

        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="sm" iconName="Plus" className="bg-background/90" />
          <Button variant="outline" size="sm" iconName="Minus" className="bg-background/90" />
          <Button variant="outline" size="sm" iconName="RotateCcw" className="bg-background/90" />
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 border border-border rounded-lg p-3">
          <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
          <div className="space-y-1">
            {activeLayers?.map((layerId) => {
              const layer = layerOptions?.find(l => l?.id === layerId);
              return (
                <div key={layerId} className="flex items-center space-x-2">
                  <Icon name={layer?.icon} size={12} className={layer?.color} />
                  <span className="text-xs text-foreground">{layer?.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Status Indicator */}
        <div className="absolute top-4 left-4 bg-background/90 border border-border rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-foreground font-data">Live Data</span>
          </div>
        </div>
      </div>
      {/* Map Statistics */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">247</div>
            <div className="text-xs text-muted-foreground">Active Sensors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">12</div>
            <div className="text-xs text-muted-foreground">Traffic Incidents</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">89%</div>
            <div className="text-xs text-muted-foreground">Network Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">1.2s</div>
            <div className="text-xs text-muted-foreground">Data Latency</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHeatMap;
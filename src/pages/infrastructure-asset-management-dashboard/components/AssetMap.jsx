import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AssetMap = ({ assets, onAssetSelect }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [mapView, setMapView] = useState('condition');

  const mapViews = [
    { id: 'condition', label: 'Condition', icon: 'Activity' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' }
  ];

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    onAssetSelect(asset);
  };

  const getConditionColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Asset Location Map</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Icon name="RotateCcw" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Icon name="Maximize2" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {mapViews?.map((view) => (
            <button
              key={view?.id}
              onClick={() => setMapView(view?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                mapView === view?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={view?.icon} size={16} />
              <span>{view?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Infrastructure Assets Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
          className="w-full h-full"
        />

        {/* Asset Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {assets?.slice(0, 8)?.map((asset, index) => (
            <div
              key={asset?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${30 + Math.floor(index / 4) * 30}%`
              }}
              onClick={() => handleAssetClick(asset)}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getConditionColor(asset?.conditionScore)}`}>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                  {asset?.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background border border-border rounded-lg p-3 shadow-elevation-1">
          <h4 className="text-sm font-medium text-foreground mb-2">Condition Score</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-xs text-muted-foreground">Good (80-100)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs text-muted-foreground">Fair (60-79)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-xs text-muted-foreground">Poor (&lt;60)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Asset Info */}
      {selectedAsset && (
        <div className="p-4 border-t border-border bg-surface">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{selectedAsset?.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedAsset?.type} • {selectedAsset?.location}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Condition Score</p>
                <p className="font-semibold text-foreground">{selectedAsset?.conditionScore}/100</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetMap;
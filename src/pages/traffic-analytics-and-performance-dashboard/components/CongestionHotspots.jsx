import React from 'react';
import Icon from '../../../components/AppIcon';

const CongestionHotspots = ({ hotspots }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10';
      case 'high': return 'bg-warning/10';
      case 'medium': return 'bg-accent/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted/10';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Congestion Hotspots</h3>
          <p className="text-sm text-muted-foreground">Top congested road segments</p>
        </div>
        <Icon name="MapPin" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {hotspots?.map((hotspot, index) => (
          <div key={hotspot?.id} className="flex items-center space-x-4 p-3 bg-surface rounded-lg hover:bg-muted/50 transition-colors duration-150">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-bold text-sm">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">{hotspot?.location}</h4>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityBg(hotspot?.severity)} ${getSeverityColor(hotspot?.severity)}`}>
                  <Icon name={getSeverityIcon(hotspot?.severity)} size={12} />
                  <span>{hotspot?.severity?.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Delay: {hotspot?.avgDelay} min</span>
                <span>Speed: {hotspot?.avgSpeed} mph</span>
                <span>Volume: {hotspot?.volume}</span>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-1">
              <div className="text-sm font-bold text-foreground">{hotspot?.congestionLevel}%</div>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    hotspot?.congestionLevel >= 80 ? 'bg-error' :
                    hotspot?.congestionLevel >= 60 ? 'bg-warning' :
                    hotspot?.congestionLevel >= 40 ? 'bg-accent' : 'bg-success'
                  }`}
                  style={{ width: `${hotspot?.congestionLevel}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-primary hover:text-primary/80 transition-colors duration-150">
          <Icon name="ExternalLink" size={16} />
          <span>View Full Hotspot Map</span>
        </button>
      </div>
    </div>
  );
};

export default CongestionHotspots;
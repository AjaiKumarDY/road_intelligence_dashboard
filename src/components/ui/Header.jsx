import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [alertCount, setAlertCount] = useState(0);
  const [userRole, setUserRole] = useState('operator');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Network Operations',
      path: '/real-time-network-operations-dashboard',
      icon: 'Activity',
      description: 'Real-time monitoring and incident response'
    },
    {
      label: 'Traffic Analytics',
      path: '/traffic-analytics-and-performance-dashboard',
      icon: 'BarChart3',
      description: 'Performance analysis and pattern recognition'
    },
    {
      label: 'Asset Management',
      path: '/infrastructure-asset-management-dashboard',
      icon: 'Settings',
      description: 'Infrastructure monitoring and maintenance'
    },
    {
      label: 'Emergency Response',
      path: '/emergency-response-coordination-dashboard',
      icon: 'AlertTriangle',
      description: 'Crisis coordination and resource management'
    }
  ];

  const userRoles = [
    { value: 'operator', label: 'Traffic Operator' },
    { value: 'manager', label: 'Transportation Manager' },
    { value: 'supervisor', label: 'Maintenance Supervisor' },
    { value: 'coordinator', label: 'Emergency Coordinator' }
  ];

  useEffect(() => {
    // Simulate WebSocket connection status
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    }, 30000);

    // Simulate alert notifications
    const alertInterval = setInterval(() => {
      setAlertCount(prev => Math.floor(Math.random() * 5));
    }, 15000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(alertInterval);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    setIsUserMenuOpen(false);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'connecting': return 'WifiOff';
      case 'disconnected': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  const isActive = (path) => location?.pathname === path;

  const emergencyNavItem = navigationItems?.find(item => 
    item?.path === '/emergency-response-coordination-dashboard'
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-background border-b border-border">
      <div className="flex items-center h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Route" size={20} color="var(--color-primary-foreground)" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-heading font-semibold text-foreground leading-none">
              Road Intelligence
            </h1>
            <span className="text-xs font-caption text-muted-foreground leading-none">
              Dashboard
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center ml-12 space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative">
              <Button
                variant={isActive(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-200
                  ${isActive(item?.path) 
                    ? 'text-primary-foreground bg-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="mr-2" 
                />
                {item?.label}
              </Button>
              
              {/* Alert Badge for Emergency Response */}
              {item?.path === '/emergency-response-coordination-dashboard' && alertCount > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-error text-error-foreground text-xs font-bold rounded-full animate-pulse-alert">
                  {alertCount}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center ml-auto space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-surface rounded-lg">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={16} 
              className={getConnectionStatusColor()}
            />
            <span className={`text-xs font-data ${getConnectionStatusColor()}`}>
              {connectionStatus?.toUpperCase()}
            </span>
          </div>

          {/* User Role Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-sm"
            >
              <Icon name="User" size={16} />
              <span className="font-medium">
                {userRoles?.find(role => role?.value === userRole)?.label}
              </span>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className={`transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {/* User Role Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-1010">
                <div className="p-2">
                  {userRoles?.map((role) => (
                    <button
                      key={role?.value}
                      onClick={() => handleRoleChange(role?.value)}
                      className={`
                        w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150
                        ${userRole === role?.value 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-popover-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon 
                        name={userRole === role?.value ? "Check" : "User"} 
                        size={16} 
                        className="mr-2" 
                      />
                      {role?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* System Time */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-surface rounded-lg">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-xs font-data text-foreground">
              {new Date()?.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Click outside handler for user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-1000" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
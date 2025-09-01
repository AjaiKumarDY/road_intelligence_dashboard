import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import EmergencyHeader from './components/EmergencyHeader';
import IncidentMap from './components/IncidentMap';
import CommandPanel from './components/CommandPanel';
import ResourceAllocation from './components/ResourceAllocation';
import IncidentTable from './components/IncidentTable';
import CommunicationCenter from './components/CommunicationCenter';
import ResponseAnalytics from './components/ResponseAnalytics';

const EmergencyResponseCoordinationDashboard = () => {
  useEffect(() => {
    document.title = 'Emergency Response Coordination Dashboard - Road Intelligence';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Emergency Header Bar */}
        <EmergencyHeader />
        
        {/* Main Dashboard Grid */}
        <div className="p-6 space-y-6">
          {/* Top Row - Map and Command Panel */}
          <div className="grid grid-cols-1 xl:grid-cols-20 gap-6 h-96">
            {/* Incident Map - 14 columns */}
            <div className="xl:col-span-14">
              <IncidentMap />
            </div>
            
            {/* Command Panel - 6 columns */}
            <div className="xl:col-span-6">
              <CommandPanel />
            </div>
          </div>
          
          {/* Second Row - Resource Allocation and Communication */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
            {/* Resource Allocation */}
            <div>
              <ResourceAllocation />
            </div>
            
            {/* Communication Center */}
            <div>
              <CommunicationCenter />
            </div>
          </div>
          
          {/* Third Row - Incident Management Table */}
          <div className="h-96">
            <IncidentTable />
          </div>
          
          {/* Bottom Row - Response Analytics */}
          <div className="h-96">
            <ResponseAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponseCoordinationDashboard;
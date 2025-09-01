import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EmergencyResponseCoordinationDashboard from './pages/emergency-response-coordination-dashboard';
import TrafficAnalyticsAndPerformanceDashboard from './pages/traffic-analytics-and-performance-dashboard';
import RealTimeNetworkOperationsDashboard from './pages/real-time-network-operations-dashboard';
import InfrastructureAssetManagementDashboard from './pages/infrastructure-asset-management-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmergencyResponseCoordinationDashboard />} />
        <Route path="/emergency-response-coordination-dashboard" element={<EmergencyResponseCoordinationDashboard />} />
        <Route path="/traffic-analytics-and-performance-dashboard" element={<TrafficAnalyticsAndPerformanceDashboard />} />
        <Route path="/real-time-network-operations-dashboard" element={<RealTimeNetworkOperationsDashboard />} />
        <Route path="/infrastructure-asset-management-dashboard" element={<InfrastructureAssetManagementDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

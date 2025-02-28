import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Header from './Header';
import InsightsPanel from './InsightsPanel';
import MetricsPanel from './MetricsPanel';
import VendorPerformance from './VendorPerformance';
import ApproverPerformance from './ApproverPerformance';
import ConversationalAssistant from './ConversationalAssistant';
import ActionableInsights from './ActionableInsights';

const Dashboard = () => {
  const { userRole } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Show different panels based on the user role
  const renderRoleBasedContent = () => {
    switch (userRole) {
      case 'cfo':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ActionableInsights />
            <ConversationalAssistant />
          </div>
        );
        
      case 'controller':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <VendorPerformance />
            <ApproverPerformance />
          </div>
        );
        
      case 'ap-clerk':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <VendorPerformance />
            <ConversationalAssistant />
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-6 overflow-auto">
        <InsightsPanel userRole={userRole} />
        
        <MetricsPanel />
        
        {renderRoleBasedContent()}
        
        {/* Floating chat icon for AI assistant */}
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

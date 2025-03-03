import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = ({ activeTab, setActiveTab }) => {
  const { userRole, setUserRole } = useContext(UserContext);
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h1 className="ml-2 text-2xl font-bold text-gray-800">FinanceIQ</h1>
        </div>
          <div className="flex items-center">
    <SmartNotificationSystem />
    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
      JD
    </div>
  </div>
        <div className="flex items-center">
          <div className="mr-6">
    
            <label htmlFor="roleSelector" className="block text-sm font-medium text-gray-700 mb-1">
              View as:
            </label>
            <select
              id="roleSelector"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="ap-clerk">AP Clerk</option>
              <option value="controller">Controller</option>
              <option value="cfo">CFO</option>
            </select>
          </div>
          
          <div className="relative mx-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Ask anything about your financial data..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </div>
      </div>
      
      
<nav className="mt-4">
  <ul className="flex space-x-6">
    <li>
      <button 
        className={`pb-2 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </button>
    </li>
    <li>
      <button 
        className={`pb-2 ${activeTab === 'vendors' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('vendors')}
      >
        Vendor Analysis
      </button>
    </li>
    <li>
      <button 
        className={`pb-2 ${activeTab === 'approvers' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('approvers')}
      >
        Approver Performance
      </button>
    </li>
    <li>
      <button 
        className={`pb-2 ${activeTab === 'process' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('process')}
      >
        Process Optimization
      </button>
    </li>
    <li>
      <button 
        className={`pb-2 ${activeTab === 'cash-flow' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('cash-flow')}
      >
        Cash Flow Forecasting
      </button>
    </li>
  </ul>
</nav>
    </header>
  );
};

export default Header;

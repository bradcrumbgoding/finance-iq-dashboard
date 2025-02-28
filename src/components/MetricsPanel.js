import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const MetricsPanel = () => {
  // Sample data
  const invoiceProcessingData = [
    { month: 'Jan', avgTime: 3.2, accuracy: 96 },
    { month: 'Feb', avgTime: 3.4, accuracy: 95 },
    { month: 'Mar', avgTime: 3.1, accuracy: 97 },
    { month: 'Apr', avgTime: 2.8, accuracy: 98 },
    { month: 'May', avgTime: 2.6, accuracy: 98 },
    { month: 'Jun', avgTime: 2.3, accuracy: 99 }
  ];
  
  const discrepanciesData = [
    { name: 'Coding errors', value: 45 },
    { name: 'Price mismatches', value: 28 },
    { name: 'Quantity disputes', value: 17 },
    { name: 'Tax calculation', value: 10 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Processing Time Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Invoice Processing Time</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={invoiceProcessingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgTime" stroke="#8884d8" name="Avg. Days" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center">
          <span className="text-green-600 font-medium">↓ 28% improvement</span>
          <span className="text-gray-500 text-sm ml-2">last 6 months</span>
        </div>
      </div>
      
      {/* Accuracy Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Invoice Processing Accuracy</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={invoiceProcessingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#00C49F" name="Accuracy %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center">
          <span className="text-green-600 font-medium">↑ 3% improvement</span>
          <span className="text-gray-500 text-sm ml-2">last 6 months</span>
        </div>
      </div>
      
      {/* Discrepancies */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Invoice Discrepancies</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={discrepanciesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {discrepanciesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;

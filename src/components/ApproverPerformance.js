import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ApproverPerformance = () => {
  // Sample data
  const approverPerformanceData = [
    { name: 'Sarah Johnson', avgTime: 1.2, accuracy: 99, volume: 120 },
    { name: 'Michael Chen', avgTime: 2.1, accuracy: 97, volume: 85 },
    { name: 'Ava Rodriguez', avgTime: 0.8, accuracy: 99, volume: 110 },
    { name: 'Robert Kim', avgTime: 1.5, accuracy: 96, volume: 75 },
    { name: 'Emma Davis', avgTime: 3.2, accuracy: 94, volume: 62 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Approver Performance</h2>
        <div>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Past 30 days</option>
            <option>Past 90 days</option>
            <option>Year to date</option>
          </select>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={approverPerformanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgTime" name="Avg. Days to Approve" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-bold">AI Insight:</span> Emma Davis is taking significantly longer (3.2 days) than the department average (1.7 days) to approve invoices. Consider workflow redistribution or targeted training.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproverPerformance;

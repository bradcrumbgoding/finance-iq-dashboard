// New component: PredictiveCashFlow.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

const PredictiveCashFlow = () => {
  const [forecastPeriod, setForecastPeriod] = useState('90');
  
  // Sample data - in production would be AI-generated predictions
  const cashFlowData = [
    // Historical data (actual)
    { date: '2025-01-01', actual: 120000, forecast: null, lower: null, upper: null },
    { date: '2025-01-08', actual: 115000, forecast: null, lower: null, upper: null },
    { date: '2025-01-15', actual: 135000, forecast: null, lower: null, upper: null },
    { date: '2025-01-22', actual: 142000, forecast: null, lower: null, upper: null },
    { date: '2025-01-29', actual: 130000, forecast: null, lower: null, upper: null },
    { date: '2025-02-05', actual: 128000, forecast: null, lower: null, upper: null },
    { date: '2025-02-12', actual: 145000, forecast: null, lower: null, upper: null },
    { date: '2025-02-19', actual: 150000, forecast: null, lower: null, upper: null },
    { date: '2025-02-26', actual: 138000, forecast: null, lower: null, upper: null },
    
    // Forecasted data
    { date: '2025-03-05', actual: null, forecast: 142000, lower: 132000, upper: 152000 },
    { date: '2025-03-12', actual: null, forecast: 148000, lower: 135000, upper: 160000 },
    { date: '2025-03-19', actual: null, forecast: 155000, lower: 140000, upper: 170000 },
    { date: '2025-03-26', actual: null, forecast: 160000, lower: 142000, upper: 178000 },
    { date: '2025-04-02', actual: null, forecast: 152000, lower: 135000, upper: 170000 },
    { date: '2025-04-09', actual: null, forecast: 163000, lower: 145000, upper: 180000 },
    { date: '2025-04-16', actual: null, forecast: 170000, lower: 150000, upper: 190000 },
    { date: '2025-04-23', actual: null, forecast: 175000, lower: 155000, upper: 195000 },
    { date: '2025-04-30', actual: null, forecast: 168000, lower: 150000, upper: 187000 },
  ];
  
  // Identify potential cash flow pressure points
  const pressurePoints = [
    { date: '2025-03-19', amount: 165000, reason: 'Large vendor payment due (TechVision)' },
    { date: '2025-04-16', amount: 185000, reason: 'Quarterly tax payment' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Predictive Cash Flow Analysis</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Forecast period:</span>
          <select 
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
          </select>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 350 }} className="mb-4">
        <ResponsiveContainer>
          <LineChart data={cashFlowData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => `$${value.toLocaleString()}`}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString();
              }}
            />
            <Legend />
            
            {/* Historical data */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#3B82F6" 
              name="Actual Balance" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Forecast data */}
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#8884d8" 
              name="Predicted Balance" 
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            
            {/* Confidence interval */}
            <ReferenceArea 
              x1="2025-03-05" 
              x2="2025-04-30" 
              y1="lower" 
              y2="upper" 
              fillOpacity={0.1} 
              fill="#8884d8" 
              stroke="none"
            />
            
            {/* Pressure points */}
            {pressurePoints.map((point, index) => (
              <ReferenceLine 
                key={index}
                x={point.date} 
                stroke="red" 
                strokeDasharray="3 3"
                label={{ 
                  value: '!', 
                  position: 'insideTopRight', 
                  fill: 'red',
                  fontSize: 14,
                  fontWeight: 'bold'
                }} 
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <span className="font-bold">AI Insight:</span> Two potential cash flow pressure points identified in the next 60 days. Consider adjusting payment schedules or securing additional short-term financing.
            </p>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-gray-800 mb-2">Potential Cash Flow Issues</h3>
      <div className="space-y-2">
        {pressurePoints.map((point, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{new Date(point.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">{point.reason}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">${point.amount.toLocaleString()}</p>
              <button className="text-sm text-blue-600 hover:text-blue-800">View Options</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveCashFlow;

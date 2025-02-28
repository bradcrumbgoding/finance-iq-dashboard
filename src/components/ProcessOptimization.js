// New component: ProcessOptimization.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProcessOptimization = () => {
  // Sample data for process optimization
  const processingStepsData = [
    { name: 'Receipt', currentTime: 0.5, bestPractice: 0.5, potential: 0 },
    { name: 'Data Entry', currentTime: 1.2, bestPractice: 0.3, potential: 0.9 },
    { name: 'Coding', currentTime: 0.8, bestPractice: 0.4, potential: 0.4 },
    { name: 'Approval Routing', currentTime: 0.4, bestPractice: 0.2, potential: 0.2 },
    { name: 'Approver Review', currentTime: 2.2, bestPractice: 1.0, potential: 1.2 },
    { name: 'Final Validation', currentTime: 0.6, bestPractice: 0.3, potential: 0.3 },
    { name: 'Payment Processing', currentTime: 0.5, bestPractice: 0.3, potential: 0.2 },
  ];
  
  // Calculate total potential savings
  const totalCurrentTime = processingStepsData.reduce((sum, step) => sum + step.currentTime, 0);
  const totalBestPractice = processingStepsData.reduce((sum, step) => sum + step.bestPractice, 0);
  const totalPotentialSavings = totalCurrentTime - totalBestPractice;
  const percentageImprovement = Math.round((totalPotentialSavings / totalCurrentTime) * 100);
  
  // Specific optimization recommendations
  const optimizationRecommendations = [
    {
      area: 'Data Entry',
      recommendation: 'Implement OCR enhancement with AI validation',
      impact: '75% time reduction',
      difficulty: 'Medium',
      roi: 'High'
    },
    {
      area: 'Approver Review',
      recommendation: 'Redesign approval workflows with delegation rules',
      impact: '45% time reduction',
      difficulty: 'Low',
      roi: 'High'
    },
    {
      area: 'Final Validation',
      recommendation: 'Add automated three-way matching',
      impact: '50% time reduction',
      difficulty: 'Medium',
      roi: 'Medium'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Process Optimization Analysis</h2>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {percentageImprovement}% potential improvement
        </div>
      </div>
      
      <div style={{ width: '100%', height: 300 }} className="mb-6">
        <ResponsiveContainer>
          <BarChart
            data={processingStepsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="currentTime" name="Current Process Time" fill="#8884d8" />
            <Bar dataKey="bestPractice" name="Industry Best Practice" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Process Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Current Total Process Time:</span>
              <span className="font-medium">{totalCurrentTime.toFixed(1)} days</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Best Practice Benchmark:</span>
              <span className="font-medium">{totalBestPractice.toFixed(1)} days</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span className="text-blue-700">Potential Time Savings:</span>
              <span className="font-medium text-blue-700">{totalPotentialSavings.toFixed(1)} days ({percentageImprovement}%)</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-bold">AI Insight:</span> The largest improvement opportunities are in Data Entry and Approver Review steps, which account for 78% of potential time savings. Focusing on these areas first will yield the highest ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-gray-800 mb-3">Recommended Optimizations</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process Area</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {optimizationRecommendations.map((rec, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rec.area}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rec.recommendation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rec.impact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rec.difficulty === 'Low' ? 'bg-green-100 text-green-800' : 
                    rec.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {rec.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rec.roi === 'High' ? 'bg-green-100 text-green-800' : 
                    rec.roi === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {rec.roi}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Implement</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessOptimization;

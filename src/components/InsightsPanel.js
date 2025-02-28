import React from 'react';

const InsightsPanel = ({ userRole }) => {
  // Different insights based on user role
  const insights = {
    'ap-clerk': [
      {
        id: 1,
        title: "Processing Time Improvement",
        description: "Invoice processing time has decreased by 28% over the last 6 months. Primary factors: enhanced OCR accuracy and improved approver response times."
      },
      {
        id: 2,
        title: "Duplicate Invoice Alert",
        description: "Potential duplicate detected: Invoice #4512 from TechVision Inc appears to be a duplicate of #4498 with slight variation in description."
      }
    ],
    'controller': [
      {
        id: 1,
        title: "Vendor Performance Alert",
        description: "Global Services showing concerning trend with 7% increase in invoice disputes. Recommend scheduling vendor review meeting to address recurring issues with quantity discrepancies."
      },
      {
        id: 2,
        title: "Process Bottleneck Identified",
        description: "Emma Davis consistently taking 3.2 days for approvals, 2x department average. Recommend workflow adjustment or additional training."
      }
    ],
    'cfo': [
      {
        id: 1,
        title: "Cash Flow Optimization",
        description: "Opportunity to improve cash flow by adjusting payment timing. Projected benefit: $12,450 in additional early payment discounts this quarter."
      },
      {
        id: 2,
        title: "Regional Performance Insight",
        description: "Eastern region showing 18% higher processing costs than other regions. Primary factor appears to be understaffing leading to overtime costs."
      }
    ]
  };
  
  const roleSpecificInsights = insights[userRole] || insights['ap-clerk'];
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600 mr-2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">AI-Generated Insights</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          View All Insights
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roleSpecificInsights.map(insight => (
          <div key={insight.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">{insight.title}</h3>
            <p className="text-gray-600 text-sm">{insight.description}</p>
            <div className="mt-3 flex">
              <button className="text-blue-600 text-sm font-medium mr-4 hover:text-blue-800">Take Action</button>
              <button className="text-gray-500 text-sm hover:text-gray-700">Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;

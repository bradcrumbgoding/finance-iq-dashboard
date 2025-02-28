import React, { useState } from 'react';

const ActionableInsights = () => {
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Duplicate Invoice Detected',
      description: 'Invoice #4512 from TechVision Inc appears to be a duplicate of #4498 with slight variation in description.',
      impact: 'Potential duplicate payment of $8,750',
      actions: ['Investigate', 'Mark as Duplicate', 'Contact Vendor'],
      priority: 'high',
      status: 'new'
    },
    {
      id: 2,
      type: 'optimization',
      title: 'Early Payment Discount Opportunity',
      description: 'Pay Acme Supplies invoice #4523 by Friday to receive 2% discount.',
      impact: 'Potential savings of $420',
      actions: ['Schedule Payment', 'Adjust Cash Flow', 'Skip'],
      priority: 'medium',
      status: 'new'
    },
    {
      id: 3,
      type: 'pattern',
      title: 'Approval Bottleneck',
      description: 'Five invoices waiting for approval from Emma Davis for more than 3 days.',
      impact: 'Processing delays affecting vendor relationships',
      actions: ['Send Reminder', 'Reassign Approvals', 'Adjust Workflow'],
      priority: 'medium',
      status: 'new'
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  
  const handleTakeAction = (insight, action) => {
    // For demo purposes, we'll update the status
    const updatedInsights = insights.map(i => 
      i.id === insight.id ? {...i, status: 'in-progress'} : i
    );
    setInsights(updatedInsights);
    
    // Show the action modal
    setSelectedInsight({...insight, selectedAction: action});
    setShowModal(true);
  };
  
  const dismissInsight = (insightId) => {
    const updatedInsights = insights.map(i => 
      i.id === insightId ? {...i, status: 'dismissed'} : i
    );
    setInsights(updatedInsights);
  };
  
  const completeAction = () => {
    // Update the insight status to "resolved"
    const updatedInsights = insights.map(i => 
      i.id === selectedInsight.id ? {...i, status: 'resolved'} : i
    );
    setInsights(updatedInsights);
    setShowModal(false);
  };
  
  // Icon mapping for insight types
  const getIcon = (type) => {
    switch(type) {
      case 'alert':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'optimization':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
            <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
            <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
            <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
            <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
            <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
          </svg>
        );
      case 'pattern':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">AI-Generated Action Items</h2>
        <div className="flex items-center">
          <button className="flex items-center text-sm text-blue-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filter
          </button>
          <button className="flex items-center text-sm text-blue-600">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights
          .filter(insight => insight.status !== 'dismissed' && insight.status !== 'resolved')
          .map(insight => (
          <div 
            key={insight.id} 
            className={`bg-white rounded-lg border p-4 ${
              insight.priority === 'high' ? 'border-l-4 border-l-red-500' : 
              insight.priority === 'medium' ? 'border-l-4 border-l-orange-500' : 
              'border-l-4 border-l-blue-500'
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-start">
                {getIcon(insight.type)}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  {insight.impact && (
                    <p className="text-sm font-medium text-gray-800 mt-2">Impact: {insight.impact}</p>
                  )}
                </div>
              </div>
              <button 
                onClick={() => dismissInsight(insight.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {insight.actions.map(action => (
                <button
                  key={action}
                  onClick={() => handleTakeAction(insight, action)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-100"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        {insights.filter(insight => insight.status !== 'dismissed' && insight.status !== 'resolved').length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p>All actions have been addressed!</p>
          </div>
        )}
      </div>
      
      {/* Action Modal */}
      {showModal && selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedInsight.selectedAction}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="18" y1="

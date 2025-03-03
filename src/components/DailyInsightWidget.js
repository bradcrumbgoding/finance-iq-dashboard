// New component: DailyInsightWidget.js
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Lightbulb, ArrowRight, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

const DailyInsightWidget = () => {
  const { userRole } = useContext(UserContext);
  const [currentInsight, setCurrentInsight] = useState(null);
  const [insightRating, setInsightRating] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Sample insights for different roles
  const insights = {
    'ap-clerk': [
      {
        id: 1,
        title: "Invoice Batching Strategy",
        content: "Based on your processing patterns, grouping similar vendor invoices together could increase your efficiency by 22%. Try creating dedicated processing times for your top 5 vendors.",
        category: "efficiency",
        actionLink: "View Processing Guide"
      },
      {
        id: 2,
        title: "Exception Pattern Detected",
        content: "In the last month, 68% of your exceptions were related to quantity mismatches. Consider implementing a pre-validation step for quantities against receiving documents.",
        category: "quality",
        actionLink: "View Exception Report"
      },
      {
        id: 3,
        title: "Early Payment Opportunity",
        content: "You're currently capturing only 35% of available early payment discounts. Setting up automatic payment scheduling for discount-eligible invoices could save an additional $4,200 per month.",
        category: "savings",
        actionLink: "Set Up Auto-Scheduling"
      }
    ],
    'controller': [
      {
        id: 4,
        title: "Approval Workflow Optimization",
        content: "Your department's approval cycle takes 2.3 days on average, with 40% of the time spent waiting for the final approver. Consider implementing escalation rules after 24 hours of inactivity.",
        category: "process",
        actionLink: "Modify Workflow Rules"
      },
      {
        id: 5,
        title: "Vendor Consolidation Opportunity",
        content: "Analysis shows you have 12 vendors providing similar office supplies with varying pricing. Consolidating to the top 3 performers could yield 12-15% in cost savings.",
        category: "strategic",
        actionLink: "View Vendor Analysis"
      },
      {
        id: 6,
        title: "Seasonal Volume Planning",
        content: "Based on 3-year historical data, you can expect a 32% increase in invoice volume at quarter-end. Consider resource planning now to avoid processing delays.",
        category: "planning",
        actionLink: "View Seasonal Forecast"
      }
    ],
    'cfo': [
      {
        id: 7,
        title: "Working Capital Improvement",
        content: "Optimizing payment timing could improve working capital by $420K. Your current DPO of 28 days could be extended to 38 days by renegotiating terms with your top 10 suppliers.",
        category: "financial",
        actionLink: "View Financial Impact"
      },
      {
        id: 8,
        title: "Cross-Department Efficiency",
        content: "AP insights show purchasing patterns that could benefit inventory management. Sharing this data with the Inventory team could reduce emergency orders by 24%.",
        category: "collaboration",
        actionLink: "View Data Sharing Options"
      },
      {
        id: 9,
        title: "Predictive Cash Flow Model",
        content: "Your new AI-powered cash flow model has achieved 92% accuracy in its predictions. Consider using it for short-term investment planning to maximize returns on excess cash.",
        category: "innovation",
        actionLink: "Explore Investment Options"
      }
    ]
  };
  
  // Select a random insight based on user role
  useEffect(() => {
    if (insights[userRole]) {
      const randomIndex = Math.floor(Math.random() * insights[userRole].length);
      setCurrentInsight(insights[userRole][randomIndex]);
    }
  }, [userRole]);
  
  // Handle rating
  const handleRating = (isHelpful) => {
    setInsightRating(isHelpful ? 'helpful' : 'not-helpful');
    
    // Show thank you message
    setShowThankYou(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
    
    // In production, send rating to backend
  };
  
  // Handle sharing
  const handleShare = (method) => {
    // In production, implement actual sharing
    setShowShareOptions(false);
    
    // Show thank you for sharing
    setShowThankYou(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };
  
  // If no insight is available
  if (!currentInsight) {
    return null;
  }
  
  // Get background color based on category
  const getCategoryColor = (category) => {
    switch(category) {
      case 'efficiency':
      case 'process':
        return 'bg-blue-50 border-blue-100';
      case 'quality':
      case 'planning':
        return 'bg-purple-50 border-purple-100';
      case 'savings':
      case 'financial':
        return 'bg-green-50 border-green-100';
      case 'strategic':
      case 'innovation':
        return 'bg-indigo-50 border-indigo-100';
      case 'collaboration':
        return 'bg-pink-50 border-pink-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  
  return (
    <div className={`rounded-lg shadow p-4 border ${getCategoryColor(currentInsight.category)}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="font-medium text-gray-800">Daily Insight</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <h4 className="text-sm font-medium text-gray-900 mb-2">{currentInsight.title}</h4>
      <p className="text-sm text-gray-600 mb-4">{currentInsight.content}</p>
      
      <div className="flex items-center justify-between">
        <button className="text-sm text-blue-600 font-medium flex items-center hover:text-blue-800">
          {currentInsight.actionLink}
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
        
        {!insightRating && !showThankYou && (
          <div className="flex items-center space-x-2">
            <button 
              className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
              onClick={() => handleRating(true)}
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button 
              className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
              onClick={() => handleRating(false)}
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {showThankYou && (
          <span className="text-xs text-gray-500 italic">Thank you for your feedback!</span>
        )}
      </div>
      
      {/* Share options popover */}
      {showShareOptions && (
        <div className="absolute mt-2 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
          <div className="text-xs font-medium text-gray-500 mb-1">Share insight with:</div>
          <button 
            className="block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded"
            onClick={() => handleShare('team')}
          >
            Your Team
          </button>
          <button 
            className="block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded"
            onClick={() => handleShare('manager')}
          >
            Your Manager
          </button>
          <button 
            className="block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded"
            onClick={() => handleShare('email')}
          >
            Email to Yourself
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyInsightWidget;

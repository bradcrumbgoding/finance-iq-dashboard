import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConversationalAssistant = () => {
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Financial AI Assistant. How can I help you analyze your financial data today?', visualization: null, actions: [] }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState(null);
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: 'user', content: userInput, visualization: null, actions: [] }]);
    setUserInput('');
    setIsTyping(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const response = processUserQuery(userInput);
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: response.text, 
        visualization: response.visualization, 
        actions: response.actions || [] 
      }]);
      setIsTyping(false);
    }, 1000);
  };
  
  const processUserQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Financial analysis queries
    if (lowerQuery.includes('payment terms') || lowerQuery.includes('early payment')) {
      return {
        text: "I've analyzed your payment terms across vendors. You could save approximately $32,450 annually by optimizing early payment discounts. Currently, you're capturing only 34% of available discounts. The biggest opportunities are with Acme Supplies (2/10 net 30) and Standard Materials (1/10 net 45).",
        visualization: 'payment-terms',
        actions: [
          { label: 'View Discount Opportunities', action: 'viewDiscounts' },
          { label: 'Optimize Payment Schedule', action: 'optimizePayments' }
        ]
      };
    }
    
    // Process improvement queries
    else if (lowerQuery.includes('bottleneck') || lowerQuery.includes('slowest')) {
      return {
        text: "Based on my analysis of 2,543 invoices processed in the last 90 days, the main bottlenecks are in the approval workflow. Specifically:\n\n1. Marketing department approvals take 3.2 days on average (vs. 1.1 days for other departments)\n2. Invoices over $10,000 spend 65% more time in approval cycles\n3. Invoices with incomplete PO information take 2.4x longer to process",
        visualization: 'bottlenecks',
        actions: [
          { label: 'View Detailed Analysis', action: 'viewBottlenecks' },
          { label: 'Get Improvement Recommendations', action: 'improvementRecommendations' }
        ]
      };
    }
    
    // Vendor analysis queries
    else if (lowerQuery.includes('vendor comparison') || lowerQuery.includes('best vendors')) {
      return {
        text: "I've ranked your vendors based on a weighted scoring model including pricing, quality, on-time delivery, and support responsiveness. Your top 3 vendors are:\n\n1. TechVision Inc (92/100) - Exceptional in all categories\n2. Precision Parts (89/100) - Strong on quality and pricing\n3. DataServe (87/100) - Best support responsiveness\n\nGlobal Services ranks lowest at 72/100, primarily due to recent delivery issues and invoice discrepancies.",
        visualization: 'vendor-ranking',
        actions: [
          { label: 'Show Full Vendor Rankings', action: 'vendorRankings' },
          { label: 'Vendor Improvement Opportunities', action: 'vendorImprovement' }
        ]
      };
    }
    
    // Exception handling queries
    else if (lowerQuery.includes('exception') || lowerQuery.includes('errors')) {
      return {
        text: "I've identified patterns in the 163 exceptions that occurred in the last quarter. The most common issues are:\n\n1. Price mismatches (42%) - Primarily with Global Services and LogiTrans\n2. Missing PO references (28%) - Most frequent with new vendors\n3. Duplicate submissions (15%) - Often due to vendor system configuration\n4. Tax calculation errors (9%) - Primarily international vendors\n\nBy addressing the top two categories, you could reduce exceptions by 70%.",
        visualization: 'exceptions',
        actions: [
          { label: 'View Exception Details', action: 'exceptionDetails' },
          { label: 'Get Resolution Recommendations', action: 'resolutionRecommendations' }
        ]
      };
    }
    
    // Forecasting and prediction queries
    else if (lowerQuery.includes('forecast') || lowerQuery.includes('predict') || lowerQuery.includes('next quarter')) {
      return {
        text: "Based on historical patterns and current trends, I forecast:\n\n1. Invoice volume will increase 12-15% next quarter (confidence: high)\n2. Processing costs per invoice will decrease 5-7% (confidence: medium)\n3. Global Services disputes will likely continue to increase without intervention (confidence: high)\n4. You'll need to approve approximately $1.25M in payments by the 15th of next month (confidence: very high)\n\nWould you like me to focus on any specific aspect of this forecast?",
        visualization: 'forecast',
        actions: [
          { label: 'View Detailed Forecast', action: 'viewForecast' },
          { label: 'Generate Cash Flow Projection', action: 'cashFlowProjection' }
        ]
      };
    }
    
    // AI capabilities queries
    else if (lowerQuery.includes('what can you do') || lowerQuery.includes('help me with')) {
      return {
        text: "I can help you with many aspects of financial and AP analytics, including:\n\n• Analyzing vendor performance and relationships\n• Identifying process bottlenecks and optimization opportunities\n• Forecasting cash flow and payment requirements\n• Finding early payment discount opportunities\n• Detecting unusual patterns or exceptions\n• Comparing performance across departments, regions, or time periods\n• Suggesting process improvements\n\nJust ask me what you'd like to know in natural language, and I'll analyze your financial data.",
        visualization: null,
        actions: [
          { label: 'Show Example Questions', action: 'showExamples' }
        ]
      };
    }
    
    // Global Services queries (from existing code)
    else if (lowerQuery.includes('global services') && (lowerQuery.includes('dispute') || lowerQuery.includes('issue'))) {
      return {
        text: "I've analyzed the dispute patterns with Global Services. Their dispute rate (12%) is significantly higher than your average vendor (5.6%). The main issues are quantity discrepancies (63%) and price mismatches (27%). Looking deeper, these issues began increasing after they changed their ERP system in April. Would you like me to draft a communication to address these specific issues with them?",
        visualization: 'global-services-disputes',
        actions: [
          { label: 'Draft Vendor Communication', action: 'draftCommunication' },
          { label: 'Show Dispute History', action: 'showDisputeHistory' }
        ]
      };
    }
    
    // Processing time queries (from existing code)
    else if (lowerQuery.includes('processing time') || lowerQuery.includes('invoice time')) {
      return {
        text: "Invoice processing times have improved consistently over the past 6 months, dropping from 3.2 days in January to 2.3 days in June (28% improvement). This coincides with the implementation of automated validation and the new approval routing algorithm. Exception rates have also decreased by 44%, indicating better accuracy in the process.",
        visualization: 'processing-time',
        actions: [
          { label: 'View Detailed Metrics', action: 'viewProcessingMetrics' },
          { label: 'See Improvement Opportunities', action: 'viewImprovementOpportunities' }
        ]
      };
    }
    
    // Emma Davis / bottleneck queries (from existing code)
    else if (lowerQuery.includes('emma davis') || (lowerQuery.includes('bottleneck') && !lowerQuery.includes('what') && !lowerQuery.includes('where'))) {
      return {
        text: "I've identified Emma Davis as having the longest approval times (3.2 days on average, compared to the department average of 1.7 days). This affects approximately 62 invoices per month. Looking deeper, I notice her approval queue contains many invoices outside her normal department, suggesting a possible workflow configuration issue.",
        visualization: 'emma-davis',
        actions: [
          { label: 'Suggest Workflow Changes', action: 'suggestWorkflowChanges' },
          { label: 'View All Approver Metrics', action: 'viewApproverMetrics' }
        ]
      };
    }
    
    // Default response for other queries
    else {
      return {
        text: "I'd be happy to help with that. Could you provide a bit more context about what specific aspect of the financial data you'd like to analyze? You can ask about vendor performance, processing times, approval workflows, cash flow forecasts, or optimization opportunities.",
        visualization: null,
        actions: [
          { label: 'Show Example Questions', action: 'showExamples' }
        ]
      };
    }
  };
  
  // Helper function to get suggested queries
  const getSuggestedQueries = () => {
    // Different suggestions based on conversation length and context
    if (conversation.length <= 2) {
      return [
        "What can you help me with?",
        "Analyze our vendor performance",
        "Where are our process bottlenecks?",
        "Forecast our AP needs for next quarter"
      ];
    }
    
    const lastMessage = conversation[conversation.length - 1];
    
    if (lastMessage.role === 'assistant' && lastMessage.content.includes('Global Services')) {
      return [
        "What's causing the quantity discrepancies?",
        "Draft a communication to Global Services",
        "Compare Global Services to other vendors",
        "Show me the trend of disputes over time"
      ];
    }
    
    if (lastMessage.role === 'assistant' && lastMessage.visualization === 'forecast') {
      return [
        "Show me cash flow projections",
        "What's driving the invoice volume increase?",
        "How confident are you in these predictions?",
        "Generate a report of these forecasts"
      ];
    }
    
    return [
      "Show monthly trends in invoice volume",
      "Can we optimize our payment terms?",
      "Which department has the slowest approvals?",
      "What's our average processing cost per invoice?"
    ];
  };

  // Handle action button clicks
  const handleActionClick = (action) => {
    let response;
    
    switch(action) {
      case 'showExamples':
        response = {
          text: "Here are some questions you can ask me:\n\n• \"How have our invoice processing times changed?\"\n• \"Why are we seeing more disputes from Global Services?\"\n• \"Where are our biggest process bottlenecks?\"\n• \"Can we optimize our payment terms?\"\n• \"Forecast our cash flow for next quarter\"\n• \"Which vendors need attention?\"\n• \"What exceptions are we seeing in our process?\"",
          visualization: null,
          actions: []
        };
        break;
        
      case 'viewDiscounts':
        response = {
          text: "Here's a detailed breakdown of early payment discount opportunities:\n\n• Acme Supplies: $14,200 potential annual savings (2/10 net 30)\n• Standard Materials: $8,450 potential annual savings (1/10 net 45)\n• Precision Parts: $5,800 potential annual savings (2/15 net 45)\n• LogiTrans: $4,000 potential annual savings (1/15 net 60)\n\nCurrently capturing only 34% of available discounts due to approval delays and payment scheduling.",
          visualization: 'discount-opportunities',
          actions: [
            { label: 'Generate Implementation Plan', action: 'generateDiscountPlan' }
          ]
        };
        break;
        
      case 'viewBottlenecks':
        response = {
          text: "Here's a detailed breakdown of processing bottlenecks:\n\n1. Approval Stage (47% of total time)\n   • Marketing dept: 3.2 days avg (highest)\n   • Finance dept: 1.1 days avg (lowest)\n   • Invoices >$10K: 2.8 days avg\n\n2. Initial Coding (25% of total time)\n   • Non-PO invoices: 1.4 days avg\n   • Incomplete information: 2.1 days avg\n\n3. Exception Resolution (18% of total time)\n   • Price mismatches: 2.3 days avg to resolve\n   • Quantity disputes: 3.1 days avg to resolve",
          visualization: 'detailed-bottlenecks',
          actions: []
        };
        break;
        
      // Add more action handlers as needed
      
      default:
        response = {
          text: "I'm now working on implementing that action. This functionality will be available in a future update.",
          visualization: null,
          actions: []
        };
    }
    
    setConversation([...conversation, { role: 'assistant', content: response.text, visualization: response.visualization, actions: response.actions }]);
  };
  
  // Render visualizations based on type
  const renderVisualization = (type) => {
    switch(type) {
      case 'payment-terms':
        // Sample data for payment terms visualization
        const discountData = [
          { name: 'Captured', value: 34 },
          { name: 'Missed', value: 66 }
        ];
        const COLORS = ['#0088FE', '#FF8042'];
        
        return (
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Early Payment Discount Capture Rate</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={discountData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {discountData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">Potential Annual Savings: $32,450</p>
            </div>
          </div>
        );
        
      case 'bottlenecks':
        // Sample data for bottlenecks visualization
        const bottleneckData = [
          { name: 'Receipt', time: 0.5 },
          { name: 'Coding', time: 0.8 },
          { name: 'Approval', time: 2.2 },
          { name: 'Validation', time: 0.6 },
          { name: 'Payment', time: 0.5 }
        ];
        
        return (
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Process Time by Stage (Days)</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={bottleneckData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      case 'vendor-ranking':
        // Sample data for vendor ranking visualization
        const vendorRankingData = [
          { name: 'TechVision', score: 92 },
          { name: 'Precision', score: 89 },
          { name: 'DataServe', score: 87 },
          { name: 'Acme', score: 84 },
          { name: 'Standard', score: 80 },
          { name: 'LogiTrans', score: 76 },
          { name: 'Global', score: 72 }
        ];
        
        return (
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Vendor Performance Ranking</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <BarChart 
                  data={vendorRankingData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      case 'exceptions':
        // Sample data for exceptions visualization
        const exceptionData = [
          { name: 'Price Mismatch', value: 42 },
          { name: 'Missing PO', value: 28 },
          { name: 'Duplicates', value: 15 },
          { name: 'Tax Errors', value: 9 },
          { name: 'Other', value: 6 }
        ];
        const EXCEPTION_COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8'];
        
        return (
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Exception Types (Last Quarter)</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={exceptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {exceptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={EXCEPTION_COLORS[index % EXCEPTION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      case 'forecast':
        // Sample data for forecast visualization
        const forecastData = [
          { month: 'Jan', invoices: 215 },
          { month: 'Feb', invoices: 240 },
          { month: 'Mar', invoices: 265 },
          { month: 'Apr', invoices: 285 },
          { month: 'May', invoices: 290 },
          { month: 'Jun', invoices: 310 },
          { month: 'Jul', invoices: 330, forecast: true },
          { month: 'Aug', invoices: 350, forecast: true },
          { month: 'Sep', invoices: 365, forecast: true }
        ];
        
        return (
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Invoice Volume Forecast</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="invoices"
                    stroke={(d) => d.forecast ? "#82ca9d" : "#8884d8"}
                    strokeDasharray={(d) => d.forecast ? "5 5" : "0"}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600">Historical</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600">Forecast</span>
              </div>
            </div>
          </div>
        );
        
      case 'global-services-disputes':
      case 'processing-time':
      case 'emma-davis':
      case 'discount-opportunities':
      case 'detailed-bottlenecks':
        // For simplicity, we'll return a placeholder for these visualizations
        return (
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Analysis Visualization</h3>
            <div className="flex items-center justify-center h-48 bg-gray-50 rounded">
              <p className="text-gray-500">Detailed visualization for {type}</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Financial Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-blue-100 text-gray-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              
              {/* Render visualization if present */}
              {message.visualization && (
                <div className="mt-3 bg-white rounded border border-gray-200">
                  {renderVisualization(message.visualization)}
                </div>
              )}
              
              {/* Render action buttons if present */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => handleActionClick(action.action)}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-100"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question about your financial data..."
            className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!userInput.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 disabled:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested questions:</h3>
        <div className="flex flex-wrap gap-2">
          {getSuggestedQueries().map((query, index) => (
            <button 
              key={index}
              onClick={() => setUserInput(query)}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationalAssistant;

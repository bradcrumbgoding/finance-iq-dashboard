import React, { useState, useRef, useEffect } from 'react';

const ConversationalAssistant = () => {
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Financial AI Assistant. How can I help you analyze your financial data today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: 'user', content: userInput }]);
    setUserInput('');
    setIsTyping(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      processUserQuery(userInput);
      setIsTyping(false);
    }, 1000);
  };
  
  const processUserQuery = (query) => {
    let response;
    
    query = query.toLowerCase();
    
    if (query.includes('global services') && (query.includes('dispute') || query.includes('issue'))) {
      response = "I've analyzed the dispute patterns with Global Services. Their dispute rate (12%) is significantly higher than your average vendor (5.6%). The main issues are quantity discrepancies (63%) and price mismatches (27%). Looking deeper, these issues began increasing after they changed their ERP system in April. Would you like me to draft a communication to address these specific issues with them?";
    } 
    else if (query.includes('processing time') || query.includes('invoice time')) {
      response = "Invoice processing times have improved consistently over the past 6 months, dropping from 3.2 days in January to 2.3 days in June (28% improvement). This coincides with the implementation of automated validation and the new approval routing algorithm. Exception rates have also decreased by 44%, indicating better accuracy in the process.";
    }
    else if (query.includes('emma davis') || query.includes('bottleneck')) {
      response = "I've identified Emma Davis as having the longest approval times (3.2 days on average, compared to the department average of 1.7 days). This affects approximately 62 invoices per month. Looking deeper, I notice her approval queue contains many invoices outside her normal department, suggesting a possible workflow configuration issue.";
    }
    else {
      response = "I'd be happy to help with that. Could you provide a bit more context about what specific aspect of the financial data you'd like to analyze?";
    }
    
    setConversation([...conversation, { role: 'user', content: userInput }, { role: 'assistant', content: response }]);
  };
  
  // Helper function to get suggested queries
  const getSuggestedQueries = () => {
    // Different suggestions based on conversation length and context
    if (conversation.length <= 2) {
      return [
        "Why are we seeing more disputes from Global Services?",
        "How has our invoice processing time changed?",
        "Who are our top performing vendors?",
        "What approval bottlenecks exist in our system?"
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
    
    return [
      "Show monthly trends in invoice volume",
      "Identify opportunities for early payment discounts",
      "Which department has the slowest approvals?",
      "What's our average processing cost per invoice?"
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col h-96">
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
              <p className="text-sm">{message.content}</p>
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

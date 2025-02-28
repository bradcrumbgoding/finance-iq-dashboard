import React, { useState } from 'react';

const InsightsPanel = ({ userRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  
  // Different insights based on user role
  const insights = {
    'ap-clerk': [
      {
        id: 1,
        title: "Processing Time Improvement",
        description: "Invoice processing time has decreased by 28% over the last 6 months. Primary factors: enhanced OCR accuracy and improved approver response times.",
        actionTitle: "View Improvement Details",
        actionType: "process-improvement",
      },
      {
        id: 2,
        title: "Duplicate Invoice Alert",
        description: "Potential duplicate detected: Invoice #4512 from TechVision Inc appears to be a duplicate of #4498 with slight variation in description.",
        actionTitle: "Investigate Duplicate",
        actionType: "duplicate-investigation",
      }
    ],
    'controller': [
      {
        id: 1,
        title: "Vendor Performance Alert",
        description: "Global Services showing concerning trend with 7% increase in invoice disputes. Recommend scheduling vendor review meeting to address recurring issues with quantity discrepancies.",
        actionTitle: "Schedule Vendor Review",
        actionType: "vendor-review",
      },
      {
        id: 2,
        title: "Process Bottleneck Identified",
        description: "Emma Davis consistently taking 3.2 days for approvals, 2x department average. Recommend workflow adjustment or additional training.",
        actionTitle: "Optimize Approval Workflow",
        actionType: "workflow-optimization",
      }
    ],
    'cfo': [
      {
        id: 1,
        title: "Cash Flow Optimization",
        description: "Opportunity to improve cash flow by adjusting payment timing. Projected benefit: $12,450 in additional early payment discounts this quarter.",
        actionTitle: "View Payment Optimization Plan",
        actionType: "payment-optimization",
      },
      {
        id: 2,
        title: "Regional Performance Insight",
        description: "Eastern region showing 18% higher processing costs than other regions. Primary factor appears to be understaffing leading to overtime costs.",
        actionTitle: "Review Regional Staffing Model",
        actionType: "regional-staffing",
      }
    ]
  };
  
  const roleSpecificInsights = insights[userRole] || insights['ap-clerk'];
  
  const handleAction = (insight) => {
    setSelectedInsight(insight);
    setShowModal(true);
  };
  
  const handleDismiss = (e, insightId) => {
    e.stopPropagation();
    // In a real application, we would update the state to remove this insight
    console.log('Dismissed insight:', insightId);
  };
  
  // Content for action modals based on action type
  const renderActionContent = () => {
    if (!selectedInsight) return null;
    
    switch(selectedInsight.actionType) {
      case 'process-improvement':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Processing Time Improvement Details</h3>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-800 font-medium">Key improvements over the last 6 months:</p>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process Stage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Before</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">After</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">OCR & Data Capture</td>
                  <td className="px-4 py-3 text-sm text-gray-500">0.8 days</td>
                  <td className="px-4 py-3 text-sm text-gray-500">0.3 days</td>
                  <td className="px-4 py-3 text-sm text-green-600">63% ↓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Approval Routing</td>
                  <td className="px-4 py-3 text-sm text-gray-500">1.2 days</td>
                  <td className="px-4 py-3 text-sm text-gray-500">0.7 days</td>
                  <td className="px-4 py-3 text-sm text-green-600">42% ↓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Final Validation</td>
                  <td className="px-4 py-3 text-sm text-gray-500">1.2 days</td>
                  <td className="px-4 py-3 text-sm text-gray-500">0.8 days</td>
                  <td className="px-4 py-3 text-sm text-green-600">33% ↓</td>
                </tr>
              </tbody>
            </table>
            
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium text-green-800 mb-2">Implemented Changes:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-green-800">
                <li>Enhanced OCR capabilities with AI validation</li>
                <li>Streamlined approval workflow using dynamic routing</li>
                <li>Automated three-way matching for faster validation</li>
              </ul>
            </div>
            
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Export Report
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                View Detailed Analytics
              </button>
            </div>
          </div>
        );
        
      case 'duplicate-investigation':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Duplicate Invoice Investigation</h3>
            
            <div className="bg-yellow-50 p-4 rounded-md mb-4">
              <p className="text-sm text-yellow-800">The AI has detected high similarity between two invoices from TechVision Inc.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 bg-gray-50">
                <h4 className="font-medium text-gray-800 mb-2">Invoice #4498</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">Feb 15, 2025</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">$8,750.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">IT Support Services - February</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Paid (Feb 28)</span>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50">
                <h4 className="font-medium text-gray-800 mb-2">Invoice #4512</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">Feb 15, 2025</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">$8,750.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">IT Support - Feb 2025</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending Approval</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-md">
              <h4 className="font-medium text-red-800 mb-2">AI Analysis:</h4>
              <p className="text-sm text-red-800">98% probability of duplicate invoice. Same amount, same date, similar description, and same vendor. Invoice #4498 has already been paid.</p>
            </div>
            
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Contact Vendor
              </button>
              <button className="flex-1 px-4 py-2 bg-yellow-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-yellow-700">
                Flag as Duplicate
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700">
                Reject Invoice
              </button>
            </div>
          </div>
        );
        
      case 'vendor-review':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Global Services Vendor Review</h3>
            
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-800">Dispute rate increased from 5% to 12% in the last quarter, significantly above your vendor average of 5.6%.</p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <h4 className="font-medium text-gray-800">Dispute Analysis</h4>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occurrences</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Disputes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Quantity Discrepancies</td>
                      <td className="px-4 py-2 text-sm text-gray-500">18</td>
                      <td className="px-4 py-2 text-sm text-gray-500">63%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Price Mismatches</td>
                      <td className="px-4 py-2 text-sm text-gray-500">8</td>
                      <td className="px-4 py-2 text-sm text-gray-500">27%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Tax Calculation Errors</td>
                      <td className="px-4 py-2 text-sm text-gray-500">3</td>
                      <td className="px-4 py-2 text-sm text-gray-500">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">AI-Generated Meeting Agenda:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-blue-800">
                <li>Review of current dispute trends (7% increase this quarter)</li>
                <li>Discussion of quantity discrepancy issues (63% of all disputes)</li>
                <li>Impact of Global Services' recent ERP system change</li>
                <li>Proposed solutions and process improvements</li>
                <li>Action items and follow-up schedule</li>
              </ol>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-gray-800 mb-2">Schedule Vendor Review Meeting</h4>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Date</label>
                  <input type="date" className="border rounded-md w-full p-2" defaultValue="2025-03-10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select className="border rounded-md w-full p-2">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                <input type="text" className="border rounded-md w-full p-2" defaultValue="John Smith (Procurement), Jane Doe (AP), Global Services Account Rep" />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Export Analysis
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                Schedule Meeting & Send Invites
              </button>
            </div>
          </div>
        );
        
      case 'workflow-optimization':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Approval Workflow Optimization</h3>
            
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-yellow-800">Emma Davis is taking 3.2 days on average for approvals, compared to the department average of 1.6 days.</p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <h4 className="font-medium text-gray-800">Approver Workload Analysis</h4>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emma Davis</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dept Average</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Monthly Invoice Volume</td>
                      <td className="px-4 py-2 text-sm text-gray-500">62</td>
                      <td className="px-4 py-2 text-sm text-gray-500">45</td>
                      <td className="px-4 py-2 text-sm text-red-600">+38%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Avg. Approval Time</td>
                      <td className="px-4 py-2 text-sm text-gray-500">3.2 days</td>
                      <td className="px-4 py-2 text-sm text-gray-500">1.6 days</td>
                      <td className="px-4 py-2 text-sm text-red-600">+100%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Off-Department Invoices</td>
                      <td className="px-4 py-2 text-sm text-gray-500">42%</td>
                      <td className="px-4 py-2 text-sm text-gray-500">12%</td>
                      <td className="px-4 py-2 text-sm text-red-600">+30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">AI-Recommended Solutions:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-blue-800">
                <li>Reassign 50% of off-department invoices to their respective department heads</li>
                <li>Implement automated reminders for approvals pending > 2 days</li>
                <li>Consider delegated approval authority for invoices under $1,000</li>
                <li>Verify current workflow configuration (appears to be routing non-marketing invoices to Emma)</li>
              </ol>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-gray-800 mb-2">Workflow Adjustment Options</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" id="option1" defaultChecked />
                  <label htmlFor="option1" className="ml-2 block text-sm text-gray-900">
                    Reassign non-marketing invoices to appropriate approvers
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" id="option2" defaultChecked />
                  <label htmlFor="option2" className="ml-2 block text-sm text-gray-900">
                    Set up escalation for invoices pending > 2 days
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" id="option3" />
                  <label htmlFor="option3" className="ml-2 block text-sm text-gray-900">
                    Create approval delegation rules for invoices under $1,000
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" id="option4" />
                  <label htmlFor="option4" className="ml-2 block text-sm text-gray-900">
                    Schedule approval workflow training session for Emma Davis
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Run Simulation
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                Implement Changes
              </button>
            </div>
          </div>
        );
        
      case 'payment-optimization':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Payment Optimization Plan</h3>
            
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-green-800">Optimizing payment timing could yield $12,450 in additional early payment discounts this quarter.</p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <h4 className="font-medium text-gray-800">Early Payment Discount Opportunities</h4>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terms</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarterly Volume</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Acme Supplies</td>
                      <td className="px-4 py-2 text-sm text-gray-500">2/10 Net 30</td>
                      <td className="px-4 py-2 text-sm text-gray-500">$245,000</td>
                      <td className="px-4 py-2 text-sm text-green-600">$4,900</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Standard Materials</td>
                      <td className="px-4 py-2 text-sm text-gray-500">1/10 Net 45</td>
                      <td className="px-4 py-2 text-sm text-gray-500">$185,000</td>
                      <td className="px-4 py-2 text-sm text-green-600">$1,850</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">TechVision Inc</td>
                      <td className="px-4 py-2 text-sm text-gray-500">2/15 Net 30</td>
                      <td className="px-4 py-2 text-sm text-gray-500">$160,000</td>
                      <td className="px-4 py-2 text-sm text-green-600">$3,200</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Other Vendors</td>
                      <td className="px-4 py-2 text-sm text-gray-500">Various</td>
                      <td className="px-4 py-2 text-sm text-gray-500">$250,000</td>
                      <td className="px-4 py-2 text-sm text-green-600">$2,500</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900" colSpan="3">Total Potential Savings</td>
                      <td className="px-4 py-2 text-sm font-medium text-green-600">$12,450</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">Implementation Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
                <li>Accelerate invoice processing by 1.4 days on average</li>
                <li>Streamline approval workflows for key vendors</li>
                <li>Adjust payment run schedule from bi-weekly to weekly</li>
                <li>Prioritize invoices with early payment terms</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-gray-800 mb-2">Implementation Plan</h4>
              
              <div className="space-y-4 mt-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Phase 1: Process Acceleration (March 10-31)</h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Configure priority routing for discount-eligible invoices</li>
                    <li>Implement automated reminders for approvers</li>
                    <li>Set up streamlined three-way matching for key vendors</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Phase 2: Payment Schedule Adjustment (April 1-15)</h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Move from bi-weekly to weekly payment runs</li>
                    <li>Implement payment optimization algorithm</li>
                    <li>Configure cash flow forecasting alerts</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Phase 3: Vendor Negotiation (April 16-30)</h5>
                  <ul className="mt-1 list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Review terms with top 5 vendors without early payment options</li>
                    <li>Negotiate improved terms when renewing contracts</li>
                    <li>Implement vendor performance tracking</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Export Plan
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                Approve Implementation
              </button>
            </div>
          </div>
        );

        case 'regional-staffing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Eastern Region Staffing Analysis</h3>
            
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-yellow-800">Eastern region processing costs are 18% higher than other regions, primarily due to staffing imbalances and resulting overtime costs.</p>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <h4 className="font-medium text-gray-800">Regional Performance Comparison</h4>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
          <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eastern</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Regions Avg</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Processing Cost per Invoice</td>
                      <td className="px-4 py-2 text-sm text-gray-500">$14.50</td>
                      <td className="px-4 py-2 text-sm text-gray-500">$12.30</td>
                      <td className="px-4 py-2 text-sm text-red-600">+18%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Staff to Invoice Ratio</td>
                      <td className="px-4 py-2 text-sm text-gray-500">1:320</td>
                      <td className="px-4 py-2 text-sm text-gray-500">1:425</td>
                      <td className="px-4 py-2 text-sm text-red-600">-25%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Overtime Hours</td>
                      <td className="px-4 py-2 text-sm text-gray-500">68 hrs/month</td>
                      <td className="px-4 py-2 text-sm text-gray-500">22 hrs/month</td>
                      <td className="px-4 py-2 text-sm text-red-600">+209%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Processing Time</td>
                      <td className="px-4 py-2 text-sm text-gray-500">2.6 days</td>
                      <td className="px-4 py-2 text-sm text-gray-500">2.2 days</td>
                      <td className="px-4 py-2 text-sm text-red-600">+18%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-800 mb-2">Identified Issues:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
                  <li>Understaffing relative to invoice volume</li>
                  <li>Excessive overtime costs ($8,500/month)</li>
                  <li>Higher error rate due to staff overwork (12%)</li>
                  <li>Higher temporary staffing costs</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="font-medium text-green-800 mb-2">Potential Solutions:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-800">
                  <li>Add 2 FTE positions ($110K annual cost)</li>
                  <li>Implement cross-region processing</li>
                  <li>Increase automation in manual steps</li>
                  <li>Reconfigure approval workflows</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-gray-800 mb-2">Staffing Model Optimization</h4>
              
              <div className="mt-3 space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Model A: Add Staff (ROI: 135%)</h5>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <p className="text-xs font-medium text-gray-500">COSTS</p>
                      <p className="text-sm text-gray-900">$110,000 yearly</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">SAVINGS</p>
                      <p className="text-sm text-gray-900">$148,500 yearly</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Model B: Cross-Region Processing (ROI: 220%)</h5>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <p className="text-xs font-medium text-gray-500">COSTS</p>
                      <p className="text-sm text-gray-900">$45,000 yearly</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">SAVINGS</p>
                      <p className="text-sm text-gray-900">$99,000 yearly</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Model C: Hybrid Approach (ROI: 190%)</h5>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <p className="text-xs font-medium text-gray-500">COSTS</p>
                      <p className="text-sm text-gray-900">$72,000 yearly</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">SAVINGS</p>
                      <p className="text-sm text-gray-900">$137,000 yearly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Run Cost Simulation
              </button>
              <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                Implement Model B
              </button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4">
            <p className="text-gray-600">No additional details available for this action.</p>
          </div>
        );
    }
  };
  
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
              <button 
                className="text-blue-600 text-sm font-medium mr-4 hover:text-blue-800"
                onClick={() => handleAction(insight)}
              >
                {insight.actionTitle || "Take Action"}
              </button>
              <button 
                className="text-gray-500 text-sm hover:text-gray-700"
                onClick={(e) => handleDismiss(e, insight.id)}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Modal */}
      {showModal && selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {renderActionContent()}
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="ml-4 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;

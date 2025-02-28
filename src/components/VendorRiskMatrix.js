// New component: VendorRiskMatrix.js
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, ReferenceLine, ReferenceArea } from 'recharts';

const VendorRiskMatrix = () => {
  const [riskThreshold, setRiskThreshold] = useState(50);
  
  // Sample vendor data with risk scores
  const vendorData = [
    { name: 'Acme Supplies', spend: 543000, riskScore: 25, dependencyScore: 65, category: 'Materials' },
    { name: 'TechVision Inc', spend: 321000, riskScore: 15, dependencyScore: 80, category: 'IT Services' },
    { name: 'Global Services', spend: 287000, riskScore: 75, dependencyScore: 60, category: 'Consulting' },
    { name: 'Standard Materials', spend: 195000, riskScore: 40, dependencyScore: 45, category: 'Materials' },
    { name: 'Precision Parts', spend: 176000, riskScore: 35, dependencyScore: 70, category: 'Components' },
    { name: 'LogiTrans', spend: 165000, riskScore: 60, dependencyScore: 40, category: 'Logistics' },
    { name: 'DataServe', spend: 145000, riskScore: 20, dependencyScore: 90, category: 'IT Services' },
    { name: 'Marketing Solutions', spend: 120000, riskScore: 30, dependencyScore: 25, category: 'Marketing' },
    { name: 'Office Suppliers', spend: 95000, riskScore: 10, dependencyScore: 15, category: 'Office' },
    { name: 'Maintenance Co', spend: 85000, riskScore: 45, dependencyScore: 30, category: 'Facilities' },
  ];
  
  // High risk vendors above the threshold
  const highRiskVendors = vendorData.filter(vendor => 
    vendor.riskScore >= riskThreshold || 
    (vendor.riskScore >= 40 && vendor.dependencyScore >= 70)
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Vendor Risk Matrix</h2>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Risk threshold:</span>
          <input 
            type="range" 
            min="10" 
            max="90" 
            value={riskThreshold} 
            onChange={(e) => setRiskThreshold(parseInt(e.target.value))}
            className="mr-2"
          />
          <span className="text-sm font-medium">{riskThreshold}</span>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 400 }} className="mb-4">
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="riskScore" 
              name="Risk Score" 
              domain={[0, 100]}
              label={{ value: 'Risk Score', position: 'bottom' }}
            />
            <YAxis 
              type="number" 
              dataKey="dependencyScore" 
              name="Dependency Score" 
              domain={[0, 100]}
              label={{ value: 'Dependency Score', angle: -90, position: 'left' }}
            />
            <ZAxis 
              type="number" 
              dataKey="spend" 
              range={[50, 400]} 
              name="Annual Spend" 
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'Annual Spend') return `$${value.toLocaleString()}`;
                return value;
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
                      <p className="font-medium">{payload[0].payload.name}</p>
                      <p className="text-sm">Category: {payload[0].payload.category}</p>
                      <p className="text-sm">Risk Score: {payload[0].payload.riskScore}</p>
                      <p className="text-sm">Dependency: {payload[0].payload.dependencyScore}</p>
                      <p className="text-sm">Annual Spend: ${payload[0].payload.spend.toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            
            {/* Reference lines for quadrants */}
            <ReferenceArea x1={50} x2={100} y1={50} y2={100} fill="rgba(255,0,0,0.1)" />
            <ReferenceArea x1={0} x2={50} y1={50} y2={100} fill="rgba(255,165,0,0.1)" />
            <ReferenceLine x={50} stroke="gray" strokeDasharray="3 3" />
            <ReferenceLine y={50} stroke="gray" strokeDasharray="3 3" />
            
            <Scatter 
              name="Vendors" 
              data={vendorData} 
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-red-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-1">High Risk & High Dependency</h3>
          <p className="text-sm text-gray-600">Critical vendors that require mitigation plans</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-1">Low Risk & High Dependency</h3>
          <p className="text-sm text-gray-600">Strategic partners to maintain relationships with</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-1">High Risk & Low Dependency</h3>
          <p className="text-sm text-gray-600">Consider alternative suppliers or increased monitoring</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-1">Low Risk & Low Dependency</h3>
          <p className="text-sm text-gray-600">Standard vendor management protocols</p>
        </div>
      </div>
      
      {highRiskVendors.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-800 mb-2">High Risk Vendors Requiring Attention</h3>
          <div className="space-y-2">
            {highRiskVendors.map((vendor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{vendor.name}</p>
                  <p className="text-sm text-gray-600">{vendor.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">Risk Score: {vendor.riskScore}</p>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View Risk Assessment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRiskMatrix;

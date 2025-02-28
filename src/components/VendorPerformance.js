import React, { useState } from 'react';

const VendorPerformance = () => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Sample data
  const vendorPerformanceData = [
    { name: 'Acme Supplies', accuracy: 98, onTime: 96, disputes: 2, spend: 543000 },
    { name: 'TechVision Inc', accuracy: 99, onTime: 99, disputes: 0, spend: 321000 },
    { name: 'Global Services', accuracy: 92, onTime: 87, disputes: 7, spend: 287000 },
    { name: 'Standard Materials', accuracy: 96, onTime: 94, disputes: 3, spend: 195000 },
    { name: 'Precision Parts', accuracy: 97, onTime: 91, disputes: 4, spend: 176000 }
  ];
  
  // Sort data
  const sortedData = [...vendorPerformanceData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });
  
  // Handle sort
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Vendor Performance</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search vendors..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Vendor
                {sortField === 'name' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('accuracy')}
              >
                Accuracy
                {sortField === 'accuracy' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('onTime')}
              >
                On-Time
                {sortField === 'onTime' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('disputes')}
              >
                Disputes
                {sortField === 'disputes' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((vendor, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{vendor.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vendor.accuracy > 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vendor.accuracy}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vendor.onTime > 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vendor.onTime}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vendor.disputes < 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vendor.disputes}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Details</button>
                  <button className="text-blue-600 hover:text-blue-800">Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorPerformance;

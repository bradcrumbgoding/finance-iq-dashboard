// New component: SmartNotificationSystem.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Bell, X, Zap, Check, Clock, Calendar, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';

const SmartNotificationSystem = () => {
  const { userRole } = useContext(UserContext);
  const [showPanel, setShowPanel] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const panelRef = useRef(null);
  
  // Notification categories
  const categories = {
    all: 'All',
    action: 'Action Required',
    insight: 'New Insights',
    achievement: 'Achievements',
    system: 'System'
  };
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Generate notifications based on user role
  useEffect(() => {
    // In production, these would come from backend
    const currentDate = new Date();
    
    const baseNotifications = [
      {
        id: 1,
        type: 'action',
        title: 'Invoice approval pending',
        description: '5 invoices need your review and approval',
        time: new Date(currentDate.getTime() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        read: false,
        priority: 'high',
        action: 'View Invoices'
      },
      {
        id: 2,
        type: 'insight',
        title: 'Process improvement detected',
        description: 'Invoice processing time has decreased by 28% this month',
        time: new Date(currentDate.getTime() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        read: true,
        priority: 'medium',
        action: 'View Details'
      },
      {
        id: 3,
        type: 'achievement',
        title: 'Achievement unlocked!',
        description: 'You\'ve earned "Processing Speed Master" for maintaining fast processing times',
        time: new Date(currentDate.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        read: false,
        priority: 'low',
        action: 'View Achievement'
      },
      {
        id: 4,
        type: 'system',
        title: 'System update completed',
        description: 'New features are now available in your dashboard',
        time: new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        read: true,
        priority: 'low',
        action: 'Learn More'
      }
    ];
    
    // Controller-specific notifications
    if (userRole === 'controller') {
      baseNotifications.unshift({
        id: 5,
        type: 'action',
        title: 'Vendor performance review',
        description: 'Global Services performance is 15% below target',
        time: new Date(currentDate.getTime() - 1000 * 60 * 45).toISOString(), // 45 mins ago
        read: false,
        priority: 'high',
        action: 'Review Vendor'
      });
    }
    
    // CFO-specific notifications
    if (userRole === 'cfo') {
      baseNotifications.unshift({
        id: 6,
        type: 'insight',
        title: 'Cash flow forecast updated',
        description: 'Potential cash flow pressure point detected on March 15',
        time: new Date(currentDate.getTime() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        read: false,
        priority: 'high',
        action: 'View Forecast'
      });
    }
    
    setNotifications(baseNotifications);
    const unread = baseNotifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
    
    // Show welcome modal on first load
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, [userRole]);
  
  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef]);
  
  // Handle marking notification as read
  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev - 1);
    
    // In production, would call API to mark as read
  };
  
  // Filter notifications by category
  const filteredNotifications = activeCategory === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeCategory);
  
  // Format time string
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const now = new Date();
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  // Render icon based on notification type
  const renderIcon = (type, priority) => {
    switch(type) {
      case 'action':
        return <Clock className={`h-5 w-5 ${priority === 'high' ? 'text-red-500' : 'text-blue-500'}`} />;
      case 'insight':
        return <PieChart className="h-5 w-5 text-purple-500" />;
      case 'achievement':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button 
          className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setShowPanel(!showPanel)}
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        
        {/* Notification Panel */}
        {showPanel && (
          <div 
            ref={panelRef}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Notifications</h3>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-blue-100 rounded">
                  <Check className="h-4 w-4 text-blue-600" />
                </button>
                <button 
                  className="p-1 hover:bg-blue-100 rounded"
                  onClick={() => setShowPanel(false)}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
      
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Welcome to the Improved Dashboard!</h3>
              <button 
                onClick={() => setShowWelcomeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-700">
                  We've added powerful new features to help you improve your processes and track your performance.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Personal Improvement Hub</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Track your achievements, take on challenges, and follow your personalized improvement plan.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Smart Notifications</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Stay informed with relevant updates, action items, and achievements tailored to your role.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <PieChart className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Interactive Analytics</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Explore your data with new interactive visualization tools and AI-powered insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartNotificationSystem;
            </div>
            
            {/* Category Filter */}
            <div className="flex p-2 bg-gray-50 overflow-x-auto">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  className={`px-3 py-1 text-xs font-medium rounded-full mr-2 whitespace-nowrap ${
                    activeCategory === key
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(key)}
                >
                  {label} {key === 'all' && unreadCount > 0 && `(${unreadCount})`}
                </button>
              ))}
            </div>
            
            {/* Notification List */}
            <div className="overflow-y-auto max-h-80">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        {renderIcon(notification.type, notification.priority)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{formatTime(notification.time)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        <div className="mt-2">
                          <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                            {notification.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p>No notifications in this category</p>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-gray-50 text-center border-t">
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        )}
      </div>

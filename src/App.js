import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { UserContext } from './context/UserContext';

const App = () => {
  const [userRole, setUserRole] = useState('ap-clerk'); // Default role

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

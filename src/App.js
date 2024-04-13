import './App.css';
import React, { useEffect, useState, } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import SidebarData from '~/constants/Sidebar';
import { Sidebar, } from '~/components';

function App() {
  const [isLoggedIn, setIsLoggedIn,] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    setIsLoggedIn(!!accessToken);
  });

  return (
    <Router>
      <div className='App'>
        {isLoggedIn && <Sidebar />}
        <div id='content'>
          <Routes>
            {SidebarData.map((item, index) => (
              <Route key={index} path={item.path} element={<item.page setIsLoggedIn={setIsLoggedIn} />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

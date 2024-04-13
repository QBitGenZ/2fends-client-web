import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import SidebarData from '~/constants/Sidebar';
import { Sidebar, } from '~/components'; // Import mảng Sidebar từ file Sidebar.js

function App() {
  return (
    <Router>
      <div className='App'>
        <Sidebar/>
        <div id='content'>
          <Routes>
            {SidebarData.map((item, index) => (
              <Route key={index} path={item.path} element={<item.page/>} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

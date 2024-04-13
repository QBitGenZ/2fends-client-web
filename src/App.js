import './App.css';
import React, { useLayoutEffect, useState, } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import SidebarData from '~/constants/Sidebar';
import { Sidebar, } from '~/components'; // Import mảng Sidebar từ file Sidebar.js
// import { Login, } from '~/pages'; // Import trang Login

function App() {
  const [ login, setLogin, ] = useState(false);
  useLayoutEffect(() => {
    const access = localStorage.getItem('access');
    console.log(access);
    if (!access) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, []);
  console.log(login);
  return (
    <Router>
      <div className='App'>
        {login && <Sidebar />}
        <div id='content'>
          <Routes>
            {SidebarData.map((item, index) => (
              <Route key={index} path={item.path} element={<item.page />} />
            ))}
            {/* <Route path='/login' element={<Login />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
import React, { useEffect, useState, } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { Logins1, Logins2, } from './components';
export default function Login({ setIsLoggedIn, }) {
  const [activeComponent, setActiveComponent,] = useState('Component1');

  useEffect(() => {
    localStorage.removeItem('access');
    setIsLoggedIn(false);
  }, []);
  return (
    <>
      {activeComponent === 'Component1' && (
        <Logins1
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === 'Component2' && (
        <Logins2 setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func,
};

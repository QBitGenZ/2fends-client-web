import React from 'react';
import PropTypes from 'prop-types';
export default function Logins1({ activeComponent, setActiveComponent, }) {
  const handleComponentChange = () => {
    setActiveComponent(
      activeComponent === 'Component1' ? 'Component2' : 'Component1'
    );
  };
  return (
    <div className={'login-container'}>
      <div className={'login-smallcontainer3'}>
        <img
          className={'sunflower'}
          src={process.env.PUBLIC_URL + 'assets/images/commons/sunflower.jpg'}
        ></img>
      </div>
      <div className={'login-smallcontainer2'}>
        <div className={'smallercontainer'}>
          <img
            className='logologin'
            src={process.env.PUBLIC_URL + 'assets/images/commons/logo.png'}
            alt={'logo'}
          />
        </div>
        <p className='dangnhap' onClick={handleComponentChange}>
          ĐĂNG NHẬP
        </p>
      </div>
    </div>
  );
}

Logins1.propTypes = {
  activeComponent: PropTypes.string,
  setActiveComponent: PropTypes.func,
};

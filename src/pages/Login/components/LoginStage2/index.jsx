import React, { useState, } from 'react';
import { useNavigate, } from 'react-router-dom';
import PropTypes from 'prop-types';
export default function Logins2({ setIsLoggedIn, }) {
  const navigation = useNavigate();
  const [username, setUsername,] = useState('');
  const [password, setPassword,] = useState('');
  // useEffect(() => {
  //   const keyDownHandler = event => {
  //     console.log('User pressed: ', event.key);

  //     if (event.key === 'Enter') {
  //       logine();
  //     }
  //   };
  //   document.addEventListener('keydown', keyDownHandler);
  // }, []);
  function logine(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    console.log(username);
    console.log(password);
    fetch(`${process.env.REACT_APP_HOST_IP}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject('Không đúng thông tin đăng nhập');
      })
      .then((data) => {
        localStorage.setItem('access', data?.access);
        navigation('/');
        setIsLoggedIn(true);
      })
      .catch((error) => alert(error));
  }
  return (
    <>
      <div className={'login-container'}>
        <div className={'login-smallcontainer3'}>
          <div>
            <img
              className='logologin'
              src={process.env.PUBLIC_URL + 'assets/images/commons/logo.png'}
              alt={'logo'}
            />
          </div>
          <div>
            <p className='truycap'>TRUY CẬP VÀO TÀI KHOẢN CỦA BẠN</p>
          </div>
          <div>
            <input
              className='loginfeild loginusername'
              type='text'
              id='username'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='TÊN TÀI KHOẢN'
            />
          </div>
          <div>
            <input
              className='loginfeild'
              type='password'
              id='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='MẬT KHẨU'
            />
          </div>
          <div className='loginbtn' onClick={logine}>
            <p className='loginene'>ĐĂNG NHẬP</p>
          </div>
        </div>
        <div className={'login-smallcontainer2'}>
          <img
            className='sunflower'
            src={process.env.PUBLIC_URL + 'assets/images/commons/sunflower.jpg'}
          ></img>
        </div>
      </div>
    </>
  );
}

Logins2.propTypes = {
  setIsLoggedIn: PropTypes.func,
};

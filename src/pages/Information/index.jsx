import React, { useState, useEffect, } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { HeadTitle, } from '~/components';
export default function Information() {
  const [info, setInfo,] = useState([]);
  const [mainStage, setMainStge,] = useState(true);
  const [updatesStage, setUpdateStage,] = useState(false);
  const [changePassStage, setChangePassStage,] = useState(false);
  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = async () => {
    await fetch(`${process.env.REACT_APP_HOST_IP}/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.data);
      })
      .catch((error) => console.log(error));
  };

  const updateInfo = () => {
    setMainStge(false);
    setUpdateStage(true);
  };
  const changePass = () => {
    setMainStge(false);
    setChangePassStage(true);
  };
  console.log(info);
  return (
    <div id={'personal-information'}>
      {mainStage && (
        <>
          <div className={'infopage-title'}>
            <HeadTitle>Thông tin tài khoản</HeadTitle>
          </div>
          <table className={'info-table'}>
            <tr>
              <td className={'info-th'}>Tên tài khoản</td>
              <td>{info?.username}</td>
            </tr>
            <tr>
              <td className={'info-th'}>Tên người dùng</td>
              <td>{info?.full_name}</td>
            </tr>
            <tr>
              <td className={'info-th'}>Ngày sinh</td>
              <td>{info?.birthday}</td>
            </tr>
            <tr>
              <td className={'info-th'}>Giới tính</td>
              <td>{info?.is_female ? 'Nữ' : 'Nam'}</td>
            </tr>
            <tr>
              <td className={'info-th'}>Số điện thoại</td>
              <td>{info?.phone}</td>
            </tr>
            <tr>
              <td className={'info-th'}>Email</td>
              <td>{info?.email}</td>
            </tr>
          </table>
          <div>
            <button className={'update-btn'} onClick={updateInfo}>
              Chỉnh sửa thông tin
            </button>
            <button className={'changepass-btn'} onClick={changePass}>
              Đổi mật khẩu
            </button>
          </div>
        </>
      )}
      {updatesStage && (
        <UpdateInformation
          info={info}
          getInfo={getInfo}
          setMainStge={setMainStge}
          updatesStage={updatesStage}
          setUpdateStage={setUpdateStage}
        />
      )}
      {changePassStage && (
        <ChangePassword
          info={info}
          setMainStge={setMainStge}
          setChangePassStage={setChangePassStage}
          getInfo={getInfo}
        />
      )}
    </div>
  );
}

function UpdateInformation({ info, getInfo, setMainStge, setUpdateStage, }) {
  const [username, setUsername,] = useState(info?.username);
  const [full_name, setFullname,] = useState(info?.full_name);
  const [birthday, setBirthday,] = useState(info?.birthday);
  const [gender, setGender,] = useState(info.is_female);
  const [phone, setPhone,] = useState(info?.phone);
  const [email, setEmail,] = useState(info?.email);
  function changeInfor(e) {
    e.preventDefault();
    const form = new FormData();
    console.log(info);
    form.append('email', email);
    form.append('full_name', full_name);
    form.append('phone', phone);
    form.append('is_female', gender);
    form.append('birthday', birthday);
    fetch(`${process.env.REACT_APP_HOST_IP}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject('Thông tin không hợp lệ');
      })
      .then((res) => res.json)
      .then(() => getInfo())
      .catch((error) => alert(error));
  }
  const backMainStage = () => {
    setUpdateStage(false);
    setMainStge(true);
  };
  return (
    <>
      <div id={'personal-information'}>
        <div className={'infopage-title'}>
          <div className={'info-title'}>
            <p>THÔNG TIN TÀI KHOẢN</p>
          </div>
        </div>
        <table className={'info-table'}>
          <tr>
            <td className={'info-th'}>Tên tài khoản</td>
            <td>
              <input
                type='text'
                id='full_name'
                name='full_name'
                className={'updatefield'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Tên người dùng</td>
            <td>
              <input
                type='text'
                id='full_name'
                name='full_name'
                className={'updatefield'}
                value={full_name}
                onChange={(e) => setFullname(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Ngày sinh</td>
            <td>
              <input
                type='date'
                id='birthday'
                name='birthday'
                className='updatefield'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Giới tính</td>
            <td>
              <input
                name='gender'
                value={gender}
                className='updatefield'
                onChange={(e) => setGender(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Số điện thoại</td>
            <td>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='updatefield'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Email</td>
            <td>
              <input
                type='email'
                id='email'
                name='email'
                className='updatefield'
                value={email}
                placeholder='Enter your email address'
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
        </table>
        <div>
          <button className={'update-btn'} onClick={backMainStage}>
            Hủy
          </button>
          <button className={'changepass-btn'} onClick={changeInfor}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </>
  );
}

function ChangePassword({ info, setMainStge, setChangePassStage, getInfo, }) {
  const [oldpass, setOldPass,] = useState();
  const [newpass, setNewPass,] = useState();
  const [confirm, setConfirm,] = useState();

  function changeInfor(e) {
    e.preventDefault();
    const form = new FormData();
    console.log(info);
    form.append('oldpass', oldpass);
    form.append('newpass', newpass);
    form.append('confirm', confirm);
    fetch(`${process.env.REACT_APP_HOST_IP}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject('Thông tin không hợp lệ');
      })
      .then((res) => res.json)
      .then(() => getInfo())
      .catch((error) => alert(error));
  }
  const backMainStage = () => {
    setChangePassStage(false);
    setMainStge(true);
  };

  return (
    <>
      <div id={'personal-information'}>
        <div className={'infopage-title'}>
          <div className={'info-title'}>
            <p>THÔNG TIN TÀI KHOẢN</p>
          </div>
        </div>
        <table className={'info-table'}>
          <tr>
            <td className={'info-th'}>Mật khẩu cũ</td>
            <td>
              <input
                type='text'
                id='full_name'
                name='full_name'
                className={'updatefield'}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Mật khẩu cũ</td>
            <td className={'info-th'}>
              <input
                type='text'
                id='full_name'
                name='full_name'
                className={'updatefield'}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className={'info-th'}>Xác nhận mật khẩu</td>
            <td className={'info-th'}>
              <input
                type='text'
                id='full_name'
                name='full_name'
                className={'updatefield'}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </td>
          </tr>
        </table>
        <div>
          <button className={'update-btn'} onClick={backMainStage}>
            Hủy
          </button>
          <button className={'changepass-btn'} onClick={changeInfor}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </>
  );
}

UpdateInformation.propTypes = {
  info: PropTypes.object,
  getInfo: PropTypes.func,
  setMainStge: PropTypes.func,
  setUpdateStage: PropTypes.func,
};

ChangePassword.propTypes = {
  info: PropTypes.object,
  setMainStge: PropTypes.func,
  setChangePassStage: PropTypes.func,
  getInfo: PropTypes.func,
};

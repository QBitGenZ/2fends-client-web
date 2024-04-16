import React, { useState, } from 'react';
import { HeadTitle, } from '~/components';
import PropTypes from 'prop-types';
export default function UpdateInformation({
  info,
  getInfo,
  setMainStge,
  setUpdateStage,
}) {
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
        if (res.status === 200) return (
          res.json(),
          alert('Chỉnh sửa thông tin thành công'),
          backMainStage()
        );
        else return Promise.reject('Không đúng thông tin');
      })
      .then(() => getInfo())
      .catch((error) => alert(error));
  }
  const backMainStage = () => {
    setUpdateStage(false);
    setMainStge(true);
  };
  return (
    <>
      <div className={'infopage-title'}>
        <HeadTitle>Thông tin tài khoản</HeadTitle>
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
    </>
  );
}

UpdateInformation.propTypes = {
  info: PropTypes.object,
  getInfo: PropTypes.func,
  setMainStge: PropTypes.func,
  setUpdateStage: PropTypes.func,
};

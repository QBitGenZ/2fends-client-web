import React, { useState, } from 'react';
import { HeadTitle, } from '~/components';
import PropTypes from 'prop-types';
export default function ChangePassword({
  info,
  setMainStge,
  setChangePassStage,
  getInfo,
}) {
  const [oldpass, setOldPass,] = useState();
  const [newpass, setNewPass,] = useState();
  const [confirm, setConfirm,] = useState();

  function changeInfor(e) {
    if(confirm != newpass) {
      return alert('Không khớp');
    }
    e.preventDefault();
    const form = new FormData();
    console.log(info);
    form.append('old_password', oldpass);
    form.append('new_password', newpass);
    fetch(`${process.env.REACT_APP_HOST_IP}/change-password`, {
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
      <div className={'infopage-title'}>
        <HeadTitle>Thông tin tài khoản</HeadTitle>
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
    </>
  );
}

ChangePassword.propTypes = {
  info: PropTypes.object,
  setMainStge: PropTypes.func,
  setChangePassStage: PropTypes.func,
  getInfo: PropTypes.func,
};

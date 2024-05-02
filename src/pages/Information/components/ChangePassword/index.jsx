import React, { useState, } from 'react';
import { HeadTitle, } from '~/components';
import PropTypes from 'prop-types';
export default function ChangePassword({
  setMainStge,
  setChangePassStage,
  getInfo,
}) {
  const [oldpass, setOldPass,] = useState();
  const [newpass, setNewPass,] = useState();
  const [confirm, setConfirm,] = useState();

  function changeInfor() {
    if(confirm != newpass) {
      return alert('Không khớp');
    }
    if(newpass.length<8){
      return alert('Mật khẩu phải lớn hơn 8 ký tự');
    }
    const form = new FormData();
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
        if (res.status === 200){
          alert('Thay đổi mật khẩu thành công');
          getInfo();
          backMainStage();
        }
        else return Promise.reject('Thông tin không hợp lệ');
      })
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
              type='password'
              id='full_name'
              name='full_name'
              className={'updatefield'}
              onChange={(e) => setOldPass(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td className={'info-th'}>Mật khẩu mới</td>
          <td className={'info-th'}>
            <input
              type='password'
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
              type='password'
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

import React, { useState, useEffect, } from 'react';
import './index.css';
import { HeadTitle, } from '~/components';
import { UpdateInformation, ChangePassword, } from './components';
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


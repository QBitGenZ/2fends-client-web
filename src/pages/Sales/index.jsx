import React, { useState, useEffect, } from 'react';
import { SelectItemBox, Title, } from '~/components';
import './index.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, } from '@fortawesome/free-solid-svg-icons';
export default function Sales() {
  const [mainstage, setMainStage,] = useState(true);
  const [stage1, setStage1,] = useState(false);
  const [stage2, setStage2,] = useState(false);

  const openS1 = () => {
    setStage1(true);
    setMainStage(false);
  };
  return (
    <>
      {mainstage && (
        <div id={'sales'}>
          <div className={'page-title'}>
            <div className='sales-title'>
              <p>Đăng bán sản phẩm</p>
            </div>
          </div>
          <div className={'mainstage-button'} onClick={openS1}>
            <p>Đăng sản phẩm mới</p>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Danh sách sản phẩm</Title>
            </div>
            <div>
              <SelectItemBox>Nam</SelectItemBox>
              <SelectItemBox>Nữ</SelectItemBox>
              <SelectItemBox>Unisex</SelectItemBox>
            </div>
          </div>
        </div>
      )}
      {stage1 && (
        <SaleStage1
          stage1={stage1}
          setMainStage={setMainStage}
          setStage1={setStage1}
          setStage2={setStage2}
        />
      )}
      {stage2 && (
        <SaleStage2
          stage2={stage2}
          setStage2={setStage2}
          setStage1={setStage1}
        />
      )}
    </>
  );
}

function SaleStage1({ stage1, setStage1, setStage2, setMainStage, }) {
  const [types, setType,] = useState([]);
  useEffect(() => {
    getTypes();
  }, []);
  const getTypes = async () => {
    await fetch(`${process.env.REACT_APP_HOST_IP}/products/types/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setType(data.data);
      })
      .catch((error) => console.log(error));
  };
  const openS2 = () => {
    setStage1(false);
    setStage2(true);
  };
  const backMainStage = () => {
    setStage1(false);
    setMainStage(true);
  };
  return (
    <>
      {stage1 && (
        <div id={'sales'}>
          <div className={'page-title'}>
            <div className='sales-title'>
              <p
                style={{
                  paddingRight: 5,
                }}
                onClick={backMainStage}
              >
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
              </p>
              <p>Đăng bán sản phẩm</p>
            </div>
            <div className={'sales-next'} onClick={openS2}>
              <p>Tiếp theo</p>
              <p>
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
              </p>
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Giới tính</Title>
            </div>
            <div>
              <SelectItemBox>Nam</SelectItemBox>
              <SelectItemBox>Nữ</SelectItemBox>
              <SelectItemBox>Unisex</SelectItemBox>
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Loại sản phẩm</Title>
            </div>
            <div>
              {types?.map((type) => (
                <SelectItemBox key={type?.id}>{type?.name}</SelectItemBox>
              ))}
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Kích cỡ</Title>
            </div>
            <div>
              <SelectItemBox>S</SelectItemBox>
              <SelectItemBox>M</SelectItemBox>
              <SelectItemBox>L</SelectItemBox>
              <SelectItemBox>XL</SelectItemBox>
              <SelectItemBox>2XL</SelectItemBox>
              <SelectItemBox>3XL</SelectItemBox>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SaleStage2({ stage2, setStage2, setStage1, }) {
  const backStage1 = () => {
    setStage2(false);
    setStage1(true);
  };
  return (
    <>
      {stage2 && (
        <div id={'sales'}>
          <div className={'page-title'}>
            <div className='sales-title' onClick={backStage1}>
              <p
                style={{
                  paddingRight: 5,
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
              </p>
              <p>Đăng bán sản phẩm</p>
            </div>
            <div className={'sales-next'}>
              <p>Tiếp theo</p>
              <p>
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
              </p>
            </div>
          </div>
          <div id={'Add-Product'}>
            <label>Tên sản phẩm</label>
            <textarea rows={2} />
            <label>Giá sản phẩm</label>
            <textarea rows={2} />
            <label>Mô tả sản phẩm</label>
            <textarea rows={2} />
            <label>Hình ảnh</label>
            <input
              className={'input-password'}
              type='file'
              multiple
              rows={2}
            />
          </div>
        </div>
      )}
    </>
  );
}

SaleStage1.propTypes = {
  stage1: PropTypes.boolean,
  setStage1: PropTypes.func,
  setStage2: PropTypes.func,
  setMainStage: PropTypes.func,
};

SaleStage2.propTypes = {
  stage2: PropTypes.boolean,
  setStage2: PropTypes.func,
  setStage1: PropTypes.func,
};

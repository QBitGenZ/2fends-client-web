import React, { useState, useEffect, } from 'react';
import { SelectItemBox, Title, } from '~/components';
import './index.css';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleRight, } from '@fortawesome/free-solid-svg-icons';
export default function Sales() {
  const [mainstage, setMainStage,] = useState(true);
  const [stage1, setStage1,] = useState(false);
  const openS1 = () => {
    setStage1(true);
    setMainStage(false);
  };
  return (
    <>{
      mainstage && 
      <div id={'sales'}>
        <div className={'page-title'}>
          <div className='sales-title'>
            <p>Đăng bán sản phẩm</p>
          </div>
          <div className={'sales-next'} onClick={openS1}>
            <p>Tiếp theo</p>
            <p>
              <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </p>
          </div>
        </div>
      </div>
    }
    {stage1 && <SaleStage1/>}
    </>
  );
}

function SaleStage1() {
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

  return (
    <div id={'sales'}>
      <div className={'page-title'}>
        <div className='sales-title'>
          <p>Đăng bán sản phẩm</p>
        </div>
        <div className={'sales-next'}>
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
  );
}

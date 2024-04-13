import React, { useEffect, useState, } from 'react';
import { SelectItemBox, Title, } from '~/components';
import './index.css';

export default function Sales() {

  const [types, setType,] = useState([]);

  useEffect(() => {
    getTypes();
  });

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
  
  console.log(types);
  return (
    <div id={'sales'}>
      <div className={'page-title'}>
        <Title>Đăng bán sản phẩm</Title>
      </div>
      <div>
        <div>
          <Title>Giới tính</Title>
        </div>
        <div>
          <SelectItemBox>Nam</SelectItemBox>
          <SelectItemBox>Nữ</SelectItemBox>
          <SelectItemBox>Unisex</SelectItemBox>
        </div>
      </div>
      <div>
        <div>
          <Title>Loại sản phẩm</Title>
        </div>
        <div>
          {types?.map((type) => (
            <SelectItemBox key={type?.id}> {type?.name} </SelectItemBox>
          ))}
        </div>
      </div>
      <div>
        <div>
          <Title>Kích cỡ</Title>
        </div>
        <div>
          <SelectItemBox>Nam</SelectItemBox>
          <SelectItemBox>Nữ</SelectItemBox>
          <SelectItemBox>Unisex</SelectItemBox>
        </div>
      </div>
    </div>
  );
}

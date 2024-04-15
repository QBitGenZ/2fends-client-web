import React, { useEffect, useState, } from 'react';
import './index.css';
import { HeadTitle, SelectItemBox, TextAreaInput, TextInput, Title, } from '~/components';
import DateTimeInput from '~/components/DateTimeInput';

export default function Donation() {
  const [name, setName,] = useState('');
  const [productTypes, setProductTypes,] = useState([]);
  const [description, setDescription,] = useState('');
  const [startTime, setStartTime,] = useState('');
  const [endTime, setEndTime,] = useState('');

  useEffect(() => {
    getProductTypes();
  }, []);

  const getProductTypes = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/products/types/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()))
      .then(data => {
        setProductTypes(data?.data);
      })
      .catch(err => alert(err?.err));
  };

  return (
    <div id={'donation'}>
      <HeadTitle>Tạo sự kiện quyên góp</HeadTitle>
      <div>
        <div>
          <Title>Tên sự kiện</Title>
        </div>

        <TextInput setValue={setName} placeholder={'Nhập tên sự kiện'} value={name}/>
      </div>
      <div>
        <div>
          <Title>Thời gian bắt đầu</Title>
        </div>

        <DateTimeInput setValue={setStartTime} value={startTime}/>
      </div>
      <div>
        <div>
          <Title>Thời gian kết thúc</Title>
        </div>
        <DateTimeInput setValue={setEndTime} value={endTime}/>
      </div>
      <div>
        <div>
          <Title>Mô tả sự kiện</Title>
        </div>

        <TextAreaInput setValue={setDescription} placeholder={'Mô tả sự kiện'} rowNumber={3} value={description}/>
      </div>
      <div>
        <div>
          <Title>Danh mục sản phẩm cần kêu gọi</Title>
        </div>

        {
          productTypes.map((item) => {
            return (<SelectItemBox key={item?.id}>{item?.name}</SelectItemBox>);
          })
        }
      </div>
    </div>
  );
}
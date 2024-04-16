import React, { useEffect, useState, } from 'react';
import './index.css';
import { HeadTitle,
  SelectItemBox,
  TextAreaInput,
  TextInput,
  Title, } from '~/components';
import DateTimeInput from '~/components/DateTimeInput';
import moment from 'moment';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft,
  faArrowUpFromBracket, } from '@fortawesome/free-solid-svg-icons';

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
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then((res) =>
        res.status === 200 ? res.json() : Promise.reject(res.json())
      )
      .then((data) => {
        setProductTypes(data?.data);
      })
      .catch((err) => alert(err?.err));
  };

  const addEvent = (e) => {
    e.preventDefault();
    let selectedItems = document.querySelectorAll('.select-item-box.selected');
    selectedItems = Array.from(selectedItems).map((item) => {
      return `<li>${item.textContent}</li>`;
    });
    selectedItems = selectedItems.join('');
    const newDescription=description+'\nDanh mục sản phẩm kêu gọi: ' +
    `<ul>${selectedItems}</ul>`;
    console.log(newDescription);
    const form = new FormData();
    form.append('name', name);
    form.append('description', newDescription);
    form.append('beginAt', changeTime(startTime));
    form.append('endAt', changeTime(endTime));
    fetch(`${process.env.REACT_APP_HOST_IP}/events/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => res.json())
      .catch((error) => alert(error));
  };

  function changeTime(time) {
    const parsedDatetime = moment(time, 'YYYY-MM-T HH:mm:ss'); // Parse with iOS format
    const postgresDatetime = parsedDatetime.format('YYYY-MM-DD HH:mm:ss'); // Format for PostgreSQL
    return postgresDatetime;
  }
  return (
    <div id={'donation'}>
      <div className={'donationpage-title'}>
        <div className={'donations-title'}>
          <HeadTitle>
            <FontAwesomeIcon
              style={{
                paddingRight: '10px',
              }}
              icon={faAngleLeft}
            ></FontAwesomeIcon>
          </HeadTitle>
          <HeadTitle>Đăng bán sản phẩm</HeadTitle>
        </div>
        <div className={'donations-next'} onClick={addEvent}>
          <p>Đăng tải sự kiện</p>
          <p>
            <FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon>
          </p>
        </div>
      </div>
      <div>
        <div>
          <Title>Tên sự kiện</Title>
        </div>
        <TextInput
          setValue={setName}
          placeholder={'Nhập tên sự kiện'}
          value={name}
        />
      </div>
      <div>
        <div>
          <Title>Thời gian bắt đầu</Title>
        </div>

        <DateTimeInput setValue={setStartTime} value={startTime} />
      </div>
      <div>
        <div>
          <Title>Thời gian kết thúc</Title>
        </div>
        <DateTimeInput setValue={setEndTime} value={endTime} />
      </div>
      <div>
        <div>
          <Title>Mô tả sự kiện</Title>
        </div>

        <TextAreaInput
          setValue={setDescription}
          placeholder={'Mô tả sự kiện'}
          rowNumber={3}
          value={description}
        />
      </div>
      <div>
        <div>
          <Title>Danh mục sản phẩm cần kêu gọi</Title>
        </div>
        <div>
          {productTypes.map((item) => {
            return <SelectItemBox key={item?.id}>{item?.name}</SelectItemBox>;
          })}
        </div>
      </div>
    </div>
  );
}

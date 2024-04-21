import React, { useEffect, useState, } from 'react';
import { HeadTitle,
  SelectItemBox,
  TextAreaInput,
  TextInput,
  Title, } from '~/components';
import PropTypes from 'prop-types';
import DateTimeInput from '~/components/DateTimeInput';
import moment from 'moment';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft,
  faArrowUpFromBracket,
  faClose, } from '@fortawesome/free-solid-svg-icons';
export default function AddEvent({ getEvents, stageAdd, setStageAdd, setMainStage, }) {
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
      return `${item.textContent}`;
    });
    selectedItems = selectedItems.join(',');
    const newDescription =
      description +
      '\n.Danh mục sản phẩm kêu gọi: ' +
      `${selectedItems}.`;
    console.log(startTime,endTime);
    console.log(changeTime(startTime),changeTime(endTime));
    const form = new FormData();
    form.append('name', name);
    form.append('description', newDescription);
    form.append('beginAt', changeTime(startTime));
    form.append('endAt', changeTime(endTime));
    form.append('image', imageFiles);
    fetch(`${process.env.REACT_APP_HOST_IP}/events/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if(res.status===401){
          return Promise.reject('Bạn không phải nhà từ thiện');
        }else if(res.status===201){
          getEvents();
          backMainStage();
        }
      })
      .catch((error) => alert(error));
  };
  const backMainStage = () => {
    setStageAdd(false);
    setMainStage(true);
  };
  const [imageFiles, setImageFiles,] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImageFiles(file);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...imageFiles,];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };
  function changeTime(time) {
    const parsedDatetime = moment(time, 'YYYY-MM-DDTHH:mm'); // Parse with iOS format
    const postgresDatetime = parsedDatetime.format('YYYY-MM-DD HH:mm:ss'); // Format for PostgreSQL
    return postgresDatetime;
  }
  return (
    <>
      {stageAdd && (
        <div>
          <div className={'donationpage-title'}>
            <div className={'donations-title'} onClick={backMainStage}>
              <HeadTitle>
                <FontAwesomeIcon
                  style={{
                    paddingRight: '10px',
                  }}
                  icon={faAngleLeft}
                ></FontAwesomeIcon>
              </HeadTitle>
              <HeadTitle>Tạo quyên góp</HeadTitle>
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
              <Title>Hình ảnh</Title>
            </div>
            <div className='add-images-component'>
              <label htmlFor={'add-images'}>Thêm ảnh</label>
              <input
                id='add-images'
                className={'input-password'}
                type='file'
                onChange={handleImageChange}
                rows={2}
                style={{
                  display: 'none',
                }}
              />
            </div>
          </div>
          {imageFiles && (
            <div className='image-preview'>
              <div className='image-container'>
                <img src={imageFiles?.preview} alt={'Preview'} />
                <button onClick={() => handleRemoveImage()}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
          )}
          <div>
            <div>
              <Title>Danh mục sản phẩm cần kêu gọi</Title>
            </div>
            <div>
              {productTypes.map((item) => {
                return (
                  <SelectItemBox key={item?.id}>{item?.name}</SelectItemBox>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AddEvent.propTypes = {
  getEvents: PropTypes.func,
  stageAdd: PropTypes.boolean,
  setStageAdd: PropTypes.func,
  setMainStage: PropTypes.func,
};

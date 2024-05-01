import PropTypes from 'prop-types';
import React, { useState, useEffect, } from 'react';
import { HeadTitle,
  TextAreaInput,
  TextInput,
  Title,
  DateTimeInput, } from '~/components';
import moment from 'moment';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft,
  faClose,
  faArrowUpFromBracket, } from '@fortawesome/free-solid-svg-icons';
export default function UpdateEvent({
  event,
  updateStage,
  setUpdateStage,
  setDetailStage,
  getEvents,
  setDetailEvent,
}) {
  const [name, setName,] = useState(event?.name);
  const [proType, setProType,] = useState();
  const [description, setDescription,] = useState(event?.description);
  const [startTime, setStartTime,] = useState(changeTime(event?.beginAt));
  const [endTime, setEndTime,] = useState(changeTime(event?.endAt));
  useEffect(() => {
    getTypes();
  }, []);
  const backDetail = () => {
    setDetailStage(true);
    setUpdateStage(false);
  };
  console.log(updateStage);
  const getTypes = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/products/types/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProType(data.data);
      })
      .catch((error) => console.log(error));
  };
  const updateEvent = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('beginAt', changeTime(startTime));
    form.append('endAt', changeTime(endTime));
    if (imageFiles instanceof File) {
      form.append('image', imageFiles);
    }
    fetch(`${process.env.REACT_APP_HOST_IP}/events/${event?.id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Cập nhật sự kiện thành công');
          getEvents();
          backDetail();
          return res.json();
        } else {
          return Promise.reject('Chỉnh sửa sự kiện không thành công');
        }
      })
      .then((data)=>setDetailEvent(data?.data))
      .catch((error) => alert(error));
  };
  const [imageFiles, setImageFiles,] = useState();

  const handleImageChange = (event) => {
    let file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImageFiles(file);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...imageFiles,];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };
  function changeTime(time) {
    const parsedDatetime = moment(time, 'YYYY-MM-T HH:mm:ss'); // Parse with iOS format
    const postgresDatetime = parsedDatetime.format('YYYY-MM-DD HH:mm:ss'); // Format for PostgreSQL
    return postgresDatetime;
  }
  function changeDateLocal(time) {
    const parsedDatetime = moment(time, 'YYYY-MM-DD HH:mm:ss'); // Parse with PostgreSQL format
    const datetimeLocal = parsedDatetime.format('YYYY-MM-DD HH:mm:ss'); // Format for datetime-local input
    return datetimeLocal;
  }
  console.log('fjfjjjj', proType);
  return (
    <>
      {updateStage && (
        <div>
          <div className={'donationpage-title'}>
            <div className={'donations-title'} onClick={backDetail}>
              <HeadTitle>
                <FontAwesomeIcon
                  style={{
                    paddingRight: '10px',
                  }}
                  icon={faAngleLeft}
                ></FontAwesomeIcon>
              </HeadTitle>
              <HeadTitle>Chỉnh sửa sự kiện</HeadTitle>
            </div>
            <div className={'donations-next'} onClick={updateEvent}>
              <p>Chỉnh sửa</p>
              <p>
                <FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon>
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>
                <Title>Tên sự kiện</Title>
              </div>
              <TextInput
                value={name}
                setValue={setName}
                placeholder={'Nhập tên sản phẩm'}
              />
            </div>
            <div>
              <div>
                <Title>Thời gian bắt đầu</Title>
              </div>

              <DateTimeInput
                setValue={setStartTime}
                value={changeDateLocal(startTime)}
              />
            </div>
            <div>
              <div>
                <Title>Thời gian kết thúc</Title>
              </div>
              <DateTimeInput
                setValue={setEndTime}
                value={changeDateLocal(endTime)}
              />
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
                  multiple
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
          </div>
        </div>
      )}
    </>
  );
}

UpdateEvent.propTypes = {
  event: PropTypes.object,
  setDetailStage: PropTypes.func,
  setUpdateStage: PropTypes.func,
  updateStage: PropTypes.bool,
  getEvents: PropTypes.func,
  setDetailEvent: PropTypes.func,
};

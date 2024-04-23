import React from 'react';
import PropTypes from 'prop-types';
import { HeadTitle, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft, } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import moment from 'moment';
export default function EventDetail({
  detailStage,
  setDetailStage,
  setMainStage,
  event,
  getEvents,
  setUpdateStage,
  setTakedEvent,
}) {
  const backMainStage = () => {
    setDetailStage(false);
    setMainStage(true);
  };
  console.log(event);
  const changetoUpdate = ()=>{
    setTakedEvent(event);
    setUpdateStage(true);
    setDetailStage(false);
  };
  const deleteEvent = ()=>{
    fetch(`${process.env.REACT_APP_HOST_IP}/events/${event?.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 204) {
          alert('Xóa sự kiện thành công');
          getEvents();
          backMainStage();
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      {detailStage && (
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
              <HeadTitle>Chi tiết sự kiện</HeadTitle>
            </div>
          </div>
          <div id={'detailItem'}>
            <div className={'detail-image'}>
              <div className={'item-image'}>
                <img
                  className={'item-image'}
                  src={`${process.env.REACT_APP_IMAGE_HOST_IP}${event?.image}`}
                />
              </div>
            </div>
            <div className={'detail-info'}>
              <div className={'product-name'}>{event?.name}</div>
              <div className={'product-gender'}>{event?.user}</div>
              <div className={'product-price'}>
                {moment(event?.beginAt).format('HH:mm DD/MM/YYYY')} -{' '}
                {moment(event?.endAt).format('HH:mm DD/MM/YYYY')}
              </div>
              <div className={'product-description'}> Mô tả sự kiện</div>
              <div
                className={'product-descripcon'}
                dangerouslySetInnerHTML={{
                  __html: event?.description,
                }}
              />
              <div className={'info-button-container'}>
                <button className={'info-button'} onClick={changetoUpdate}>
                  Chỉnh sửa
                </button>
                <button className={'info-button'} onClick={deleteEvent}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

EventDetail.propTypes = {
  detailStage: PropTypes.bool,
  setDetailStage: PropTypes.func,
  setMainStage: PropTypes.func,
  event: PropTypes.object,
  getEvents: PropTypes.func,
  setUpdateStage: PropTypes.func,
  setTakedEvent: PropTypes.func,
};

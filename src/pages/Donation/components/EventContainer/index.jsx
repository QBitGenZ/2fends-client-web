import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
export default function EventContainer({ event, openDetail, setDetailEvent, }) {
  const changeToEventDetail = () => {
    setDetailEvent(event);
    openDetail();
  };
  const displayDescription = (description) => {
    if (description.length > 36) {
      return description.substring(0,30) + '...';
    }
    return description;
  };
  console.log(event?.image);
  return (
    <div className='product-card' onClick={changeToEventDetail}>
      <img
        className='product-image'
        src={`${process.env.REACT_APP_IMAGE_HOST_IP}${event?.image}`}
      />
      <div className='product-info'>
        <p className='product-title'>{event?.name}</p>
        <p className='product-price'>{displayDescription(event?.description)}</p>
      </div>
    </div>
  );
}

EventContainer.propTypes = {
  event: PropTypes.object,
  openDetail: PropTypes.func,
  setDetailEvent: PropTypes.func,
};

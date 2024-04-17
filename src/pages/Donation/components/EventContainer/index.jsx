import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
export default function EventContainer({ event, }) {
  console.log(event?.image?.src);
  return (
    <div className='product-card'>
      <img
        className='product-image'
        src={`${process.env.REACT_APP_IMAGE_HOST_IP}${event?.image?.src}`}
      />
      <div className='product-info'>
        <p className='product-title'>{event?.name}</p>
        <p className='product-price'>{event?.description} vnd</p>
      </div>
    </div>
  );
}

EventContainer.propTypes = {
  event: PropTypes.object,
};

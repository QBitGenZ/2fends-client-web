import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
export default function ProductContainer({ product, }) {
  console.log(product?.product_image[0]?.src);
  return (
    <div className='product-card'>
      <img
        className='product-image'
        src={`${process.env.REACT_APP_IMAGE_HOST_IP}${product?.product_image[0]?.src}`}
      />
      <div className='product-info'>
        <p className='product-title'>{product?.name}</p>
        <p className='product-price'>{product?.price} vnd</p>
      </div>
    </div>
  );
}

ProductContainer.propTypes = {
  product: PropTypes.object,
};

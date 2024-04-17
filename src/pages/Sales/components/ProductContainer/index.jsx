import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { vndCurrency, } from '~/utils/format';

export default function ProductContainer({ product, }) {
  return (
    <div className='product-card'>
      <img
        className='product-image'
        src={`${process.env.REACT_APP_IMAGE_HOST_IP}${product?.product_image[0]?.src}`}
      />
      <div className='product-info'>
        <p className='product-title'>{product?.name}</p>
        <p className='product-price'>{vndCurrency(product?.price)}</p>
      </div>
    </div>
  );
}

ProductContainer.propTypes = {
  product: PropTypes.object,
};

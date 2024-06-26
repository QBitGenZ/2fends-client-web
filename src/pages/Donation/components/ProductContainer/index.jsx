import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function ProductContainer({ product, onChange, quantity, setProductDonate, }) {
  const changeToProductDetail = () =>{
    setProductDonate(product);
    onChange();
  };
  return (
    <>
      <div className='product-card' onClick={changeToProductDetail}>
        <img
          className='product-image'
          src={`${process.env.REACT_APP_IMAGE_HOST_IP}${product?.product_image[0]?.src}`}
        />
        <div className='product-info'>
          <p className='product-title'>{product?.name}</p>
          <p className='product-price'>Số lượng: {quantity}</p>
        </div>
      </div>
    </>
  );
}

ProductContainer.propTypes = {
  product: PropTypes.object,
  onChange: PropTypes.func,
  quantity: PropTypes.number,
  setProductDonate: PropTypes.object,
};

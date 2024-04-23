import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { HeadTitle, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft, } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { vndCurrency, } from '~/utils/format';
export default function ProductDetail({
  detailStage,
  setDetailStage,
  setStoredStage,
  product,
  quantity,
}) {
  const backMainStage = () => {
    setDetailStage(false);
    setStoredStage(true);
  };
  const [currentImageIndex, setCurrentImageIndex,] = useState(0);
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };
  console.log(product);
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
              <HeadTitle>Chi tiết sản phẩm</HeadTitle>
            </div>
          </div>
          <div id={'detailItem'}>
            <div className={'detail-image'}>
              <div className={'item-image'}>
                <img
                  className={'item-image'}
                  src={`${process.env.REACT_APP_IMAGE_HOST_IP}${product?.product_image[currentImageIndex]?.src}`}
                  alt={product?.product_image[currentImageIndex]?.alt}
                />
                <div className='dot-navigation'>
                  {product?.product_image?.map((image, index) => (
                    <button
                      key={image?.src}
                      className={index === currentImageIndex ? 'active' : ''}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={'detail-info'}>
              <div className={'product-name'}>{product?.name}</div>
              <div className={'product-gender'}>Dành cho {product?.gender}</div>
              <div className={'product-price'}>
                {vndCurrency(product?.price)}
              </div>
              <div className={'product-price'}>Số lượng: {quantity}</div>
              <div className={'product-description'}> Mô tả sản phẩm</div>
              <div
                className={'product-descripcon'}
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ProductDetail.propTypes = {
  detailStage: PropTypes.bool,
  setDetailStage: PropTypes.func,
  setStoredStage: PropTypes.func,
  product: PropTypes.object,
  quantity: PropTypes.number,
};

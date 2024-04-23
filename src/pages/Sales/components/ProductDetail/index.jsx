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
  setMainStage,
  product,
  getProducts,
  setUpdateStage,
  setTakedProduct,
}) {
  
  const backMainStage = () => {
    setDetailStage(false);
    setMainStage(true);
  };
  const [currentImageIndex, setCurrentImageIndex,] = useState(0);
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };
  const changetoUpdate = () => {
    setTakedProduct(product);
    setUpdateStage(true);
    setDetailStage(false);
  };
  console.log(product);
  const deleteProduct = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/products/${product?.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 204) {
          alert('Xóa sản phẩm thành công');
          getProducts();
          backMainStage();
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      {detailStage && (
        <div id={'sales'}>
          <div className={'page-title'}>
            <div className={'sales-title'} onClick={backMainStage}>
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
              <div className={'product-description'}> Mô tả sản phẩm</div>
              <div
                className={'product-descripcon'}
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              />
              <div className={'info-button-container'}>
                <button className={'info-button'} onClick={changetoUpdate}>
                  Chỉnh sửa
                </button>
                <button className={'info-button'} onClick={deleteProduct}>
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

ProductDetail.propTypes = {
  detailStage: PropTypes.bool,
  setDetailStage: PropTypes.func,
  setMainStage: PropTypes.func,
  product: PropTypes.object,
  getProducts: PropTypes.func,
  setUpdateStage: PropTypes.func,
  setTakedProduct: PropTypes.func,
};

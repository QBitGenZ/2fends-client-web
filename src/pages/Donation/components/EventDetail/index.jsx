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
  product,
}) {
  const backMainStage = () => {
    setDetailStage(false);
    setMainStage(true);
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
              <HeadTitle>Chi tiết sự kiện</HeadTitle>
            </div>
          </div>
          <div id={'detailItem'}>
            <div className={'detail-image'}>
              <div className={'item-image'}>
                <img
                  className={'item-image'}
                  src={`${process.env.REACT_APP_IMAGE_HOST_IP}${product?.image}`}
                />
              </div>
            </div>
            <div className={'detail-info'}>
              <div className={'product-name'}>{product?.name}</div>
              <div className={'product-gender'}>{product?.user}</div>
              <div className={'product-price'}>
                {moment(product?.beginAt).format('HH:mm DD/MM/YYYY')} -{' '}
                {moment(product?.endAt).format('HH:mm DD/MM/YYYY')}
              </div>
              <div className={'product-description'}> Mô tả sự kiện</div>
              <div className={'product-descripcon'}>
                {product?.description} Hoa tay ZARA phiên bản mạ vàng sản xuất
                2022. Sản phẩm chỉ mới sử dụng 2 lần nên còn rất mới, độ mới
                khoảng 95%. Nếu có thắc mắc hãy liên hệ trực tiếp tôi. Tôi còn
                rất nhiều sản phẩm tốt, hãy xem gian hàng của tôi.
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
  product: PropTypes.object,
};

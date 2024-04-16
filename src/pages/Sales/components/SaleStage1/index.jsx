import PropTypes from 'prop-types';
import React, { useState, useEffect, } from 'react';
import { HeadTitle, SelectItemBox, Title, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleRight,
  faAngleLeft, } from '@fortawesome/free-solid-svg-icons';
export default function SaleStage1({
  stage1,
  setStage1,
  setStage2,
  setMainStage,
}) {
  const [types, setType,] = useState([]);
  useEffect(() => {
    getTypes();
  }, []);
  const getTypes = async () => {
    await fetch(`${process.env.REACT_APP_HOST_IP}/products/types/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setType(data.data);
      })
      .catch((error) => console.log(error));
  };
  const openS2 = () => {
    setStage1(false);
    setStage2(true);
  };
  const backMainStage = () => {
    setStage1(false);
    setMainStage(true);
  };
  return (
    <>
      {stage1 && (
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
              <HeadTitle>Đăng bán sản phẩm</HeadTitle>
            </div>
            <div className={'sales-next'} onClick={openS2}>
              <p>Tiếp theo</p>
              <p>
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
              </p>
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Giới tính</Title>
            </div>
            <div>
              <SelectItemBox>Nam</SelectItemBox>
              <SelectItemBox>Nữ</SelectItemBox>
              <SelectItemBox>Unisex</SelectItemBox>
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Loại sản phẩm</Title>
            </div>
            <div>
              {types?.map((type) => (
                <SelectItemBox key={type?.id}>{type?.name}</SelectItemBox>
              ))}
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Kích cỡ</Title>
            </div>
            <div>
              <SelectItemBox>S</SelectItemBox>
              <SelectItemBox>M</SelectItemBox>
              <SelectItemBox>L</SelectItemBox>
              <SelectItemBox>XL</SelectItemBox>
              <SelectItemBox>2XL</SelectItemBox>
              <SelectItemBox>3XL</SelectItemBox>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

SaleStage1.propTypes = {
  stage1: PropTypes.boolean,
  setStage1: PropTypes.func,
  setStage2: PropTypes.func,
  setMainStage: PropTypes.func,
};
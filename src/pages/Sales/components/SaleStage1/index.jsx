import PropTypes from 'prop-types';
import React, { useEffect, useState, } from 'react';
import { HeadTitle, InputRadio, Title, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, } from '@fortawesome/free-solid-svg-icons';
import './index.css';
export default function SaleStage1({
  stage1,
  setStage1,
  setStage2,
  setMainStage,
  setNewProduct,
  types,
  setType,
}) {
  
  useEffect(() => {
    getTypes();
  }, []);
  const getTypes = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/products/types/`, {
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
    addInnformation();
  };
  const backMainStage = () => {
    setStage1(false);
    setMainStage(true);
  };
  const [gender, setGender,] = useState('Nam');
  const [loaisp, setLoaisp, ] = useState('Nam');
  const [size, setSize, ] = useState('Nam');
  const addInnformation = () => {
    // const gender = document.querySelector('.gender>.select-item-box.selected')?.textContent;
    // const product_type=document.querySelector('.product-type>.select-item-box.selected')?.getAttribute('id');
    // const product_size=document.querySelector('.product-size>.select-item-box.selected')?.textContent;
    setNewProduct({
      gender:gender,
      product_type:loaisp,
      size:size,
    });
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
            <div className={'buttons'}>
              <InputRadio setValue={setGender} name={'gender'} value={'Nam'}>Nam</InputRadio>
              <InputRadio setValue={setGender} name={'gender'} value={'Nữ'}>Nữ</InputRadio>
              <InputRadio setValue={setGender} name={'gender'} value={'Unisex'}>Unisex</InputRadio>
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Loại sản phẩm</Title>
            </div>
            <div className={'buttons'}>
              {types?.map((type) => (
                <InputRadio key={type?.id} value={type?.id} setValue={setLoaisp} name={'type'}>{type?.name}</InputRadio>
              ))}
            </div>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Kích cỡ</Title>
            </div>
            <div className={'buttons'}>
              <InputRadio setValue={setSize} name={'Size'} value={'S'}>S</InputRadio>
              <InputRadio setValue={setSize} name={'Size'} value={'M'}>M</InputRadio>
              <InputRadio setValue={setSize} name={'Size'} value={'L'}>L</InputRadio>
              <InputRadio setValue={setSize} name={'Size'} value={'XL'}>XL</InputRadio>
              <InputRadio setValue={setSize} name={'Size'} value={'2XL'}>2XL</InputRadio>
              <InputRadio setValue={setSize} name={'Size'} value={'3XL'}>3XL</InputRadio>
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
  setNewProduct: PropTypes.func,
  types: PropTypes.array,
  setType: PropTypes.func,
};

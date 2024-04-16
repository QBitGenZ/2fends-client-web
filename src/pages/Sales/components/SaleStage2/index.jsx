import PropTypes from 'prop-types';
import React, { useState, } from 'react';
import { HeadTitle, TextAreaInput, TextInput, Title, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleRight,
  faAngleLeft,
  faClose, } from '@fortawesome/free-solid-svg-icons';
export default function SaleStage2({ stage2, setStage2, setStage1, }) {
  const backStage1 = () => {
    setStage2(false);
    setStage1(true);
  };

  const [imageFiles, setImageFiles,] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles([...files,]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...imageFiles,];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

  return (
    <>
      {stage2 && (
        <div id={'sales'}>
          <div className={'page-title'}>
            <div className='sales-title' onClick={backStage1}>
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
            <div className={'sales-next'}>
              <p>Đăng bán sản phẩm</p>
              <p>
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
              </p>
            </div>
          </div>
          <div id={'Add-Product'}>
            <div>
              <div>
                <Title>Tên sản phẩm</Title>
              </div>
              <TextInput />
            </div>
            <div>
              <div>
                <Title>Giá sản phẩm</Title>
              </div>
              <TextInput />
            </div>
            {/* TODO: Thay đỏi này thành component có sẵn. Tạo useState cho nó và css để có khoảng cách */}
            <div>
              <div>
                <Title>Mô tả sản phẩm</Title>
              </div>
              <TextAreaInput/>
            </div>
            <div>
              <div>
                <Title>Hình ảnh</Title>
              </div> 
              <div className='add-images-component'>
                <label htmlFor={'add-images'}>Thêm ảnh</label>
                <input
                  id='add-images'
                  className={'input-password'}
                  type='file'
                  multiple
                  onChange={handleImageChange}
                  rows={2}
                  style={{
                    display: 'none',
                  }}
                />
              </div>
            </div>

            <div className='image-preview'>
              {imageFiles.map((file, index) => (
                <div key={index} className='image-container'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                  />
                  <button onClick={() => handleRemoveImage(index)}>
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

SaleStage2.propTypes = {
  stage2: PropTypes.boolean,
  setStage2: PropTypes.func,
  setStage1: PropTypes.func,
};

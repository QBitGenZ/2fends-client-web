import PropTypes from 'prop-types';
import React, { useState, } from 'react';
import { HeadTitle,
  TextAreaInput,
  TextInput,
  Title,
  Selection, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleRight,
  faAngleLeft,
  faClose, } from '@fortawesome/free-solid-svg-icons';
export default function SaleStage2({
  stage2,
  setStage2,
  setStage1,
  newProduct,
  getProducts,
  setMainStage,
}) {
  const [proName, setProName,] = useState();
  const [proPrice, setProPrice,] = useState();
  const [proQuantity, setQuantity,] = useState();
  const [proDescription, setProDescription,] = useState();
  const [degree, setDegree,] = useState('Mới');
  const backStage1 = () => {
    setStage2(false);
    setStage1(true);
  };
  const backMainStage = () => {
    getProducts();
    setMainStage(true);
    setStage2(false);
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
  const addImage = (ProductID) => {
    imageFiles.map((imageFile) => {
      const form = new FormData();
      form.append('src', imageFile);
      form.append('product', ProductID);
      form.append('alt', 'Anh thay the');
      fetch(`${process.env.REACT_APP_HOST_IP}/products/images/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
        body: form,
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));
    });
  };
  const createProduct = () => {
    const form = new FormData();
    form.append('name', proName);
    form.append('price', Number(proPrice));
    form.append('quantity', Number(proQuantity));
    form.append('product_type', newProduct.product_type);
    form.append('size', newProduct.size);
    form.append('description', proDescription);
    form.append('degree', degree);
    form.append('gender', newProduct.gender);
    if (proName === undefined || proName === ' ' || proName === '') {
      alert('Tên sản phẩm không hợp lệ');
    } else if (Number(proPrice) === undefined || Number(proPrice) <= 0) {
      alert('Giá sản phẩm không hợp lệ');
    } else if (Number(proQuantity) === undefined || Number(proQuantity) <= 0) {
      alert('Số lượng sản phẩm không hợp lệ');
    } else if (degree === undefined) {
      alert('Tình trạng sản phẩm không hợp lệ');
    } else if (newProduct.gender === undefined) {
      alert('Giới tính sử dụng không hợp lệ');
    } else if (newProduct.size === undefined) {
      alert('Kích thước không không hợp lệ');
    } else {
      fetch(`${process.env.REACT_APP_HOST_IP}/products/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
        body: form,
      })
        .then((res) => {
          if(res.status===201){
            alert('Thêm sản phẩm thành công');
            return res.json();
          }else{
            return Promise.reject('Thêm sản phẩm không thành công');
          }
        })
        .then((data) => {
          console.log(data.data.id);
          addImage(data.data.id);
          backMainStage();
        })
        .catch((error) => console.log(error));
    }
  };
  console.log('Gender',newProduct.gender);
  console.log('Size',newProduct.size);
  console.log('Type',newProduct.product_type);
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
            <div className={'sales-next'} onClick={createProduct}>
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
              <TextInput
                value={proName}
                setValue={setProName}
                placeholder={'Nhập tên sản phẩm'}
              />
            </div>
            <div>
              <div>
                <Title>Giá sản phẩm</Title>
              </div>
              <TextInput
                value={proPrice}
                setValue={setProPrice}
                placeholder={'Nhập giá sản phẩm'}
              />
            </div>
            <div>
              <div>
                <Title>Số lượng sản phẩm</Title>
              </div>
              <TextInput
                value={proQuantity}
                setValue={setQuantity}
                placeholder={'Nhập giá sản phẩm'}
              />
            </div>
            <div>
              <div>
                <Title>Tình trạng sản phẩm</Title>
              </div>
              <Selection
                value={degree}
                setValue={setDegree}
                options={[
                  {
                    value: 'Mới',
                    label: 'Mới',
                  },
                  {
                    value: 'Vừa',
                    label: 'Vừa',
                  },
                  {
                    value: 'Cũ',
                    label: 'Cũ',
                  },
                ]}
              />
            </div>
            {/* TODO: Thay đỏi này thành component có sẵn. Tạo useState cho nó và css để có khoảng cách */}
            <div>
              <div>
                <Title>Mô tả sản phẩm</Title>
              </div>
              <TextAreaInput
                value={proDescription}
                setValue={setProDescription}
                rowNumber={2}
                placeholder={'Nhập mô tả sản phẩm'}
              />
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
  newProduct: PropTypes.object,
  setNewProduct: PropTypes.func,
  setMainStage: PropTypes.func,
  getProducts: PropTypes.func,
};

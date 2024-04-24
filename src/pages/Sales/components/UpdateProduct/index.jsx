import PropTypes from 'prop-types';
import React, { useState, useEffect, } from 'react';
import { HeadTitle,
  TextAreaInput,
  TextInput,
  Title,
  Selection, } from '~/components';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, } from '@fortawesome/free-solid-svg-icons';
export default function UpdateProduct({
  product,
  updateStage,
  setUpdateStage,
  setDetailStage,
  getProducts,
}) {
  const [proName, setProName,] = useState(product?.name);
  const [proType, setProType,] = useState([]);
  const [type, setType,] = useState(product?.product_type);
  const [proPrice, setProPrice,] = useState(product?.price);
  const [proQuantity, setQuantity,] = useState(product?.quantity);
  const [proDescription, setProDescription,] = useState(product?.description);
  const [degree, setDegree,] = useState(product?.degree);
  const [proSize, setProSize,] = useState(product?.size);
  const [proUser, setProUser,] = useState(product?.size);
  useEffect(() => {
    getTypes();
    getUser();
  }, []);
  const backDetail = () => {
    setDetailStage(true);
    setUpdateStage(false);
  };
  console.log(updateStage);
  //   const [imageFiles, setImageFiles,] = useState(product?.product_image);

  //   const handleImageChange = (event) => {
  //     const files = event.target.files;
  //     setImageFiles([...files,]);
  //   };

  //   const handleRemoveImage = (index) => {
  //     const updatedImages = [...imageFiles,];
  //     updatedImages.splice(index, 1);
  //     setImageFiles(updatedImages);
  //   };
  const getUser = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProUser(data?.data?.username);
      })
      .catch((error) => console.log(error));
  };
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
        setProType(data.data);
      })
      .catch((error) => console.log(error));
  };
  const updateProduct = () => {
    const form = new FormData();
    form.append('name', proName);
    form.append('description', proDescription);
    form.append('price', Number(proPrice));
    form.append('quantity', Number(proQuantity));
    form.append('degree', degree);
    form.append('size', proSize);
    form.append('product_type', type);
    form.append('user', proUser);
    fetch(`${process.env.REACT_APP_HOST_IP}/products/${product?.id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Cập nhật sản phẩm thành công');
          getProducts();
          backDetail();
        } else {
          return Promise.reject('Chỉnh sửa sản phẩm không thành công');
        }
      })
      .catch((error) => alert(error));
  };
  const typeofproduct = () => {
    let array = [];
    proType?.map((type) =>
      array.push({
        label: type?.name,
        value: type?.id,
      })
    );
    return array;
  };
  return (
    <>
      {updateStage && (
        <div id={'sales'}>
          <div className={'page-title'}>
            <div className='sales-title' onClick={backDetail}>
              <HeadTitle>
                <FontAwesomeIcon
                  style={{
                    paddingRight: '10px',
                  }}
                  icon={faAngleLeft}
                ></FontAwesomeIcon>
              </HeadTitle>
              <HeadTitle>Chỉnh sửa sản phẩm</HeadTitle>
            </div>
            <div className={'sales-next'} onClick={updateProduct}>
              <p>Chỉnh sửa</p>
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
            <div>
              <div>
                <Title>Kích thước sản phẩm</Title>
              </div>
              <Selection
                value={proSize}
                setValue={setProSize}
                options={[
                  {
                    value: 'S',
                    label: 'S',
                  },
                  {
                    value: 'M',
                    label: 'M',
                  },
                  {
                    value: 'L',
                    label: 'L',
                  },
                  {
                    value: 'XL',
                    label: 'XL',
                  },
                  {
                    value: '2XL',
                    label: '2XL',
                  },
                  {
                    value: '3XL',
                    label: '3XL',
                  },
                ]}
              />
            </div>
            <div>
              <div>
                <Title> Loại sản phẩm</Title>
              </div>
              <Selection
                value={type}
                setValue={setType}
                options={typeofproduct()}
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
            {/* <div>
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
            </div> */}

            {/* <div className='image-preview'>
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
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

UpdateProduct.propTypes = {
  product: PropTypes.object,
  setDetailStage: PropTypes.func,
  setUpdateStage: PropTypes.func,
  updateStage: PropTypes.bool,
  getProducts: PropTypes.func,
};

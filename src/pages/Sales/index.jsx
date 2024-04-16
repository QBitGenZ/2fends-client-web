import React, { useState, useEffect, } from 'react';
import { HeadTitle, Title, } from '~/components';
import './index.css';
import { ProductContainer, SaleStage1, SaleStage2, } from './components';
export default function Sales() {
  const [mainstage, setMainStage,] = useState(true);
  const [stage1, setStage1,] = useState(false);
  const [stage2, setStage2,] = useState(false);
  const [products, setProduct,] = useState([]);
  const [newProduct, setNewProduct, ] = useState(null);
  const openS1 = () => {
    setStage1(true);
    setMainStage(false);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/products/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {mainstage && (
        <div id={'sales'}>
          <HeadTitle>Đăng bán sản phẩm</HeadTitle>
          <div className={'mainstage-button'} onClick={openS1}>
            <p>Đăng sản phẩm mới</p>
          </div>
          <div className={'sales-smallcontainer'}>
            <div>
              <Title>Danh sách sản phẩm</Title>
            </div>
            <div>
              {products.map((product) => (
                <ProductContainer key='product?.id' product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
      {stage1 && (
        <SaleStage1
          stage1={stage1}
          setMainStage={setMainStage}
          setStage1={setStage1}
          setStage2={setStage2}
          setNewProduct={setNewProduct}
        />
      )}
      {stage2 && (
        <SaleStage2
          stage2={stage2}
          setStage2={setStage2}
          setStage1={setStage1}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
      )}
    </>
  );
}

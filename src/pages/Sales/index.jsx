import React, { useState, useEffect, } from 'react';
import { HeadTitle, Pagination, TextInput, Title, } from '~/components';
import './index.css';
import { ProductContainer,
  ProductDetail,
  SaleStage1,
  SaleStage2,
  UpdateProduct, } from './components';
export default function Sales() {
  const [mainstage, setMainStage,] = useState(true);
  const [types, setType,] = useState([]);
  const [updateStage, setUpdateStage,] = useState(false);
  const [takedProduct, setTakedProduct,] = useState(false);
  const [stage1, setStage1,] = useState(false);
  const [stage2, setStage2,] = useState(false);
  const [products, setProduct,] = useState([]);
  const [search, setSearch,] = useState('');
  const [newProduct, setNewProduct,] = useState(null);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const openS1 = () => {
    setStage1(true);
    setMainStage(false);
  };
  useEffect(() => {
    if (search.length != 0) {
      searchProducts();
    } else {
      getProducts();
    }
  }, [currentPage, search,]);
  const getProducts = () => {
    fetch(
      `${process.env.REACT_APP_HOST_IP}/products/myproducts/?page=${currentPage}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data?.data);
        setTotalPage(data?.meta?.total_pages);
      })
      .catch((error) => console.log(error));
  };
  const searchProducts = () => {
    fetch(
      `${process.env.REACT_APP_HOST_IP}/products/myproducts/search/?page=${currentPage}&keyword=${search}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data?.data);
        setTotalPage(data?.meta?.total_pages);
      })
      .catch((error) => console.log(error));
  };
  const [detailStage, setDetailStage,] = useState(false);
  const [detailProduct, setDetailProduct,] = useState(false);
  const openDetail = () => {
    setDetailStage(true);
    setMainStage(false);
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
              <TextInput
                value={search}
                setValue={setSearch}
                placeholder={'Tìm kiếm sản phẩm...'}
              />
            </div>
            <div>
              {products.map((product) => (
                <ProductContainer
                  onChange={openDetail}
                  setDetailItem={setDetailProduct}
                  key={product?.id}
                  product={product}
                />
              ))}
            </div>
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      {stage1 && (
        <SaleStage1
          types={types}
          setType={setType}
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
          setMainStage={setMainStage}
          getProducts={getProducts}
        />
      )}
      {detailStage && (
        <ProductDetail
          product={detailProduct}
          detailStage={detailStage}
          setDetailStage={setDetailStage}
          setMainStage={setMainStage}
          getProducts={getProducts}
          setTakedProduct={setTakedProduct}
          setUpdateStage={setUpdateStage}
        />
      )}
      {updateStage && (
        <UpdateProduct
          updateStage={updateStage}
          setUpdateStage={setUpdateStage}
          setMainStage={setMainStage}
          product={takedProduct}
          types={types}
        />
      )}
    </>
  );
}

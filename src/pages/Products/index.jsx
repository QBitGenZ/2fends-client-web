import React, { useState, useEffect, } from 'react';
import moment from 'moment';
import { Pagination, } from '~/components';
import './index.css';
import { HeadTitle, TextInput, } from '~/components';
import { ProductDetail, } from './components';
export default function Products() {
  const [detailStage, setDetailStage,] = useState(false);
  const [storedStage, setStoredStage,] = useState(true);
  const [detailproduct, setDetailProduct,] = useState(false);
  const [products, setProduct,] = useState([]);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [search, setSearch,] = useState('');
  useEffect(() => {
    console.log('Search:' + search);
    if (search.length != 0) {
      searchProducts();
    } else {
      getProducts();
    }
  }, [currentPage, search,]);

  const getProducts = () => {
    fetch(
      `${process.env.REACT_APP_HOST_IP}/products/myproducts/?page=${currentPage}&limit=12`,
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
  const toDetail = (product) => {
    setDetailStage(true);
    setStoredStage(false);
    setDetailProduct(product);
  };
  return (
    <>
      {storedStage && (
        <div id={'storedproducts'}>
          <HeadTitle>Sản phẩm tồn kho</HeadTitle>
          <div className={'products-smallcontainer'}>
            <div className={'search'}>
              <TextInput
                value={search}
                setValue={setSearch}
                placeholder={'Tìm kiếm sản phẩm...'}
              />
            </div>
          </div>
          <div className={'Product-Table'}>
            <table id='ProductTable'>
              <tr className='propdtabletr'>
                <th className='prodtabletdth prodtableth'>STT</th>
                <th className='prodtabletdth prodtableth'>Người đăng</th>
                <th className='prodtabletdth prodtableth'>Tên sản phẩm</th>
                <th className='prodtabletdth prodtableth'>
                  Thời gian đăng tải
                </th>
                <th className='prodtabletdth prodtableth'>Số lượng</th>
              </tr>
              <tbody>
                {products.map((product,index) => (
                  <tr
                    key={product?.id}
                    className='ModalBtn propdtabletr'
                    onClick={() => toDetail(product)}
                  >
                    <td className='prodtabletd prodtabletdth'>
                      {index+1}
                    </td>
                    <td className='prodtabletd prodtabletdth'>
                      {product?.user}
                    </td>
                    <td className='prodtabletd prodtabletdth'>
                      {product?.name}
                    </td>
                    <td className='prodtabletd prodtabletdth'>
                      {moment(product?.create_at).format('HH:mm DD/MM/YYYY')}
                    </td>
                    <td className='prodtabletd prodtabletdth'>
                      {product?.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      {detailStage && (
        <ProductDetail
          detailStage={detailStage}
          setDetailStage={setDetailStage}
          product={detailproduct}
          setStoredStage={setStoredStage}
        />
      )}
    </>
  );
}

import React, { useEffect, useState, } from 'react';
import './index.css';
import { HeadTitle, Title, TextInput, } from '~/components';

import { Pagination, } from '~/components';
import { AddEvent, EventDetail, UpdateEvent, } from './components';
import EventContainer from './components/EventContainer';
import { ProductDetail, } from './components';

export default function Donation() {
  const [mainstage, setMainStage,] = useState(true);
  const [stageAdd, setStageAdd,] = useState(false);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [events, setEvent,] = useState([]);
  const [takedEvents, setTakedEvent,] = useState([]);
  const [updateStage, setUpdateStage,] = useState(false);
  const [search, setSearch,] = useState('');
  const [detailProduct, setDetailProduct,] = useState(false);
  const [productDonate, setProductDonate,] = useState();
  const [quantity, setQuantity,] = useState();
  const changeToProductDetail = () => {
    setDetailStage(false);
    setDetailProduct(true);
  };
  const openAddEvent = () => {
    setStageAdd(true);
    setMainStage(false);
  };
  useEffect(() => {
    if (search.length != 0) {
      searchEvents();
    } else {
      getEvents();
    }
  }, [currentPage, search,]);
  const getEvents = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/events/my/?page=${currentPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvent(data?.data);
        setTotalPage(data?.meta?.total_pages);
      })
      .catch((error) => console.log(error));
  };
  const searchEvents = () => {
    fetch(
      `${process.env.REACT_APP_HOST_IP}/events/my/search/?page=${currentPage}&keyword=${search}`,
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
        setEvent(data?.data);
        setTotalPage(data?.meta?.total_pages);
      })
      .catch((error) => console.log(error));
  };
  const [detailStage, setDetailStage,] = useState(false);
  const [detailEvent, setDetailEvent,] = useState(false);
  const openDetail = () => {
    setDetailStage(true);
    setMainStage(false);
  };
  return (
    <>
      <div id={'donation'}>
        {mainstage && (
          <div>
            <HeadTitle>Tạo quyên góp</HeadTitle>
            <div className={'mainstage-button'} onClick={openAddEvent}>
              <p>Thêm sự kiện quyên góp</p>
            </div>
            <div className={'donation-smallcontainer'}>
              <div>
                <Title>Danh sách sự kiện</Title>
              </div>
              <div>
                <TextInput
                  value={search}
                  setValue={setSearch}
                  placeholder={'Tìm kiếm sự kiện...'}
                />
              </div>
              <div>
                {events.map((event) => (
                  <EventContainer
                    openDetail={openDetail}
                    setDetailEvent={setDetailEvent}
                    key={event?.id}
                    event={event}
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
        {stageAdd && (
          <AddEvent
            stageAdd={stageAdd}
            setStageAdd={setStageAdd}
            setMainStage={setMainStage}
            getEvents={getEvents}
          />
        )}
        {detailStage && (
          <EventDetail
            event={detailEvent}
            setDetailStage={setDetailStage}
            detailStage={detailStage}
            setMainStage={setMainStage}
            getEvents={getEvents}
            setUpdateStage={setUpdateStage}
            setTakedEvent={setTakedEvent}
            setProductDonate={setProductDonate}
            productDonate={productDonate}
            changeToProductDetail={changeToProductDetail}
            setQuantity={setQuantity}
          />
        )}
        {updateStage && (
          <UpdateEvent
            event={takedEvents}
            setUpdateStage={setUpdateStage}
            updateStage={updateStage}
            setDetailStage={setDetailStage}
            getEvents={getEvents}
          />
        )}
        {detailProduct && (
          <ProductDetail
            product={productDonate}
            detailStage={detailProduct}
            setDetailStage={setDetailProduct}
            setStoredStage={setDetailStage}
            quantity={quantity}
          />
        )}
      </div>
    </>
  );
}

import React, { useEffect, useState, } from 'react';
import './index.css';
import { HeadTitle, Title, } from '~/components';

import { Pagination, } from '~/components';
import { AddEvent, EventDetail, } from './components';
import EventContainer from './components/EventContainer';

export default function Donation() {
  const [mainstage, setMainStage,] = useState(true);
  const [stageAdd, setStageAdd,] = useState(false);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [events, setEvent,] = useState([]);
  const openAddEvent = () => {
    setStageAdd(true);
    setMainStage(false);
  };
  useEffect(() => {
    getProducts();
  }, [currentPage,]);
  const getProducts = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/events/?page=${currentPage}`, {
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
              <p>Thêm sự kiện quyên Góp</p>
            </div>
            <div className={'donation-smallcontainer'}>
              <div>
                <Title>Danh sách sản phẩm</Title>
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
          />
        )}
        {detailStage && (
          <EventDetail
            product={detailEvent}
            setDetailStage={setDetailStage}
            detailStage={detailStage}
            setMainStage={setMainStage}
          />
        )}
      </div>
    </>
  );
}

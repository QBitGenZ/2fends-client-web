import React, { useState, } from 'react';
import { HeadTitle, SelectItemBox, Title, } from '~/components';
import './index.css';
import { SaleStage1, SaleStage2, } from './components';
export default function Sales() {
  const [mainstage, setMainStage,] = useState(true);
  const [stage1, setStage1,] = useState(false);
  const [stage2, setStage2,] = useState(false);

  const openS1 = () => {
    setStage1(true);
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
              <SelectItemBox>Nam</SelectItemBox>
              <SelectItemBox>Nữ</SelectItemBox>
              <SelectItemBox>Unisex</SelectItemBox>
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
        />
      )}
      {stage2 && (
        <SaleStage2
          stage2={stage2}
          setStage2={setStage2}
          setStage1={setStage1}
        />
      )}
    </>
  );
}
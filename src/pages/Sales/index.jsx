import React from 'react';
import { SelectItemBox, Title, } from '~/components';
import './index.css';

export default function Sales() {
  return (
    <div id={'sales'}>
      <div className={'page-title'}>
        <Title>Đăng bán sản phẩm</Title>
      </div>
      <div>
        <div>
          <Title>Giới tính</Title>
        </div>
        <div>
          <SelectItemBox>Nam</SelectItemBox>
          <SelectItemBox>Nữ</SelectItemBox>
          <SelectItemBox>Unisex</SelectItemBox>
        </div>
      </div>
      <div>
        <div>
          <Title>Loại sản phẩm</Title>
        </div>
        <div>
          <SelectItemBox>Nam</SelectItemBox>
          <SelectItemBox>Nữ</SelectItemBox>
          <SelectItemBox>Unisex</SelectItemBox>
        </div>
      </div>
    </div>
  );
}
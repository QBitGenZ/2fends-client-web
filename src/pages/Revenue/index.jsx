import React from 'react';
import { HeadTitle, Title, } from '~/components';
import { RevenueChart, } from './components';
import './index.css';
export default function Revenue() {
  return (
    <div id={'revenue'}>
      <HeadTitle>Thống kê doanh thu</HeadTitle>
      <div className={'revenue-smallcontainer'}>
        <div className={'revenue-chart'}>
          <Title>Biểu đồ danh thu tháng</Title>
        </div>
        <div>
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}

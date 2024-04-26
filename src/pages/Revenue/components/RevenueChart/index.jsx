import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import React, { useState, useEffect, } from 'react';
import { Line, } from 'react-chartjs-2';
import './index.css';
export default function RevenueChart() {
  const [chartdatarevenue, setChartDatarevenue,] = useState([]);
  const [chartdatatotalsold, setChartDatatotalsold,] = useState([]);
  const [fromdate, setFromDate,] = useState('2024-03-20');
  const [todate, setToDate,] = useState('2024-06-25');
  useEffect(() => {
    loadStatis();
  }, []);
  const loadStatis = () => {
    console.log(fromdate);
    console.log(todate);
    fetch(
      `${process.env.REACT_APP_HOST_IP}/statistics/my-revenue/?start_date=2024-03-20&end_date=2024-06-25`,
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
        setChartDatarevenue(data?.data);
        const transformedData = {
        };
        const transformedData1 = {
        };
        data?.data.forEach((item) => {
          const monthYear = item.month.slice(0, 7); 
          transformedData[monthYear] = item?.revenue; 
        });
        data?.data.forEach((item) => {
          const monthYear = item.month.slice(0, 7); 
          transformedData1[monthYear] = item?.total_sold; 
        });
        setChartDatarevenue(transformedData);
        setChartDatatotalsold(transformedData1);
      })
      .catch((error) => console.log(error));
  };
  console.log(chartdatarevenue);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: Object.keys(chartdatarevenue),
    datasets: [
      {
        label: 'Doanh thu( VNĐ)',
        data: Object.values(chartdatarevenue),
        fill: true,
        backgroundColor: '#006AFF',
        pointBorderColor: 'black',
        color: 'pink',
        pointBorderWidth: 5,
        pointRadius: 8,
        tension: 0.4,
      },
      {
        label: 'Số lượng bán( Sản phẩm)',
        data: Object.values(chartdatatotalsold),
        fill: true,
        backgroundColor: '#006AFF',
        pointBorderColor: 'black',
        color: 'pink',
        pointBorderWidth: 5,
        pointRadius: 8,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        bottom: 100,
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'black',
          font: {
            size: 18,
          },
        },
        grid: {
          color: '#243240',
        },
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 18,
          },
        },
      },
    },
  };
  return (
    <>
      <div className={'revenue-container'}>
        <Line className={'chart-container'} data={data} options={options} />
        <div className='formtodate-container'>
          <input
            className='dateto'
            name='fromdate'
            type='date'
            onChange={(e) => {
              setFromDate(e.target.value);
              loadStatis();
            }}
          />
          <p className='fromtodate'>TO</p>
          <input
            className='dateto'
            name='todate'
            type='date'
            onChange={(e) => {
              setToDate(e.target.value);
              loadStatis();
            }}
          />
        </div>
      </div>
    </>
  );
}

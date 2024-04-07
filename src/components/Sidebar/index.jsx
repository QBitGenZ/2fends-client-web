import React from 'react';
import sidebar from '~/constants/Sidebar';
import PropTypes from 'prop-types';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import './index.css';

export default function Sidebar({ setPage, }) {
  return (
    <div id={'side-bar'}>
      <div className={'logo-container'}>
        <img
          key={'logo'}
          src={`${process.env.PUBLIC_URL}assets/images/commons/logo.png`}
        />
      </div>
      {sidebar.map((item, index) => (
        <SidebarItem key={index} item={item} setPage={setPage}/>
      ))}
    </div>
  );
}

function SidebarItem({ item, setPage, }) {
  return (
    <div className={'side-bar-item '} onClick={() => setPage(item.page)}>
      <FontAwesomeIcon icon={item.icon} className={'icon'}/>
      <span className={'label'}>{item?.label}</span>
    </div>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.any,
  setPage: PropTypes.func,
};

Sidebar.propTypes = {
  setPage: PropTypes.func,
};
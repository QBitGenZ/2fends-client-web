import React from 'react';
import sidebar from '~/constants/Sidebar';
import PropTypes from 'prop-types';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import './index.css';
import { Link, } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div id={'side-bar'}>
      <div className={'logo-container'}>
        <img
          key={'logo'}
          src={`${process.env.PUBLIC_URL}assets/images/commons/logo.png`}
        />
      </div>
      {sidebar.map((item, index) => (
        <SidebarItem key={index} item={item}/>
      ))}
    </div>
  );
}

function SidebarItem({ item, }) {
  return (

    <Link to={item.path}>
      <div className={'side-bar-item '}>
        <FontAwesomeIcon icon={item.icon} className={'icon'}/>
        <span className={'label'}>{item?.label}</span>
      </div>
    </Link>

  )
  ;
}

SidebarItem.propTypes = {
  item: PropTypes.any,
  setPage: PropTypes.func,
};
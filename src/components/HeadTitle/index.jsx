import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function HeadTitle({ children, }) {
  return (
    <div className={'header-title'}>
      { children }
    </div>
  );
}

HeadTitle.propTypes = {
  children: PropTypes.any,
};
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Title({ children, }) {
  return (
    <span className={'title'}>
      {children}
    </span>
  );
}

Title.propTypes = {
  children: PropTypes.any.isRequired,
};
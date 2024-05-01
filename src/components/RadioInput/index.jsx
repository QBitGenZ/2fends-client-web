import PropTypes from 'prop-types';
import React, { useState, } from 'react';
import './index.css';

export default function InputRadio({ children, value, }) {
  const [selected, setSelected,] = useState(false);

  return (
    <div className={'select-item-box ' + (selected ? 'selected' : '')} id={value} onClick={() => setSelected(!selected)}>
      {children}
    </div>
  );
}

InputRadio.propTypes = {
  children: PropTypes.any.isRequired,
  value: PropTypes.string,
};
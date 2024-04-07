import PropTypes from 'prop-types';
import React, { useState, } from 'react';
import './index.css';

export default function SelectItemBox({ children, }) {
  const [selected, setSelected,] = useState(false);

  return (
    <div className={'select-item-box ' + (selected ? 'selected' : '')} onClick={() => setSelected(!selected)}>
      {children}
    </div>
  );
}

SelectItemBox.propTypes = {
  children: PropTypes.any.isRequired,
};
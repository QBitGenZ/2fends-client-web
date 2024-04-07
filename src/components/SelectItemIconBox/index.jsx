import PropTypes from 'prop-types';
import React, { useState, } from 'react';
import './index.css';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

export default function SelectItemIconBox({ children, icon, }) {
  const [selected, setSelected,] = useState(false);

  return (
    <div className={'select-item-icon-box ' + (selected ? 'selected' : '')} onClick={() => setSelected(!selected)}>
      <div><FontAwesomeIcon icon={icon}/></div>
      <div>{children}</div>
    </div>
  );
}

SelectItemIconBox.propTypes = {
  icon: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function TextAreaInput ({ value, setValue, rowNumber, placeholder, }) {
  return (
    <textarea className={'text-area-input'} rows={rowNumber} placeholder={placeholder} value={value}
      onChange={(e) => setValue(e.target.value)}/>
  );
}

TextAreaInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  rowNumber: PropTypes.number.isRequired,
};
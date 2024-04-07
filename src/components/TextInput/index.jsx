import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function TextInput ({ value, setValue, placeholder, }) {
  return (
    <input className={'text-input'} type={'text'} placeholder={placeholder} value={value}
      onChange={(e) => setValue(e.target.value)}/>
  );
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
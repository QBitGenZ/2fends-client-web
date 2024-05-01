import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

export default function InputRadio({ children, value, setValue, name, }) {
  return (
    <input
      style={{
        margin: '2% 2% 0 0',
        width: '100px',
        height: '40px',
      }}
      className={'radio-input'}
      type='radio'
      name={name}
      value={value}
      onClick={(e) => setValue(e.target.value)}
      label={children}
    />
  );
}

InputRadio.propTypes = {
  children: PropTypes.any.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.string,
  name: PropTypes.string,
};

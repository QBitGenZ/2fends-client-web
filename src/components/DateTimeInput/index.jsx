import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function DateTimeInput({ value, setValue, }) {
  return (
    <input className={'date-time-input'} type={'datetime-local'} value={value}
      onChange={(e) => setValue(e.target.value)}/>
  );
}

DateTimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
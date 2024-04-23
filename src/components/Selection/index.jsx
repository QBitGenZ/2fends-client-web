import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
export default function Selection({ value, setValue, options, }) {
  return (
    <select className={'select-input'} value={value} onChange={(e)=>(setValue(e.target.value))}>
      {options.map((item, index) => (
        <option value={item?.value} key={index} label={item?.label}/>
      ))}
    </select>
  );
}

Selection.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  options: PropTypes.array,
};

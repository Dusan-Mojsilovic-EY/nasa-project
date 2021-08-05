/* eslint-disable react/prop-types */
import React from "react";

const Input = ({ type, placeholder, name, value, onChange, disabled, list, min, max, id, maxlength, pattern }) => {

  return (
    <input 
    type={type} 
    placeholder={placeholder} 
    id={id}
    list={list}
    name={name}
    pattern={pattern}
    min={min} 
    max={max}
    value={value}
    disabled={disabled}
    onChange={onChange}
    maxLength={maxlength}/>
  );
};

export default Input;

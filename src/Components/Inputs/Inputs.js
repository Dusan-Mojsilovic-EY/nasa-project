import React from "react";

const Input = ({ type, placeholder, name, value, onChange, disabled, list, id }) => {

  return (
    <input 
    type={type} 
    placeholder={placeholder} 
    id={id}
    list={list}
    name={name}
    value={value}
    disabled={disabled}
    onChange={onChange}/>
  );
};

export default Input;

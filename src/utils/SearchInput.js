import React from "react";

const SearchInput = ({
  id,
  value,
  name,
  type,
  onChangesearchVal,
  placeholder,
}) => {
  return (
    <input
      id={id}
      value={value}
      name={name}
      type={type}
      onChange={onChangesearchVal}
      className="form-control p-3 mx-2 m-1"
      placeholder={placeholder}
    />
  );
};

export default SearchInput;

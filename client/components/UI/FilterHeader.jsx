import React from 'react';

const FilterHeader = (props) => {
  return (
    <h2 className="mb-2 text-2xl text-primary-button-green underline">
      {props.children}
    </h2>
  );
};

export default FilterHeader;

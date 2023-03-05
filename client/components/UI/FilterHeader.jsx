import React from 'react';

const FilterHeader = (props) => {
  return (
    <h2 className="text-3xl mb-2 underline text-primary-button-green">
      {props.children}
    </h2>
  );
};

export default FilterHeader;

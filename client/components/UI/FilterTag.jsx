import React from 'react';

const FilterTag = (props) => {
  return (
    <button className="block hover:underline">
      <li>{props.children}</li>
    </button>
  );
};

export default FilterTag;

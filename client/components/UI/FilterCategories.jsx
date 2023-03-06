import React from 'react';

const FilterCategories = (props) => {
  return (
    <div className="flex gap-4">
      <ul className="">{props.children}</ul>
    </div>
  );
};

export default FilterCategories;

import React from 'react';

const FilterCategories = (props) => {
  return (
    <div className="flex gap-4 text-center">
      <ul className="text-center">{props.children}</ul>
    </div>
  );
};

export default FilterCategories;

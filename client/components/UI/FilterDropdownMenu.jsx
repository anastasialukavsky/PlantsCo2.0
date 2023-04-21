import React from 'react';
import FilterCategories from './FilterCategories.jsx';
import FilterHeader from './FilterHeader.jsx';
import FilterTag from './FilterTag.jsx';

const FilterDropdownMenu = (props) => {
  const { handleHide, handleHover, display } = props;
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHide}
      className={`top-36 h-44 w-screen ${display} left-0 z-10 flex justify-center gap-6 border-t-2 border-primary-deep-green bg-gray-100 text-center`}
    >
      <div className="">
        <FilterHeader>Size</FilterHeader>
        <FilterCategories>
          <FilterTag>Small</FilterTag>
          <FilterTag>Medium</FilterTag>
          <FilterTag>Large</FilterTag>
        </FilterCategories>
      </div>
      <div className="">
        <FilterHeader>Light</FilterHeader>
        <FilterCategories>
          <FilterTag>Low/Artificial</FilterTag>
          <FilterTag>Partial/Bright indirect</FilterTag>
          <FilterTag>Direct sunlight</FilterTag>
        </FilterCategories>
      </div>
      <div className="">
        <FilterHeader>Type</FilterHeader>
        <FilterCategories>
          <FilterTag>Small</FilterTag>
          <FilterTag>Medium</FilterTag>
          <FilterTag>Large</FilterTag>
        </FilterCategories>
      </div>
    </div>
  );
};

export default FilterDropdownMenu;

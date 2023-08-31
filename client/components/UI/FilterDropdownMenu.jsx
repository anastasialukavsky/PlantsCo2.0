import React from 'react';
import FilterCategories from './FilterCategories.jsx';
import FilterHeader from './FilterHeader.jsx';
import FilterTag from './FilterTag.jsx';

const FilterDropdownMenu = (props) => {
  const { handleHide, handleHover, display } = props;



  return (
    <div onClick={handleHide}
      onMouseEnter={handleHover}
      onMouseLeave={handleHide}
      className={`absolute 6xl:top-8 top-5  md:top-4 xl:top-6 h-[15dvh] md:h-[17dvh] 6xl:h-[13dvh] w-full portrait:w-full md:w-[45%] ${display} z-10 flex justify-center gap-10 bg-[#283f3b]/90 text-center font-outfit text-white`}
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

import React from 'react';

const FilterHeader = (props) => {
  return (
    <h2 className="mb-2 mt-3 text-[3.9vw] md:text-[1.5vw] 3xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.8vw] text-white underline underline-offset-2 uppercase portrait:lg:text-[2.6vw]">
      {props.children}
    </h2>
  );
};

export default FilterHeader;

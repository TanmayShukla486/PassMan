// import React from 'react';

import Display from './Display';

const Manager = () => {
  return (
    <div
      className="
    absolute 
    inset-0 
    -z-10 
    h-full 
    w-full 
    items-center 
    px-5 
    py-24 
    [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#4C1D95_100%)]
    overflow-scroll
    no-scrollbar"
    >
      <div
        className="
      text-white
        flex
        mx-auto
        justify-center
      "
      >
        <h1
          className="
            font-outfit 
            font-extrabold
            text-4xl
            text-center
        "
        >
          Don't get hacked. Use Pass<span className="text-orange-400">Man</span>{' '}
          to keep your passwords safe.
        </h1>
      </div>
      <Display />
    </div>
  );
};

export default Manager;

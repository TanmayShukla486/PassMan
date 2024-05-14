// import React from "react";
import { FC } from 'react';

import { NavBarProps } from 'myTypes';

const NavBar: FC<NavBarProps> = ({ loggedIn }) => {
  return (
    <nav className="flex-row">
      <div className="flex mx-auto gap-3 justify-between bg-violet-950 h-16 text-white">
        <div className="ml-10 pt-4 font-outfit font-semibold">
          <h1 className="text-2xl">
            <span className="text-orange-400">&lt;</span>Pass
            <span className="text-orange-400">Man/&gt;</span>
          </h1>
        </div>
        {!loggedIn ? (
          <div className="mr-10 pt-5">
            <ul className="flex gap-4">
              <li>
                <a
                  className="hover:font-bold font-outfit font-semibold"
                  href="#"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  className="hover:font-bold font-outfit font-semibold"
                  href="#"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
};

export default NavBar;

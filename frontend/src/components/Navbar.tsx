// import React from "react";
import { FC, useContext, useState } from 'react';

import { NavBarProps } from 'myTypes';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const NavBar: FC<NavBarProps> = ({ loggedIn }) => {
  const [redirect, setRedirect] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const onClick = () => {
    if (confirm('Do you want to logout? Seriously why tho 🥺')) {
      if (user !== null) logoutUser(user);
      setRedirect(true);
    }
  };
  return (
    <nav className="flex-row">
      {redirect ? <Navigate to={'/login'} /> : ''}
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
                <Link
                  className="hover:font-bold font-outfit font-semibold"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="hover:font-bold font-outfit font-semibold"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="
            mr-10 
            pt-5
            gap-3
            "
          >
            <span className="mr-5">{user?.username}</span>
            <button
              className="
                bg-orange-400
                text-white
                w-[100px]
                rounded-xl
                border-2
                border-white
              "
              onClick={onClick}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

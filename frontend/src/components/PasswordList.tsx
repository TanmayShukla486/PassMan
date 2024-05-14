import { PasswordListProps, PasswordProps } from 'myTypes';
import { FC } from 'react';
import { useState } from 'react';
import Lottie from 'lottie-react';
import animation from '../assets/trash.json';

const PasswordItem: FC<PasswordProps> = ({ password }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="
        overflow-hidden
        py-2
        bg-indigo-400
        my-2
        rounded-lg
        text-white
        border-4
        border-violet-200
"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="
          flex
          justify-between
          w-full
          px-4
          mt-4
        "
      >
        <span
          className="
            text-xl
            ml-4
          "
        >
          {password.website}
        </span>
        {expanded ? (
          <span className="mr-4">-</span>
        ) : (
          <span className="mr-4">+</span>
        )}
      </button>
      <div
        className={`
            grid
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${
              expanded
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }
      `}
      >
        <div
          className="
            grid
            grid-cols-2
            justify-between
            overflow-hidden
            gap-2
            m-2
          "
        >
          <div className="mx-2 overflow-hidden">
            <div className="flex-col ">
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input
                  className="
                text-indigo-800
                w-[400px]
                rounded-lg
                border-2
                border-violet-950
                p-2
              "
                  id="email"
                  name="email"
                  type="text"
                  value={password.email}
                />
              </div>
            </div>
          </div>
          <div className="mx-2 overflow-hidden flex-col">
            <div>
              <label htmlFor="username">Username</label>
            </div>
            <div>
              <input
                className="
                text-indigo-800
                w-[400px]
                rounded-lg
                border-2
                border-violet-950
                p-2
              "
                id="username"
                name="username"
                type="text"
                value={password.username}
              />
            </div>
          </div>
          <div className="mx-2 overflow-hidden flex-col">
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <input
                className="
                text-indigo-800
                w-[400px]
                rounded-lg
                border-2
                border-violet-950
                p-2
              "
                id="password"
                name="password"
                type="text"
                value={password.username}
              />
            </div>
          </div>
          <div
            className="
            flex-col
            p-6
            pl-12
            w-[400px]
            overflow-hidden
            mx-2
          "
          >
            <button
              className="
                flex 
                justify-center
                bg-orange-400
                w-[150px]
                rounded-xl
                border-2
                border-white
                p-2
              "
            >
              <Lottie
                className="
              w-5
              h-5
            "
                animationData={animation}
              />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordList: FC<PasswordListProps> = ({ list }): JSX.Element => {
  return (
    <div className="pb-8">
      {list.map((val) => (
        <PasswordItem password={val} />
      ))}
    </div>
  );
};

export default PasswordList;

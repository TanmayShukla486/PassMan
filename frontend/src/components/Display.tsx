import { Password } from 'myTypes';
import { ChangeEvent, useState } from 'react';
import PasswordList from './PasswordList';

const dummyPassword: Password = {
  email: 'tanmay.shukla629@gmail.com',
  username: 'Tanmay',
  password: '12345678',
  website: 'Dummy website',
};
const list: Password[] = [
  dummyPassword,
  dummyPassword,
  dummyPassword,
  dummyPassword,
  dummyPassword,
  dummyPassword,
  dummyPassword,
  dummyPassword,
  dummyPassword,
];
const Display = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*TODO */
  const onWebsiteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };
  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onSubmitClick = () => {
    setWebsite('');
    setUsername('');
    setPassword('');
  };

  return (
    <div
      className="
        bg-violet-950
        drop-shadow-lg
        border
      border-violet-300
        rounded-3xl 
        mx-auto 
        flex-column 
        justify-center
        h-fit-content
        w-3/4
        my-5
        "
    >
      <h1
        className="
            text-center 
            text-white
            mt-5
            text-2xl
            "
      >
        <span className="text-orange-400">&lt;</span>
        <span>Pass</span>
        <span className="text-orange-400">Man/&gt;</span>
      </h1>
      <div
        className="
            flex
            w-full
            mx-auto
        "
      >
        <input
          onChange={(e) => {
            onWebsiteChange(e);
          }}
          className="
                drop-shadow-lg
                rounded-xl
                w-full
                px-3
                py-2
                mx-8
                my-5
                h-6
            "
          placeholder="Enter website name"
          id="website_name"
          type="text"
          name="website_name"
          value={website}
        />
      </div>
      <div
        className="
            flex
            gap-1
        "
      >
        <input
          onChange={(e) => {
            onUsernameChange(e);
          }}
          className="
                rounded-xl
                px-3
                py-1
                mx-8
                my-2
                h-6
                w-full
            "
          placeholder="Enter Username"
          type="text"
          value={username}
        />

        <input
          onChange={(e) => {
            onPasswordChange(e);
          }}
          className="
                rounded-xl
                px-3
                py-1
                mx-8
                my-2
                h-6
                w-full
            "
          placeholder="Enter password"
          type="text"
          value={password}
        />
      </div>
      <div
        className="
            flex
            justify-center
            text-white
      "
      >
        <button
          className="
            bg-black
            px-2
            py-1
            w-20
            border
            border-white
            hover:bg-slate-800
            drop-shadow-lg
            rounded-full
          "
          onClick={onSubmitClick}
          type="button"
        >
          Submit
        </button>
      </div>
      <div
        className="
          flex-column
          mx-5
          justify-center
          text-center
          p-4
        "
      >
        <PasswordList list={list} />
      </div>
    </div>
  );
};

export default Display;

import { ChangeEvent, useContext, useEffect, useState } from 'react';
import PasswordList from './PasswordList';
import { AuthContext } from '../context/auth/AuthContext';
import Modal from './Modal';
import { Password } from 'myTypes';

const Display = () => {
  const [list, setList] = useState<Password[]>([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const { user } = useContext(AuthContext);

  const updateList = async (val: Password | null) => {
    if (val !== null) setList((prev) => [...prev, val]);
  };

  const addPassword = async () => {
    try {
      const email = user?.email;
      const body = {
        website,
        password,
        email,
        username,
      };
      const response = await fetch(
        'http://localhost:3000/password-api/passwords',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user?.authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const parsedData = await response.json();
      if (parsedData.error) {
        console.log(parsedData.error);
      } else {
        await updateList(parsedData.createdPassword as Password);
      }
    } catch (e) {
      setLoggedIn(false);
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/password-api/passwords',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user?.authToken}`,
            },
          }
        );
        const parsedData = await response.json();
        if (parsedData.error) {
          setLoggedIn(false);
        } else {
          setList(parsedData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchResponse();
  }, [user?.authToken]);

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
    addPassword();
  };

  return (
    <div>
      {!loggedIn ? <Modal /> : ''}
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
          {list.length > 0 ? (
            <PasswordList
              list={list}
              setList={setList}
            />
          ) : (
            <div className="text-2xl text-white">
              No saved passwords. Chop Chop! Save more!!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;

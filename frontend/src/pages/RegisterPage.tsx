import { useContext, useEffect, useState, ChangeEvent } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { Link, Navigate } from 'react-router-dom';

function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
function isValidPassword(password: string) {
  return password.length >= 8;
}

const Register = () => {
  const context = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (context.user !== null) console.log(context.user);
  }, [context.user]);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onClick = async () => {
    if (
      username !== '' &&
      email !== '' &&
      password !== '' &&
      isValidEmail(email) &&
      isValidPassword(password)
    ) {
      const data = {
        username,
        email,
        password,
      };
      const response = await fetch(
        'http://localhost:3000/password-api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const parsedData = await response.json();
      console.log(parsedData.error);
      if (parsedData.error) {
        if (parsedData.error.includes('Username')) {
          alert('Username already in use. Better luck next time!');
          setUsername('');
        } else if (parsedData.error.includes('Email')) {
          alert(
            "Email already taken. Did you hack one of our users accounts! They musn't have used a strong password lol"
          );
          setEmail('');
        }
      } else {
        const otpData = {
          email,
        };
        const otpResponse = await fetch(
          'http://localhost:3000/password-api/otp/generate',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(otpData),
          }
        );
        const parsedResp = await otpResponse.json();
        if (parsedResp.error) {
          setPassword('');
          setUsername('');
          setEmail('');
          alert(parsedResp.error);
        } else {
          context.loginUser({
            username,
            email,
            authToken: '',
          });
          setRedirect(true);
        }

        setRedirect(true);
      }
    } else if (!email || !password || !username) {
      alert(
        "Missing Fields, all fields must be filled. Haven't filled a form recently?"
      );
    } else if (!isValidEmail(email)) {
      alert(
        "Invalid email format. Still can't write an email properly huh. Old......"
      );
    } else if (!isValidPassword(password)) {
      alert(
        'Invalid password. Length must be atleast 8 chars. You new to the Internet or something'
      );
    }
  };

  return (
    <div>
      {redirect ? <Navigate to="/verify" /> : ''}
      <div
        className="
        flex
        justify-center
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
      ></div>
      <div
        className="
          font-outfit
          flex
          mx-auto
          justify-center
          h-screen
          items-center
          text-center
          w-1/2

      "
      >
        <div
          className="
          bg-violet-500
          border-8
          border-white
          text-xl
          h-fit
          w-[1000px]
          flex-col
          justify-center
          rounded-3xl
          py-8
        "
        >
          <div className="text-white text-center  ">
            <span className="text-3xl font-bold">Register Now!!</span>
          </div>
          <div
            className="
            flex
            justify-center
            gap-4
            my-4
            "
          >
            <label
              className="
          text-white
            mt-2
          "
            >
              Email:
            </label>
            <input
              className="
                rounded-xl
                p-2
                border-2
                border-violet-950
                w-3/4
              "
              value={email}
              onChange={(e) => onChangeEmail(e)}
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div
            className="
            flex
            justify-center
            gap-4
            my-4
            "
          >
            <label
              className="
          text-white
            mt-2
          "
            >
              Username:
            </label>
            <input
              className="
                rounded-xl
                p-2
                border-2
                border-violet-950
                w-3/4
              "
              value={username}
              onChange={(e) => onChangeUsername(e)}
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div
            className="
            flex
            justify-center
            gap-4
            my-4
            "
          >
            <label
              className="
          text-white
            mt-2
          "
            >
              Password:
            </label>
            <input
              className="
                rounded-xl
                p-2
                border-2
                border-violet-950
                w-3/4
              "
              onChange={(e) => onChangePassword(e)}
              value={password}
              type="password"
              placeholder="Enter password"
            />
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={onClick}
              className="
              bg-orange-400
              text-white
              rounded-lg
              border-2
              border-orange-950
              w-[100px]
              h-9
              font-bold
              "
            >
              Register
            </button>
            <Link
              className="my-2 "
              to="/login"
            >
              Already a user? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

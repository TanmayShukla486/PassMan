import { useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { Link, Navigate } from 'react-router-dom';

function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

const Login = () => {
  const context = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClick = async () => {
    if (email !== '' && password !== '' && isValidEmail(email)) {
      const user = {
        email,
        password,
      };
      const response = await fetch(
        'http://localhost:3000/password-api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      const parsedData = await response.json();
      context.loginUser(parsedData);
      console.log(parsedData);
      setRedirect(true);
    } else if (!isValidEmail(email)) {
      alert('Invalid email format');
    } else alert('Missing fields');
  };

  // const onClick = async () => {
  //   // console.log(context);
  // };

  return (
    <div>
      {redirect ? <Navigate to={'/passwords'} /> : ''}
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
            <span className="text-3xl font-bold">Login Now!!</span>
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
              value={password}
              onChange={(e) => onChangePassword(e)}
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
              Login
            </button>
            <Link
              className="my-2 "
              to="/register"
            >
              Not a user? Register!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Modal = () => {
  const [redirect, setRedirect] = useState(false);
  return (
    <div
      className="
        fixed
        inset-0
        text-white
        bg-black
        bg-cover
        bg-opacity-35
        backdrop-blur-sm
        z-50
        flex
        justify-center
    "
    >
      {redirect ? <Navigate to={'/login'} /> : ''}
      <div
        className="
        self-center
        mx-5
        my-8
        h-fit
        w-[550px]
        z-50
      bg-indigo-400
        border-4
        border-white
        rounded-3xl
      "
      >
        <div
          className="
            my-4
            flex-col
            justify-center
            align-middle
            text-center
        "
        >
          <div
            className="
                m-2
                text-3xl
                text-center    
            "
          >
            You're not logged in! You cheeky bastard, trying to snoop ?
          </div>
          <button
            className="
                text-2xl
                bg-orange-400
                rounded-lg
                p-2
                border-2
                border-orange-950
            "
            onClick={() => setRedirect(true)}
          >
            Go to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

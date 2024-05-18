import { ChangeEvent, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [rollback, setRollback] = useState(false);
  const { user } = useContext(AuthContext);
  const [tries, setTries] = useState(1);

  const onChangeOtp = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const onClick = async () => {
    if (otp.length != 6) {
      alert(
        'Invalid length of OTP please check and try again. Use your specs maybe🤷'
      );
    } else {
      const body = {
        email: user?.email,
        otp,
      };
      console.log(body);
      const response = await fetch(
        'http://localhost:3000/password-api/otp/verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const parsedData = await response.json();
      if (parsedData.error) {
        alert(parsedData.error);
        const temp = {
          email: user?.email,
        };
        const deleteReq = await fetch('https://localhost:3000/users/register', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(temp),
        });
        const parsedReq = await deleteReq.json();
        if (parsedReq.error) {
          console.log(parsedReq.error);
        } else {
          setRollback(true);
        }
      } else if (parsedData.verification.includes('successful')) {
        alert('OTP verified successfully. One more achievement for the wall');
        setRedirect(true);
      } else if (parsedData.verification.includes('failed')) {
        if (tries <= 3) {
          alert(`Otp verification failed. You have ${3 - tries} tries left`);
          setTries((prev) => prev + 1);
        } else {
          alert(
            "Otp verification failed completely. Didn't expect this from you. Redirecting to Register screen"
          );
          const temp = {
            email: user?.email,
          };
          const deleteReq = await fetch(
            'https://localhost:3000/users/register',
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(temp),
            }
          );
          const parsedReq = await deleteReq.json();
          if (parsedReq.error) {
            console.log(parsedReq.error);
          } else {
            setRollback(true);
          }
        }
      }
    }
  };

  return (
    <div>
      {redirect ? <Navigate to="/login" /> : ''}
      {rollback ? <Navigate to="/register" /> : ''}
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
            <span className="text-3xl font-bold">Verify</span>
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
              OTP:
            </label>
            <input
              className="
                    rounded-xl
                    p-2
                    border-2
                    border-violet-950
                    w-3/4
                  "
              value={otp}
              onChange={(e) => onChangeOtp(e)}
              type="text"
              placeholder="Enter OTP received"
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
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;

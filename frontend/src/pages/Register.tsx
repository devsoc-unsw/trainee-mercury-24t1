import { useState } from 'react';
import logo from "../assets/logo.png";
import stockPhoto from "../assets/stockPhoto.png";

export default function Register() {
  document.body.style.overflow = 'hidden';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const registerUser = () => {
    // Register goes here
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (password !== retypePassword) {
      alert("Password Mismatch");
    }
    else if (email === '' || password === '' || retypePassword === '') {
      alert("Incomplete Fields");
    }
    else if (emailRegex.test(email) === false) {
      alert("Invalid Email");
    }
    else {
      console.log(email, password, retypePassword);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-3/5 bg-green-500">
        <img className="w-full h-full" src={stockPhoto}></img>
      </div>
      <div className="w-2/5 flex flex-col justify-center items-center bg-Blue1">
        <div className="flex flex-col w-3/4">
          <div className="flex justify-center items-center mb-5">
            <img className="w-14 h-14 mr-4" src={logo}></img>
            <span className="text-[64px] text-Blue2 font-bold font-Inter">AlgoDle</span>
          </div>
          <span className="text-[36px] text-Blue2 font-bold font-Inter mb-1.5">Welcome!</span>
          <span className="text-[20px] text-Blue2 font-bold font-Inter mb-1.5">Email Address</span>
          <input
            className="h-12 p-2 rounded text-lg mb-4"
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <span className="text-[20px] text-Blue2 font-bold font-Inter mb-1.5">Password</span>
          <input
            className="h-12 p-2 rounded text-lg mb-6"
            type="text"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <span className="text-[20px] text-Blue2 font-bold font-Inter mb-1.5">Retype Password</span>
          <input
            className="h-12 p-2 rounded text-lg mb-6"
            type="text"
            onChange={e => setRetypePassword(e.target.value)}
            value={retypePassword}
          />
          <div className="flex justify-center items-center mb-5">
            <button
              className="text-[28px] text-Blue2 font-bold font-Inter bg-Pink1 hover:bg-Pink2 px-24 py-1.5 rounded-lg transition duration-500 hover:scale-110"
              onClick={registerUser}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
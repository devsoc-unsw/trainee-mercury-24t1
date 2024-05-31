import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
import stockPhoto from "../assets/algomes2.jpg";

export default function Register() {
  document.body.style.overflow = "hidden";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    // Register goes here
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (password !== retypePassword) {
      alert("Password Mismatch");
    } else if (email === "" || password === "" || retypePassword === "") {
      alert("Incomplete Fields");
    } else if (emailRegex.test(email) === false) {
      alert("Invalid Email");
    } else {
      // localStorage.setItem('user', JSON.stringify({ email, password }));
      // console.log(email, password, retypePassword);
      // navigate('/login');

      try {
        const res = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        // Throw error if fetch is unsuccessful
        if (!res.ok) {
          throw new Error(data.error);
        }

        navigate("/login");
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      }
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
            {/* <img className="w-14 h-14 mr-4" src={logo}></img> */}
            <span className="text-[64px] text-black text-opacity-75 font-bold font-Inter">
            🤓Algomes
            </span>
          </div>
          <span className="text-[36px] text-black text-opacity-75 font-bold font-Inter mb-1.5">
            Welcome!
          </span>
          <span className="text-[20px] text-black text-opacity-75 font-bold font-Inter mb-1.5">
            Email Address
          </span>
          <input
            className="h-12 p-2 rounded text-lg mb-4"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span className="text-[20px] text-black text-opacity-75 font-bold font-Inter mb-1.5">
            Password
          </span>
          <input
            className="h-12 p-2 rounded text-lg mb-6"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span className="text-[20px] text-black text-opacity-75 font-bold font-Inter mb-1.5">
            Retype Password
          </span>
          <input
            className="h-12 p-2 rounded text-lg mb-6"
            type="text"
            onChange={(e) => setRetypePassword(e.target.value)}
            value={retypePassword}
          />
          <div className="flex justify-center items-center mb-5">
            <button
              className="text-[28px] text-black text-opacity-75 font-bold font-Inter bg-white hover:bg-white px-24 py-1.5 rounded-lg transition duration-500 hover:scale-110"
              onClick={registerUser}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

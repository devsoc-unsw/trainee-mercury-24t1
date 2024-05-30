import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlgodleData from '../other/AlgodleData.json'
import Heart from "../assets/Heart.png";

export default function Algodle() {
  //document.body.style.overflow = 'hidden';
  const randomNumber = Math.floor(Math.random() * 5);

  const [algoIndex, setAlgoIndex] = useState(randomNumber);
  const [hearts, setHearts] = useState(Array(3).fill(null));
  let currentAlgo = AlgodleData[algoIndex];

  const [userAnswer, setUserAnswer] = useState('');
  const navigate = useNavigate();
  const [displayAlgo, setDisplayAlgo] = useState(currentAlgo.CPlusPlus);

  const changeC = () => {
    setDisplayAlgo(currentAlgo.CPlusPlus);
  }

  const changeJS = () => {
    setDisplayAlgo(currentAlgo.JavaScript);
  }

  const changePY = () => {
    setDisplayAlgo(currentAlgo.Python);
  }

  const returnToHome = () => {
    navigate('/home');
  }

  const checkAnswer = () => {
    const temp = userAnswer.toLowerCase();
    if (temp === currentAlgo.Answer) {
      alert('you won!')
      // update scoreboard here
      resetGame();
    }
    else {
      if (hearts.length === 1) {
        alert("you lost! :(");
        resetGame();
      }
      else {
        setHearts(hearts.slice(0, hearts.length - 1));
      }
    }
  }

  const resetGame = () => {
    setHearts(Array(3).fill(null));
    const newRandomNumber = Math.floor(Math.random() * 5);
    setAlgoIndex(newRandomNumber);
    currentAlgo = AlgodleData[newRandomNumber];
    setDisplayAlgo(currentAlgo.CPlusPlus);
    setUserAnswer('');
  }

/*
  Back button:
      <div className='fixed top-5 left-5'>
        <button className='px-8 py-2 text-[20px] text-Blue2 font-bold font-Inter bg-Pink1 hover:bg-Pink2 transition duration-500 hover:scale-110' onClick={() => returnToHome()}>Back</button>
      </div>
*/

  return (
    <div>
      <div className='flex flex-col justify-center items-center w-full h-screen bg-Blue1'>
        <div className='flex justify-center items-center text-[30px] text-Blue2 font-bold font-Inter bg-Yellow1 px-16 py-4 mb-10'>Algodle</div>
        <div className='flex'>
          {hearts.map((heart, index) => {
            return (
              <div key={index}>
                <div>{heart}</div>
                <img className="w-12 h-12 p-1" src={Heart}></img>
              </div>
            )
          })}
        </div>
        <div className='flex w-4/5 h-3/6 bg-Green2 p-6'>
          <div className='flex w-full bg-Green1'>
            <div className='flex flex-1 p-2 text-[16px] text-Blue2 font-bold font-Inter whitespace-pre-wrap overflow-auto'>
              {displayAlgo}
            </div>
            <div className='flex flex-col flex-[0.5] justify-center items-center'>
              <div className='bg-Orange2 p-1 mb-6'>
                <button className='w-64 py-2 text-[24px] text-Blue2 font-bold font-Inter bg-Yellow1 transition duration-500 hover:bg-Orange2' onClick={() => changeC()}>C++</button>
              </div>
              <div className='bg-Orange2 p-1 mb-6'>
                <button className='w-64 py-2 text-[24px] text-Blue2 font-bold font-Inter bg-Yellow1 transition duration-500 hover:bg-Orange2' onClick={() => changeJS()}>JavaScript</button>
              </div>
              <div className='bg-Orange2 p-1'>
                <button className='w-64 py-2 text-[24px] text-Blue2 font-bold font-Inter bg-Yellow1 transition duration-500 hover:bg-Orange2' onClick={() => changePY()}>Python</button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <input className='w-64 h-16 p-2 rounded text-lg border-black border-b-2 mb-4' type='text' placeholder='Algorithm Guess' onChange={e => setUserAnswer(e.target.value)} value={userAnswer}></input>
          <button className='w-32 py-2 text-[24px] text-Blue2 font-bold font-Inter bg-Purple1 transition duration-500 hover:bg-Pink2 ml-6' onClick={() => checkAnswer()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

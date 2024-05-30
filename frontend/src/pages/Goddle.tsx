import React, { CSSProperties, useState } from "react";
import stats from "../assets/stats.png";
import info from "../assets/info.png";

//To do:
// Priority 1:Handle anser with extra white space (we don't have the lib config to use .replaceALl either add libes20221 or do it in another way),  Handle Answer Already submmited
// Priority 2: Add Score ? Add score keeping ?, Clean up css,
// blue rgba(169, 222, 249, 1)
// dark blue (texts) rgba(5, 74, 145, 1) or Blue2
// pale Purple1


const algorithmTarget = [
  ["Name", "Best Case","Worst Case","Average Case","Space Complexity","Stable","Classification"],
  ["Selection", "n^2", "n^2", "n^2", "1", "No", "Selection"],
  ["Bubble", "n", "n^2", "n^2", "1", "Yes", "Exchanging"],
  ["Insertion", "n", "n^2", "n^2", "1", "Yes", "Insertion"],
  ["Shell", "nlogn", "n^4/3", "n^3/2", "1", "No", "Insertion"],
  ["Merge", "nlogn", "nlogn", "nlogn", "n", "Yes", "Merging"],
  ["Quick", "nlogn", "nlogn", "n^2", "logn", "No", "Partitioning"],
  ["Radix", "n", "n* k/d", "n* k/d", "n + 2^d", "Yes", "Non-comparison"],
];

const languageTarget = [
  ["Name", "Best Case","Worst Case","Average Case","Space Complexity","Stable","Classification"],
  ["Selection", "n^2", "n^2", "n^2", "1", "No", "Selection"],
  ["Bubble", "n", "n^2", "n^2", "1", "Yes", "Exchanging"],
  ["Insertion", "n", "n^2", "n^2", "1", "Yes", "Insertion"],
  ["Shell", "nlogn", "n^4/3", "n^3/2", "1", "No", "Insertion"],
  ["Merge", "nlogn", "nlogn", "nlogn", "n", "Yes", "Merging"],
  ["Quick", "nlogn", "nlogn", "n^2", "logn", "No", "Partitioning"],
  ["Radix", "n", "n* k/d", "n* k/d", "n + 2^d", "Yes", "Non-comparison"],
];



const titleStyle = "w-1/2 bg-Purple1 mx-auto mt-10 rounded-md font-sans text-lg text-center shadow-md py-4 flex justify-between items-center";
const overlayContainerStyle = "fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10";
const overlayStyle = "w-1/2 bg-Purple1 mx-auto mt-10 rounded-md font-sans text-lg shadow-md py-4 flex flex-col";
const formStyle = "w-1/3 bg-Purple1 rounded-md font-sans text-lg text-center flex items-center mx-auto mt-10 justify-center";
const inputStyle = "bg-Purple1 p-1 w-full placeholder-Blue2 placeholder-opacity-60";
const arrowStyle: CSSProperties = {
  border: "solid rgba(5, 74, 145, 1)",
  borderWidth: "0 3px 3px 0",
  padding: "5px",
  margin: "15px",

  transform: "rotate(-45deg)",
};


export default function Goddle() {
  const initialTargets =  {"Algorithm": algorithmTarget, "Programming Language": languageTarget };
  const [targetName, setTargetName] = useState("Algorithm");
  const [targetSets, setTargetSets] = useState(initialTargets);
  const [targets, setTarget] = useState(algorithmTarget);

  document.body.className = "bg-Blue1"


  const handleDropdownChange = (event: { target: { value: string; }; }) => {
    const selectedTargetName = event.target.value;
    setTargetName(selectedTargetName);
    setTarget(targetSets[selectedTargetName as keyof typeof targetSets]); 
  };

  return (
    <div className="text-Blue2">
      {/* <div style={{ padding: "10px 10px" }}>
        <a href="/Home">Home </a>
        <a style={{ color: "rgba(228, 193, 249, 1)" }} href="/Goddle">
          Goddle{" "}
        </a>
        <a href="/Algodle">Algodle </a>
        <a href="/broken-telephone">BrokenTelephone </a>
      </div> */}
      <div className={titleStyle}> 
        <div >
        {Score()} 

        </div>
        <p className="text-2xl">Guess The {targetName}</p>
        <div>
        {Information(targets)} 
        </div>
      </div>
      <div>
      <select onChange={handleDropdownChange} value={targetName}>
          {Object.keys(initialTargets).map((target) => (
            <option key={target} value={target}>{target}</option>
          ))}
        </select>
      </div>
      <h2>{Game(targets)}</h2>

    </div>
  );
}

function Game(targets: string[][]) {
  
  const number = getRandomNumber(0, targets.length);
  const [target, setTarget] = useState(targets[number]);
  const [value, setValue] = useState("");
  const [submittedAnswers, setSubmitedAnswers] = useState<
    {
      answer: string;
      correctness: "correct" | "somewhat_correct" | "incorrect";
    }[][]
  >([]);
  const [won, setWon] = useState<boolean>(false);
  const [numberOfAttempts, setnumberOfAttempts] = useState<number>(0);
  const [startingTime, setStartingTime] = useState<number>(0);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // !! Rarely chooses and invalid targed somehow :( need to fix)
   // alert(target);
    // I make a local variable because SetState takes a bit to update the variable, when adding score it hasnt updated yet and pass the outdated value same for time
    let numAttempts = numberOfAttempts;
    let start = startingTime;
    if (won) {
      const number = getRandomNumber(0, targets.length);
      setTarget(targets[number]);
      setSubmitedAnswers([]);
      setValue("");
      setWon(false);
      setnumberOfAttempts(0);
      setStartingTime(new Date().getTime());
      event.preventDefault();
      return;
    }
    let answer = null;
    for (let i = 0; i < targets.length; i++) {
      if (value.toLocaleLowerCase() == targets[i][0].toLocaleLowerCase()) {
        answer = targets[i];
      }
    }
    if (answer == null) {
      alert("Invalid Answer");
      event.preventDefault();
      return;
    } else {
      numAttempts += 1;
    }
    //Starting time of first guess
    if (numAttempts == 1) {
      start = new Date().getTime()
      setStartingTime(start);
    }
    if (answer[0] === target[0]) {
      setWon(true);
      alert("Congrats you found the answer!");
      AddtoScore((new Date().getTime() - start), numAttempts);
    }

    const submit: {
      answer: string;
      correctness: "correct" | "somewhat_correct" | "incorrect";
    }[] = [];

    for (let i = 0; i < target.length; i++) {
      const submitItem: {
        answer: string;
        correctness: "correct" | "somewhat_correct" | "incorrect";
      } = { answer: "", correctness: "incorrect" };
      submitItem.answer = answer[i];
      if (answer[i] === target[i]) {
        submitItem.correctness = "correct";
      } else if (target[i].includes(answer[i])) {
        submitItem.correctness = "somewhat_correct";
      }
      submit.push(submitItem);
    }

    setSubmitedAnswers((answers) => [...answers, submit]);
    setValue("");
    setnumberOfAttempts(numAttempts);


    event.preventDefault();
  };

  return (
    <div>
      <div className = "relative text-center">
        <form onSubmit={handleSubmit} className={formStyle}>
          {!won && (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Type your algorithm here"
              className={inputStyle}
            />
          )}
          {!won ? (
            <button type="submit" style={arrowStyle} className="click"></button>
          ) : (
            //Using a submit button instead of reset button so User stays on the same goddle type (other types not implemented yet)
            <button type="submit" className="hover:opacity-40 justify-center p-1">
              Restart
            </button>
          )}
        </form>
      </div>
      <div
      className="justify-evenly ml-100 mr-100 mt-15"
      >
        <table className="w-full gap-y-100 mt-10">
          <thead>
            <tr>
            {targets[0].map((name) => (
              <th>{name}</th>
       
            ))}
            </tr>
          </thead>
          <tbody>
            {submittedAnswers.map((submit, index) => (
              <tr key={index}>
                {submit.map(({ answer, correctness }, i) => (
                  <td
                    key={i}
                    style={{
                      backgroundColor: getColorForCorrectness(correctness),
                      textAlign: "center",
                      padding: "8px",
                      borderWidth: "8px",
                      borderColor: "rgba(169, 222, 249, 1)",
                      boxShadow:
                        i === 0
                          ? "inset 0 0 0 1px  rgba(5, 74, 145, 1)"
                          : "none", // If first element of row add blue 'second border' (inset)
                    }}
                  >
                    {answer}{" "}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getColorForCorrectness(
  correctness: "correct" | "somewhat_correct" | "incorrect",
): string {
  switch (correctness) {
    case "correct":
      return "rgba(187, 252, 225, 1)";
    case "somewhat_correct":
      return "rgba(252, 246, 189, 1)";
    case "incorrect":
      return "rgba(255, 164, 113, 1)";
    default:
      return "rgba(252, 246, 189, 1)";
  }
}

function getRandomNumber(n: number, m: number) {
  const random = Math.random();

  // Scale and shift the random number to fit within the range [n, m]
  const randomNumber = Math.floor(n + random * (m - n + 1));

  // Return the generated random number
  return randomNumber;
}

function Score() {
  let topAttempt = "0"
  let topTime = "0"
  let gamesPlayed = "0"

  let topAttemptAdress = "topAttempt" + "=";
  let topTimeAdress = "topTimeAdresst" + "=";
  let gamesPlayedAdress = "gamesPlayed" + "=";

  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  const [scoreVisible, setVisibility] = useState(false);


  //This does work but it slow Need to figure out why We could just delete all cookies which would be faster but if we expand for new games it could get messy
  const clearStats = () => {
    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = topAttemptAdress + 0 + ";" + expires + ";path=/";
    document.cookie = topTimeAdress + 0 + ";" + expires + ";path=/";
    document.cookie = gamesPlayedAdress + 0 + ";" + expires + ";path=/";
  }
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(topAttemptAdress) == 0) {
      topAttempt = c.substring(topAttemptAdress.length, c.length);
    } 

    if (c.indexOf(topTimeAdress) == 0) {
      topTime = c.substring(topTimeAdress.length, c.length);
    }

    if (c.indexOf(gamesPlayedAdress) == 0) {
      gamesPlayed = c.substring(gamesPlayedAdress.length, c.length);
    }
  }

  const toggleScore = (event: { preventDefault: () => void; }) => {
    if (scoreVisible == false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    event.preventDefault(); // Prevent the default form submission behavior

   
  }

  return (
    <>
      <div className= "overflow-hidden">
        <button onClick={toggleScore} className="hover:opacity-40">
          <img
            style={{
              background: "transparent",
              width: "30px",
              height: "30px",
              filter: "drop-shadow(0px 100px 0 rgba(5, 74, 145, 1))",
              transform: "translateY(-100px)",
              marginLeft: "10px"
            }}
            src={stats}
            alt="Statistics"
          />
        </button>
      </div>
      <div
        aria-expanded={scoreVisible}
        className={` ${scoreVisible ? 'visible' : 'hidden'} ${overlayContainerStyle}`}
      >

        <div className={overlayStyle}>
          <div className="justify-between float-right">
          <button onClick={toggleScore} className="hover:opacity-40 float-right mr-5">Close</button>
          <button className="hover:opacity-40 float-left ml-5" onClick={clearStats}>Clear</button>

          <h1 className="ml-10 mr-10 mb-10 text-4xl border-b-2 border-solid border-Blue2">Your Statistics</h1>
          </div>
  
          <div className="justify-around flex mt-15">
            <div className="justfiy-center">
                <div>
                Top Attempt
                </div>
                <div>
                {topAttempt}
                </div>
              </div>
              <div className="justfiy-center">
                <div>
                Top Time
                </div>
                <div>
                {topTime}
                </div>
              </div>
              <div className="justfiy-center">
                <div>
                Games Played
                </div>
                <div>
                {gamesPlayed}
                </div>
              </div>
          </div>



        </div>
      </div>
    </>
  );
}

function AddtoScore (time: number,NumberOfAttempts: number) {

  const d = new Date();
  d.setTime(d.getTime() + (7*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  let topAttemptAdress = "topAttempt" + "=";
  let topTimeAdress = "topTimeAdresst" + "=";
  let gamesPlayedAdress = "gamesPlayed" + "=";

  let previousGameExist = false;
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(topAttemptAdress) == 0) {
      previousGameExist = true;
      if (Number(c.substring(topAttemptAdress.length, c.length)) > NumberOfAttempts || Number(c.substring(topAttemptAdress.length, c.length)) == 0) {
        document.cookie = topAttemptAdress + NumberOfAttempts + ";" + expires + ";path=/";
      }
    }

    if (c.indexOf(topTimeAdress) == 0) {
      if (Number(c.substring(topTimeAdress.length, c.length)) > time || Number(c.substring(topTimeAdress.length, c.length)) == 0) {
        document.cookie = topTimeAdress + time + ";" + expires + ";path=/";
      }
    }

    if (c.indexOf(gamesPlayedAdress) == 0) {
      previousGameExist = true;
      document.cookie = gamesPlayedAdress + (Number(c.substring(gamesPlayedAdress.length, c.length)) + 1) + ";" + expires + ";path=/";
    }
    

  }
  if (!previousGameExist) {
    document.cookie = topAttemptAdress + NumberOfAttempts + ";" + expires + ";path=/";
    document.cookie = topTimeAdress + time + ";" + expires + ";path=/";
    document.cookie = gamesPlayedAdress + 1 + ";" + expires + ";path=/";
  }
}

function Information(targets: string[][]) {
  const [informationVisible, setVisibility] = useState(false);
  const firstElements = targets.map(subArray => subArray[0]);
  const toggleScore = (event: { preventDefault: () => void; }) => {
    if (informationVisible == false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    event.preventDefault(); // Prevent the default form submission behavior

   
  }

  return (
    <>
      <div className= "overflow-hidden">
        <button onClick={toggleScore}className="hover:opacity-40">
          <img
            style={{
              background: "transparent",
              width: "30px",
              height: "30px",
              filter: "drop-shadow(0px 100px 0 rgba(5, 74, 145, 1))",
              transform: "translateY(-100px)",
              marginRight: "5px"
            }}
            src={info}
            alt="Info"
          />
        </button>
      </div>
      <div
        aria-expanded={informationVisible}
        className={` ${informationVisible ? 'visible' : 'hidden'} ${overlayContainerStyle}`}

      >
        <div className={overlayStyle}>
  <div className="flex justify-end mr-2">
    <button onClick={toggleScore} className="hover:opacity-40" >Close</button>
  </div>
  <h1 className="mb-2 text-4xl font-bold border-b-2 border-Blue2 pb-2">How to play:</h1>
  <h2 className="mb-4">Take a guess from the following list, correct characteristics will show up green and incorrect ones red. Use your knowledge to find the right answer!</h2>
  <ul className="list-disc ml-8 text-start">
    {firstElements.map((element, index) => (
      <li key={index}>{element}</li>
    ))}
  </ul>
</div>

      </div>
    </>
  );
}


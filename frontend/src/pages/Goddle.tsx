import React, { CSSProperties, useState } from "react";
import stats from "../assets/stats.png";
import info from "../assets/info.png";

//To do:
// Priority 1:Handle anser with extra white space (we don't have the lib config to use .replaceALl either add libes20221 or do it in another way),  Handle Answer Already submmited
// Priority 2: Add Score ? Add score keeping ?, Clean up css,
// blue rgba(169, 222, 249, 1)
// dark blue (texts) rgba(5, 74, 145, 1)

const titleStyle: CSSProperties = {
  width: "50%",
  background: "rgba(228, 193, 249, 1)",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "10px",
  borderRadius: "4px",
  fontFamily: "sans-serif",
  fontSize: "1.5rem",
  textAlign: "center",
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const targets = [
  ["Selection", "n^2", "n^2", "n^2", "1", "No", "Selection"],
  ["Bubble", "n", "n^2", "n^2", "1", "Yes", "Exchanging"],
  ["Insertion", "n", "n^2", "n^2", "1", "Yes", "Insertion"],
  ["Shell", "nlogn", "n^4/3", "n^3/2", "1", "No", "Insertion"],
  ["Merge", "nlogn", "nlogn", "nlogn", "n", "Yes", "Merging"],
  ["Quick", "nlogn", "nlogn", "n^2", "logn", "No", "Partitioning"],
  ["Radix", "n", "n* k/d", "n* k/d", "n + 2^d", "Yes", "Non-comparison"],
];


const overlayContainerStyle: CSSProperties = {
  position: "fixed",
  top:" 0",
  left:" 0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  zIndex: "1",

};

const overlayStyle: CSSProperties = {
  width: "50%",
  background: "rgba(228, 193, 249, 1)",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "10px",
  borderRadius: "4px",
  fontFamily: "sans-serif",
  fontSize: "1.5rem",
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
};

const formStyle: CSSProperties = {
  width: "35%",
  background: "rgba(228, 193, 249, 1)",
  borderRadius: "4px",
  fontFamily: "sans-serif",
  fontSize: "1.5rem",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "10px",
  justifyContent: "center",
};

const inputStyle: CSSProperties = {
  background: "rgba(228, 193, 249, 1)",
  padding: "1px",
  width: "100%",
};

const arrowStyle: CSSProperties = {
  border: "solid rgba(5, 74, 145, 1)",
  borderWidth: "0 3px 3px 0",
  padding: "5px",
  margin: "15px",

  transform: "rotate(-45deg)",
};


export default function Goddle() {
  
  document.body.style.background = "rgba(169, 222, 249, 1)";
  return (
    <div style={{ color: "rgba(5, 74, 145, 1)" }}>
      {/* <div style={{ padding: "10px 10px" }}>
        <a href="/Home">Home </a>
        <a style={{ color: "rgba(228, 193, 249, 1)" }} href="/Goddle">
          Goddle{" "}
        </a>
        <a href="/Algodle">Algodle </a>
        <a href="/broken-telephone">BrokenTelephone </a>
      </div> */}
      <div style={titleStyle}> 
      <div style={{justifySelf:"left"}}>
      {Score()} 

      </div>
      <p >Guess The Sorting Algorithm</p>
      <div>
      {Information()} 

      </div>
      
      </div>
      <h2>{Game()}</h2>

    </div>
  );
}

function Game() {
  
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
      <div style={{ textAlign: "center", position: "relative" }}>
        <form onSubmit={handleSubmit} style={formStyle}>
          {!won && (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Type your algorithm here"
              style={inputStyle}
            />
          )}
          {!won ? (
            <button type="submit" style={arrowStyle} className="click" ></button>
          ) : (
            //Using a submit button instead of reset button so User stays on the same goddle type (other types not implemented yet)
            <button type="submit" style={{ justifySelf: "center" }} className="click">
              Restart
            </button>
          )}
        </form>
      </div>
      <div
        style={{
          justifyContent: "space-evenly",
          marginLeft: "100px",
          marginRight: "100px",
          marginTop: "15px",
        }}
      >
        <table style={{ width: "100%", rowGap: "100px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Best Case</th>
              <th>Worst Case</th>
              <th>Average Case</th>
              <th>Space Complexity</th>
              <th>Stable</th>
              <th>Classification</th>
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
      <div style={{ overflow: "hidden" }}>
        <button onClick={toggleScore} className="click">
          <img
            style={{
              background: "transparent",
              width: "20px",
              height: "20px",
              filter: "drop-shadow(0px 100px 0 rgba(5, 74, 145, 1))",
              transform: "translateY(-100px)",
            }}
            src={stats}
            alt="Statistics"
          />
        </button>
      </div>
      <div
        aria-expanded={scoreVisible}
        style={{
          ...overlayContainerStyle,
          visibility: scoreVisible ? "visible" : "hidden",
        }}
      >

        <div style={overlayStyle}>
          <div style={{ float: "right", justifyContent: "space-between" }}>
          <button onClick={toggleScore} style={{ float: "right", justifySelf: "left" }} className="click">Close</button>
          <button style={{ float: "left"}} onClick={clearStats} className="click">Clear</button>

          <h1 style={{ marginBottom: "5px", marginTop: "5px", fontSize: "35px", borderBottom: "2px Solid " }}>Your Statistics</h1>
          </div>
  
          <div style={{ justifyContent: "space-around" , display:"flex", marginTop:"15px"}}>
            <div style={{ justifyContent: "center" }}>
                <div>
                Top Attempt
                </div>
                <div>
                {topAttempt}
                </div>
              </div>
              <div style={{ justifyContent: "center" }}>
                <div>
                Top Time
                </div>
                <div>
                {topTime}
                </div>
              </div>
              <div style={{ justifyContent: "center" }}>
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

function Information() {
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
      <div style={{ overflow: "hidden" }}>
        <button onClick={toggleScore} className="click">
          <img
            style={{
              background: "transparent",
              width: "20px",
              height: "20px",
              filter: "drop-shadow(0px 100px 0 rgba(5, 74, 145, 1))",
              transform: "translateY(-100px)",
            }}
            src={info}
            alt="Info"
          />
        </button>
      </div>
      <div
        aria-expanded={informationVisible}
        style={{
          ...overlayContainerStyle,
          visibility: informationVisible ? "visible" : "hidden",
        }}
      >
        <div style={overlayStyle}>
          <div>
          <button onClick={toggleScore} style={{ float: "right" }} className="click">Close</button>

          </div>
          <h1 style={{ marginBottom: "5px", fontSize: "35px", borderBottom: "2px Solid " }}>How to play:</h1>
          <h2> Take a guess from the following list, correct characteristics will show up green and incorrect ones red. 
            Use your knowledge to find the right answer !</h2>
          <ul style={{textAlign: "left", listStyleType: "disc", marginLeft: "15px"}} className="a">
            {firstElements.map((element, index) => (
              <li  key={index}>{element}</li>
            ))}
          </ul>
          


        </div>
      </div>
    </>
  );
}
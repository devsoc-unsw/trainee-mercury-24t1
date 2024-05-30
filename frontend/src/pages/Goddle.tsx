import React, { CSSProperties, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AnimatePresence } from "framer-motion";

//To do:
// Priority 1:Handle anser with extra white space (we don't have the lib config to use .replaceALl either add libes20221 or do it in another way),  Handle Answer Already submmited
// Priority 2: Add Score ? Add score keeping ?, Clean up css,
// blue rgba(169, 222, 249, 1)
// dark blue (texts) rgba(5, 74, 145, 1) or Blue2
// pale Purple1


const algorithmTarget = [
  ["Name", "Best Case", "Worst Case", "Average Case", "Space Complexity", "Stable", "Classification"],
  ["Selection", "n^2", "n^2", "n^2", "1", "No", "Selection"],
  ["Bubble", "n", "n^2", "n^2", "1", "Yes", "Exchanging"],
  ["Insertion", "n", "n^2", "n^2", "1", "Yes", "Insertion"],
  ["Shell", "nlogn", "n^4/3", "n^3/2", "1", "No", "Insertion"],
  ["Merge", "nlogn", "nlogn", "nlogn", "n", "Yes", "Merging"],
  ["Quick", "nlogn", "nlogn", "n^2", "logn", "No", "Partitioning"],
  ["Radix", "n", "n* k/d", "n* k/d", "n + 2^d", "Yes", "Non-comparison"],
];

const languageTarget = [
  ["Name", "Best Case", "Worst Case", "Average Case", "Space Complexity", "Stable", "Classification"],
  ["Selection", "n^2", "n^2", "n^2", "1", "No", "Selection"],
  ["Bubble", "n", "n^2", "n^2", "1", "Yes", "Exchanging"],
  ["Insertion", "n", "n^2", "n^2", "1", "Yes", "Insertion"],
  ["Shell", "nlogn", "n^4/3", "n^3/2", "1", "No", "Insertion"],
  ["Merge", "nlogn", "nlogn", "nlogn", "n", "Yes", "Merging"],
  ["Quick", "nlogn", "nlogn", "n^2", "logn", "No", "Partitioning"],
  ["Radix", "n", "n* k/d", "n* k/d", "n + 2^d", "Yes", "Non-comparison"],
];



const titleStyle = "w-1/2 bg-Purple1 mx-auto mt-10 rounded-md font-sans text-lg text-center shadow-md py-4 flex justify-around items-center";
const overlayContainerStyle = "fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10";
const overlayStyle = "w-1/2 bg-Yellow1 mx-auto mt-10 rounded-md font-sans text-lg shadow-md py-4 flex flex-col ";
const overlayStyleForm = "w-auto bg-Purple1 mx-auto mt-10 rounded-md font-sans text-lg shadow-md py-4 flex flex-col ";
const changeGameStyle = "w-1/5 bg-Yellow1 rounded-md font-sans text-lg text-center flex mx-auto mt-2  items-center";
const gameStyle = "w-1/3 bg-Purple1 rounded-md font-sans text-lg text-center flex items-center mx-auto mt-3 justify-center";
const inputStyle = "bg-Purple1 p-1 w-full placeholder-Blue2 placeholder-opacity-60";
const arrowStyle: CSSProperties = {
  border: "solid rgba(5, 74, 145, 1)",
  borderWidth: "0 3px 3px 0",
  padding: "5px",
  margin: "15px",

  transform: "rotate(-45deg)",
};


export default function Goddle() {

  document.body.className = "bg-Blue1"
  var initialTargets = {};
  initialTargets = { "Algorithm": algorithmTarget, "Programming Language": languageTarget };
  const [targetName, setTargetName] = useState("Algorithm");
  const [targetSets, setTargetSets] = useState(initialTargets);
  const [targets, setTarget] = useState(algorithmTarget);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleDropdownChange = (event: { target: { value: string; }; }) => {
    const selectedTargetName = event.target.value;
    setTargetName(selectedTargetName);
    setTarget(targetSets[selectedTargetName as keyof typeof targetSets]);
  };

  const addNewTarget = (newTarget: FormData) => {

    setTargetSets((prevTargetSets) => ({
      ...prevTargetSets,
      ...newTarget
    }));
  };

  return (
    <div className="text-Blue2">
      <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
      <div className={titleStyle}>
        <div >
          {Score()}

        </div>
        <p className="text-2xl">Guess The {targetName}</p>
        <div>
          {Information(targets)}
        </div>
      </div>
      <div className={changeGameStyle}>
        <div className="flex items-center justify-center self-center">
          <select onChange={handleDropdownChange} value={targetName} className="bg-Yellow1">
            {Object.keys(targetSets).map((target) => (
              <option key={target} value={target}>{target}</option>
            ))}
          </select>
        </div>
        <div className="ml-auto">
          <NewTargetForm onFormSubmit={addNewTarget} />
        </div>
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


  useEffect(() => {
    const number = getRandomNumber(0, targets.length);
    setTarget(targets[number]);
    setSubmitedAnswers([]);
    setValue("");
    setWon(false);
    setnumberOfAttempts(0);
    setStartingTime(new Date().getTime());
  }, [targets]);
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
    for (let i = 1; i < targets.length; i++) {
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
      <div className="relative text-center">
        <form onSubmit={handleSubmit} className={gameStyle}>
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
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = topAttemptAdress + 0 + ";" + expires + ";path=/";
    document.cookie = topTimeAdress + 0 + ";" + expires + ";path=/";
    document.cookie = gamesPlayedAdress + 0 + ";" + expires + ";path=/";
  }
  for (let i = 0; i < ca.length; i++) {
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
      <div className="overflow-hidden">
        <button onClick={toggleScore} className="hover:opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          </svg>


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

function AddtoScore(time: number, NumberOfAttempts: number) {

  const d = new Date();
  d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  let topAttemptAdress = "topAttempt" + "=";
  let topTimeAdress = "topTimeAdresst" + "=";
  let gamesPlayedAdress = "gamesPlayed" + "=";

  let previousGameExist = false;
  for (let i = 0; i < ca.length; i++) {
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
  const toggleInformation = (event: { preventDefault: () => void; }) => {
    if (informationVisible == false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    event.preventDefault();
  }

  return (
    <>
      <div className="overflow-hidden">
        <button onClick={toggleInformation} className="hover:opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>

        </button>
      </div>
      <div
        aria-expanded={informationVisible}
        className={` ${informationVisible ? 'visible' : 'hidden'} ${overlayContainerStyle}`}

      >
        <div className={overlayStyle}>
          <div className="flex justify-end mr-2">
            <button onClick={toggleInformation} className="hover:opacity-40" >Close</button>
          </div>
          <h1 className="mb-2 text-4xl font-bold border-b-2 border-Blue2 pb-2">How to play:</h1>
          <h2 className="mb-4">Take a guess from the following list, correct characteristics will show up green and incorrect ones red. Use your knowledge to find the right answer!</h2>
          <ul className="list-disc ml-8 text-start">
            {firstElements.map((element, index) => (
              <li key={index} className={index === 0 ? 'hidden' : ''}>{element}</li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}
type FormData = {
  [category: string]: any; // Change `any` to the type of your targets if possible
};

type OnFormSubmitType = (formData: FormData) => void;
interface NewTargetFormProps {
  onFormSubmit: OnFormSubmitType;
}



function NewTargetForm({ onFormSubmit }: NewTargetFormProps) {
  const [newTargetFormVisible, setVisibility] = useState(false);


  const toggleNewTargetForm = (event: { preventDefault: () => void; }) => {
    if (newTargetFormVisible == false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    event.preventDefault(); // Prevent the default form submission behavior
  }

  const [formTitle, setFormTitle] = useState("Your Title");
  const [formRows, setFormRows] = useState<string[][]>([["Name", "Characteristic 1", "Characteristic 2", "Characteristic 3"],
  ["", "", "", ""]]);

  const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setFormTitle(event.target.value);
  };

  const handleAddRow = () => {
    setFormRows([...formRows, Array(formRows[0].length).fill("")]);
  };


  const handleDeleteRow = (rowIndex: number) => {
    if (formRows.length > 1) {
      setFormRows(formRows.filter((_, index) => index !== rowIndex));
    }
    setFormRows([Array(formRows[0].length).fill("")]);
  };

  const handleAddColumn = () => {
    setFormRows(formRows.map(row => [...row, ""]));
  };

  const handleDeleteColumn = (columnIndex: number) => {
    if (formRows[0].length > 1) {
      const updatedRows = formRows.map(row => row.filter((_, index) => index !== columnIndex));
      setFormRows(updatedRows);
    } else {
      const updatedRows = formRows.map(row => row.map((cell, index) => index === columnIndex ? "" : cell));
      setFormRows(updatedRows);
    }

  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => {
    const updatedRows = [...formRows];
    updatedRows[rowIndex][columnIndex] = event.target.value;
    setFormRows(updatedRows);
  };
  //@todo after we have managed to save them long term we need to look into avoiding reapating titles ?
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (formTitle === '') {
      alert("Your set needs a title");
      return;
    } else if (formRows.some(row => row.some(cell => cell.trim() === ''))) {
      alert("Please fill the whole set");
      return;
    }
    const formData = {
      [formTitle]: formRows
    };

    setFormTitle("Your Title");
    setFormRows([["Name", "Characteristic 1", "Characteristic 2", "Characteristic 3"]]);
    setVisibility(false);
    onFormSubmit(formData);
  };

  return (
    <>
      <div className="overflow-hidden ">
        <button onClick={toggleNewTargetForm} className="hover:opacity-40 float-right">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 float-right">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

        </button>
      </div>
      <div
        aria-expanded={newTargetFormVisible}
        className={` ${newTargetFormVisible ? 'visible' : 'hidden'} ${overlayContainerStyle}`}
      >

        <div className={overlayStyleForm}>
          <div className="justify-between float-right">
            <button onClick={toggleNewTargetForm} className="hover:opacity-40 float-right mr-5">Close</button>

          </div>
          <input type="text" placeholder="Title" value={formTitle} onChange={handleTitleChange} className="bg-Yellow1 border-rounded-lg text-center justify-center border-8 border-Purple1" />

          <form onSubmit={handleSubmit} >


            <table className="text-xs">
              <tbody>
                {formRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <td key={columnIndex}>
                        <div>
                          <input
                            type="text"
                            value={cell}
                            onChange={(event) => handleInputChange(event, rowIndex, columnIndex)}
                            className="bg-Yellow1 border-rounded-lg  border-4 border-Purple1"
                          />
                        </div>

                        <button type="button" className={rowIndex !== formRows.length - 1 ? 'hidden' : ''} onClick={() => handleDeleteColumn(columnIndex)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>                        </button>
                      </td>
                    ))}
                    <button type="button" onClick={() => handleDeleteRow(rowIndex)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>

                  </tr>
                ))}
              </tbody>
            </table>
            <div className="justify-evenly flex">
              <button type="button" onClick={handleAddRow}>Add Row</button>
              <button type="button" onClick={handleAddColumn}>Add Column</button>
              <button type="submit">Submit</button>
            </div>


          </form>

        </div>
      </div>
    </>
  );
}


import React, { CSSProperties, useState } from "react";

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
      <div style={{ padding: "10px 10px" }}>
        <a href="/Home">Home </a>
        <a style={{ color: "rgba(228, 193, 249, 1)" }} href="/Goddle">
          Goddle{" "}
        </a>
        <a href="/Algodle">Algodle </a>
        <a href="/broken-telephone">BrokenTelephone </a>
      </div>
      <p style={titleStyle}>Guess Algorithm</p>
      <h2>{Game()}</h2>
    </div>
  );
}

function Game() {
  const targets = [
    ["Selection", "n^2", "n^2", "n^2", "1", "No", "Selection"],
    ["Bubble", "n", "n^2", "n^2", "1", "Yes", "Exchanging"],
    ["Insertion", "n", "n^2", "n^2", "1", "Yes", "Insertion"],
    ["Shell", "nlogn", "n^4/3", "n^3/2", "1", "No", "Insertion"],
    ["Merge", "nlogn", "nlogn", "nlogn", "n", "Yes", "Merging"],
    ["Quick", "nlogn", "nlogn", "n^2", "logn", "No", "Partitioning"],
    ["Radix", "n", "n* k/d", "n* k/d", "n + 2^d", "Yes", "Non-comparison"],
  ];
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert(target);
    if (won) {
      const number = getRandomNumber(0, targets.length);
      setTarget(targets[number]);
      setSubmitedAnswers([]);
      setValue("");
      setWon(false);
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
      alert("answer invalid");
      event.preventDefault();
      return;
    } else if (answer[0] === target[0]) {
      setWon(true);
      alert("answer Found");
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

    alert("An answer was submitted: " + value + won);
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
            <button type="submit" style={arrowStyle}></button>
          ) : (
            //Using a submit button instead of reset button so User stays on the same goddle type (other types not implemented yet)
            <button type="submit" style={{ justifySelf: "center" }}>
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

import React, { createElement, CSSProperties } from "react";

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
  justifyContent: "space-between"
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

// blue rgba(169, 222, 249, 1)
// dark blue (texts) rgba(5, 74, 145, 1)
export default function Goddle() {
  
  document.body.style.background = "rgba(169, 222, 249, 1)";
  return (
    <div style={{color: "rgba(5, 74, 145, 1)"}} > 
      <div style={{padding:"10px 10px"}}>
        <a href="/Home">Home </a>
        <a style={{color: "rgba(228, 193, 249, 1)"}} href="/Goddle">Goddle </a>
        <a href="/Algodle">Algodle </a>
        <a href="/BrokenTelephone">BrokenTelephone </a>
      </div>
      <p style = {titleStyle}>
      Guess Algorithm 
      </p>
      <Game> </Game>
    </div>
  )
}
interface GameState {
  value: string;
  submittedAnswers: { answer: string; correctness: "correct" | "somewhat_correct" | "incorrect" }[][];

}

class Game extends React.Component<{}, GameState> {
  targets = [
    ["Selection", "n^2",  "n^2",  "n^2", "1", "No","Selection"],
    ["Bubble", "n",  "n^2",  "n^2", "1", "Yes", "Exchanging"],
    ["Insertion", "n",  "n^2",  "n^2", "1", "Yes", "Insertion"],
    ["Shell ", "nlogn",  "n^4/3",  "n^3/2", "1", "No", "Insertion"],
    ["Merge", "nlogn",  "nlogn",  "nlogn", "n", "Yes", "Merging"],
    ["Quick", "nlogn",  "nlogn",  "n^2", "logn", "No", "Partitioning"],
    ["Radix", "n",  "n* k/d",  "n* k/d", "n + 2^d", "Yes", "Non-comparison"]];
  target = ["", "",  "",  "", "", "",""];
  kind = "sort"

  constructor(props: {}) {
    super(props);
    const number = getRandomNumber(0, this.targets.length);
    this.target = this.targets[number];
    

    this.state = {
      value: '',
      submittedAnswers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
  }
//To do:  Handle Answer Already submmited ?
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert(this.target);

    const { value } = this.state;
    let answer = null;
    for (let i = 0; i < this.targets.length; i++) {
      
      if (value.toLocaleLowerCase() == this.targets[i][0].toLocaleLowerCase()){
        answer = this.targets[i];
      };
    }
    if (answer == null) {
      alert('answer invalid');
      event.preventDefault();
      return;
    } else if (answer[0] === this.target[0]) {
      alert("answer Found")
    }


    let correctness: "correct" | "somewhat_correct" | "incorrect" = "incorrect";
    let submit:{ answer: string; correctness: "correct" | "somewhat_correct" | "incorrect" }[] = [];

    for (let i = 0; i < this.target.length; i++) {
      let submitItem:{ answer: string; correctness: "correct" | "somewhat_correct" | "incorrect" } = { answer: '', correctness: 'incorrect' };
      submitItem.answer = answer[i];
      if (answer[i] === this.target[i]){
        submitItem.correctness = "correct";
      } else if (this.target[i].includes(answer[i])) {
        submitItem.correctness = "somewhat_correct";
      } 
      submit.push(submitItem); 
    }


    const message = `Answer: ${value}, Correctness: ${correctness}`;
    
    this.setState((prevState) => ({
      submittedAnswers: [...prevState.submittedAnswers, submit],
      value: ''
    }));
    alert('An answr name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const { value, submittedAnswers } = this.state;
    return (
      <div >
        <div style={{ textAlign: 'center' , position: "relative"}}>
        <form onSubmit={this.handleSubmit} style = {formStyle}>
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Type your algorithm here" style={inputStyle} />
            <button type="submit" style={arrowStyle}></button>
        </form>
        </div>
        <div style={{ justifyContent: "space-evenly" , marginLeft:"100px", marginRight:"100px", marginTop:"15px"}}>
        <table style={{ width: "100%", rowGap:"100px" }}>
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
            <td key={i} style={{
              backgroundColor: getColorForCorrectness(correctness), 
              textAlign: "center", 
              padding: "8px",
              borderWidth: "8px", 
              borderColor: "rgba(169, 222, 249, 1)", 
              boxShadow: i === 0 ? "inset 0 0 0 1px  rgba(5, 74, 145, 1)" : "none" // If first element of row add blue 'second border' (inset)

  }}>{answer} </td>
          ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      

    );
  }
}

function getColorForCorrectness(correctness: "correct" | "somewhat_correct" | "incorrect"): string {
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

function getRandomNumber(n: number,  m: number) {
  var random = Math.random();
  
  // Scale and shift the random number to fit within the range [n, m]
  var randomNumber = Math.floor(n + random * (m - n + 1));
  
  // Return the generated random number
  return randomNumber;
}








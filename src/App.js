import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [weight, setWeight] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState();
  const [metre, setMetre] = useState("cm");

  const [total, setTotal] = useState([]);

  useEffect(() => {
    const savedBMIs = JSON.parse(localStorage.getItem("BMI") || "[]");
    setTotal(savedBMIs);
  }, []);

  const saveBmis = (totalbmi) => {
    localStorage.setItem("BMI", JSON.stringify(totalbmi));
  };

  const calculateBmi = () => {
    if (!weight || !height || !name || !age) {
      alert("please fill the input field");
    } else {
      let mass =
        metre === "cm"
          ? Math.round(10000 * (weight / height ** 2))
          : Math.round(weight / height ** 2);
      let msg = " ";
      if (mass < 19) {
        msg = "under weight";
      } else if (mass >= 19 && mass <= 25) {
        msg = "Normal weight";
      } else if (mass >= 26 && mass <= 30) {
        msg = "Over weight";
      } else {
        msg = "Obesity";
      }
      const bmi = `${name} ${age} BMI:${mass} ${msg} `;
      const updatedBMis = [...total, bmi];
      setTotal(updatedBMis);
      saveBmis(updatedBMis);

      setHeight("");
      setWeight("");
      setAge("");
      setName("");
    }
  };
  const deleteBmi = (index) => {
    const updatedBmi = [...total];
    updatedBmi.splice(index, 1);
    setTotal(updatedBmi);
    saveBmis(updatedBmi);
  };

  return (
    <div className="App">
      <div className="cnt-box">
        <div className="container">
          <h1>BMI CALCULATOR</h1>
          <label className="label1">
            NAME :
            <input
              className="name"
              value={name}
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
          <label className="label2">
            AGE :
            <input
              className="age"
              value={age}
              placeholder="Age"
              type="number"
              min={1}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </label>
          <label>
            WEIGHT :
            <input
              className="weight"
              value={weight}
              type="number"
              min={1}
              placeholder={"Weight in Kg"}
              onChange={(e) => setWeight(e.target.value)}
            ></input>
          </label>
          <label>
            HEIGHT :
            <input
              className="height"
              type="number"
              value={height}
              min={1}
              placeholder="Height in"
              onChange={(e) => setHeight(e.target.value)}
            />
            <select
              className="metre"
              value={metre}
              onChange={(e) => setMetre(e.target.value)}
            >
              <option value="m">m</option>
              <option value="cm">cm</option>
            </select>
          </label>
          <button className="btn" onClick={calculateBmi}>
            GET
          </button>
        </div>

        <ul>
          {total.map((bmis, index) => (
            <li key={index}>
              <div className="output">
                <p>{bmis}</p>
                <button onClick={() => deleteBmi(index)}>X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

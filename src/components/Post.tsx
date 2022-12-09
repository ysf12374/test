import React, { useState, useEffect } from "react";
import { api } from './api'
export default function Data() {
  const [users, setUsers] = useState({
    age: "",
    height: "",
    income: ""
  });

  const [datas, setData] = useState([]);
  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      age: parseInt(users.age),
      height: parseInt(users.height),
      income: parseInt(users.income)
    })

    const response = await fetch(//api,
      {
        method: `POST`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': `application/json`
        },
        body: body
      }
    );
    if (response.ok) {
      setUsers({
        age: "",
        height: "",
        income: ""
      })
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(REACT_APP_POST);
    const data = await response.json();
    console.log(data);
    setData(data.item);
  };
  const handleDelete = async () => {
    const response = await fetch(
      api,
      {
        method: `Delete`
      }
    );
  }
  return (
    <div className="App">
      <h1>Submit Test</h1>
      <React.Fragment>
        <input
          type="number"
          value={users.age}
          onChange={handleChange}
          placeholder="age"
          id="age"
        />
        <input
          type="number"
          value={users.height}
          onChange={handleChange}
          placeholder="height"
          id="height"
        />
        <input
          type="number"
          value={users.income}
          onChange={handleChange}
          placeholder="income"
          id="income"
        />

        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
        <button type="submit" onClick={handleDelete}>
          delete
        </button>
        <div>
          {/* {datas.map(i=> <h1 style={{color: "pink"}}>Age is {i.age}</h1>)} */}
        </div>
      </React.Fragment>
    </div>
  );
}

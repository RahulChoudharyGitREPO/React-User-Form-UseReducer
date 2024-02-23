import React, { useReducer, useState } from "react";
import "./App.css";
import { UserRow } from "./Component/UserRow";

const initialState = {
  name: "",
  gender: "Male",
  role: "FrontEnd Developer",
  maritalStatus: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "role":
      return { ...state, role: action.payload };
    case "maritalStatus":
      return { ...state, maritalStatus: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submittedData, setSubmittedData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const payload = type === "checkbox" ? checked : value;
    dispatch({ type: name, payload });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData((prevData) => [...prevData, state]);
    dispatch({ type: "reset" });
  };

  return (
    <div className="App">
      <div>
        <h1>User Form</h1>
        <h3>useReducer</h3>
        <div className="form-wrapper" data-testid="form-wrapper">
          <form data-testid="form-element" onSubmit={handleSubmit}>
            <div className="name-wrapper" data-testid="name-wrapper">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>
            <div className="gender-wrapper" data-testid="gender-wrapper">
              <label>Gender</label>
              <select
                name="gender"
                value={state.gender}
                onChange={handleInputChange}
                data-testid="gender-select"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="role-wrapper" data-testid="role-wrapper">
              <label>Role</label>
              <select
                name="role"
                value={state.role}
                onChange={handleInputChange}
                data-testid="role-select"
              >
                <option>FrontEnd Developer</option>
                <option>BackEnd Developer</option>
                <option>Full Stack Developer</option>
              </select>
            </div>
            <div
              className="marital-status-wrapper"
              data-testid="marital-status-wrapper"
            >
              <legend>Martial Status</legend>
              <div>
                <input
                  type="checkbox"
                  name="maritalStatus"
                  checked={state.maritalStatus}
                  onChange={handleInputChange}
                />
                <label>Married</label>
              </div>
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>

        {/* Render the submitted data */}
        {submittedData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Marital Status</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((user, index) => (
                <UserRow key={index} {...user} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
export { reducer, initialState };

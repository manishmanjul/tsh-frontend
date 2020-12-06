import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const NewUser = () => {
  const [teachers, setTeachers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teacherSelection, setTeacherSelection] = useState(0);
  const [alertFlag, setAlert] = useState({
    flag: "",
    heading: "",
    message: "",
  });

  const getAllTeachers = async () => {
    const response = await fetch("/tsh/Signup/getTeachers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
    var result = await response.json();
    setTeachers(result);
  };

  const handleChange = (e) => {
    setTeacherSelection(e.target.value);
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  const resetAlert = () => {
    setAlert({ flag: "", heading: "", message: "" });
  };

  const isUserExist = async () => {
    var datatoSend = { request: username };
    const response = await fetch("/tsh/Signup/isExist", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datatoSend),
    });
    const resultMessage = await response.json();
    if (resultMessage.returnCode === 1) {
      return true;
    } else if (resultMessage.returnCode === 0) {
      return false;
    }
  };

  const registerNewUser = async () => {
    var datatoSend = {
      name: username,
      password: password,
      phone: "",
      email: "",
      role: "Teacher1",
      teacherName: teacherSelection + "",
    };
    const response = await fetch("/tsh/Signup", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datatoSend),
    });
    const resultMessage = await response.json();
    return resultMessage;
  };

  const submitForm = async () => {
    if (teacherSelection === 0) {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Please select a Teacher.",
      });
      return;
    }

    if (username === "") {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Please enter a valid UserName.",
      });
      return;
    }

    if (password === "") {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Please enter a password.",
      });
      return;
    }

    // if (await isUserExist()) {
    //   setAlert({
    //     flag: "danger",
    //     heading: "Invalid Username",
    //     message:
    //       "The username selected is already in use. Please select another username.",
    //   });
    //   return;
    // }

    var result = await registerNewUser();
    if (result.returnCode === 1) {
      setAlert({
        flag: "success",
        heading: "Thank You!!!",
        message: "Username : " + username + " has been successfully registered",
      });
      return;
    } else {
      setAlert({
        flag: "danger",
        heading: "Internal Error",
        message: result.message,
      });
      return;
    }
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Create New User
      </p>

      {alertFlag.flag !== "" ? (
        <div
          className={"w-100 alert alert-" + alertFlag.flag}
          role="alert"
          onClick={() => resetAlert()}
        >
          <h4 className="alert-heading">{alertFlag.heading}!</h4>
          {alertFlag.message}
        </div>
      ) : (
        <></>
      )}

      <section className="d-flex flex-row justify-content-center w-100 mt-5 text-dark">
        <form className="form-inline w-75" onSubmit={submitForm}>
          <select
            className="custom-select w-25 h-40 rounded-10 mr-3 mb-2 medium-text"
            onChange={handleChange}
          >
            <option value="0" defaultValue>
              Select A Teacher
            </option>
            {teachers ? (
              teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.teacherName}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">UserName</div>
            </div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Password</div>
            </div>
            <input
              type="password"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewUser;

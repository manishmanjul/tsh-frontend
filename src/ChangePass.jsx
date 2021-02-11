import React from "react";
import { useState } from "react";

const ChangePass = ({ logout }) => {
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");

  const [alertFlag, setAlert] = useState({
    flag: "",
    heading: "",
    message: "",
  });

  const resetAlert = () => {
    setAlert({ flag: "", heading: "", message: "" });
  };

  const changePass = async () => {
    var datatoSend = {
      request: password,
    };
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/Signup/changePass",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datatoSend),
      }
    );

    return response;
  };

  const submitForm = async () => {
    if (password === "") {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Please enter a password.",
      });
      return;
    }
    if (password2 === "") {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Please retype your new password.",
      });
      return;
    }

    if (password !== password2) {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Both the password should match",
      });
      return;
    }

    if (password.length < 8) {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Password should be atleast 8 characters long",
      });
      return;
    }

    if (!hasNumber(password)) {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Password should contain atleast one number",
      });
      return;
    }

    if (!hasLetter(password)) {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Password should contain atleast one Letter",
      });
      return;
    }

    var res = await changePass();
    if (res.status == 202) {
      setAlert({
        flag: "success",
        heading: "Success",
        message:
          "Password changed successfully. You will be directed to login page again to login with the new password.",
      });
    } else {
      setAlert({
        flag: "danger",
        heading: "Error",
        message: "Internal Server error. Password could not be changed.",
      });
    }
  };

  const hasNumber = (str) => {
    return /\d/.test(str);
  };

  const hasLetter = (str) => {
    return /[a-zA-Z]/.test(str);
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Change Password
      </p>

      {alertFlag.flag !== "" ? (
        <div
          className={
            "w-100 d-flex flex-column align-items-center alert alert-" +
            alertFlag.flag
          }
          role="alert"
          onClick={() => resetAlert()}
        >
          <h4 className="alert-heading">{alertFlag.heading}!</h4>
          {alertFlag.message}
          {alertFlag.flag == "success" ? (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => logout()}
            >
              ok
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      <section className="d-flex flex-row justify-content-center w-100 mt-5 text-dark">
        <form className="form-inline" onSubmit={submitForm}>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">New Password</div>
            </div>
            <input
              type="password"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Retype Password</div>
            </div>
            <input
              type="password"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="Retype Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      </section>
      <div className="mt-3 d-flex flex-column justify-content-center align-items-center text-darkgrey border align-self-center pl-5 pr-5 background-grey">
        <h6 className="ml-3 mr-5 font-weight-bold">
          Password should contain the following
        </h6>
        <ul className="ml-5 mr-5 text-13">
          <li>Should be atleast 8 characters long</li>
          <li>Should contain atleast 1 alpha numeric character</li>
          <li>Should contain atleast 1 number</li>
          <li>Should not contain any spaces or any special characters.</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePass;

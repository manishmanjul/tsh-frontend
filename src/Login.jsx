import React, { Component } from "react";
import backimage from "./images/LoginFish.jpg";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log("Login constructor..");
    this.state = {
      username: "",
      password: "",
      errormsg: "",
    };
    this.doLogin = this.doLogin.bind(this);
    this.setusername = this.setusername.bind(this);
    this.setpassword = this.setpassword.bind(this);
  }

  setusername(evt) {
    this.setState({ username: evt.target.value });
  }

  setpassword(evt) {
    this.setState({ password: evt.target.value });
  }

  async doLogin() {
    if (this.state.username === "" || this.state.password === "") {
      this.setState({ errormsg: "Invalid credentials. Try again..." });
    } else {
      this.setState({ errormsg: "" });
    }
    const formData = new FormData();
    formData.append("userName", this.state.username);
    formData.append("password", this.state.password);
    const response = await fetch("/tsh/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password,
      }),
    });
    try {
      const welcome = await response.json();
      if (welcome) {
        this.props.afterLogin(welcome.welcomeKit, true, welcome.jwt);
      } else {
        this.setState({ errormsg: "Login Failed" });
      }
      this.setState({ errormsg: welcome.message });
    } catch (err) {
      this.setState({
        errormsg: response.status + " " + err.name + " " + response.statusText,
      });
    }
  }

  render() {
    return (
      <div className="full-height text-dark d-flex flex-row mt-ng-1 pt-0">
        <img
          className="w-50 height-100 pt-0 mt-0 rounded-lg"
          alt=""
          src={backimage}
        />
        <div className="d-flex justify-content-center align-items-center text-dark height-100 w-50 background-light-grey">
          <div className="min-width-80 height-40 mb-5 pb-5 grey-light-border d-flex flex-column rounded-20 align-items-center background-white shadow">
            <span className="medium-text text-danger font-weight-bold mt-2">
              {this.state.errormsg}
            </span>
            <span className="text-verdena font-weight-bold text-dark large-plus-text mt-3 pt-5">
              {" "}
              Login to Continue
            </span>
            <input
              type="text"
              className="form-control form-control-lg w-75 mt-5 button-height-50 rounded-10"
              id="login"
              placeholder="email:  johndoe@example.com"
              onChange={this.setusername}
              tabIndex="1"
            />
            <input
              type="password"
              className="form-control form-control-lg w-75 mt-5 rounded-10 button-height-50"
              id="password"
              placeholder="password"
              onChange={this.setpassword}
              tabIndex="2"
            />
            <div className="custom-control custom-checkbox w-75 mt-3 d-flex flex-row justify-content-between">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" for="customCheck1">
                Remember me
              </label>
              <a href="http://localhost:3000" className="smaller-text">
                Forgot Password?
              </a>
            </div>
            <button
              type="button"
              className="mt-5 mb-4 button-height-40 rounded-10 medium-plus-text w-50 btn btn-primary text-center text-justify"
              onClick={this.doLogin}
              tabIndex="3"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

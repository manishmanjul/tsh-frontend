import React, { Component } from "react";
import "./App.css";
import Footter from "./Footter";
import "./tshhome.css";
import TopHeader from "./TopHeader";
import Login from "./Login";
import DisplayAllStudents from "./DisplayAllStudents";
import BatchCardList from "./BatchCardList";
import { HashRouter, Route, Redirect } from "react-router-dom";
import BatchPlannerest from "./BatchPlannerest";
import FeedbackReport from "./FeedbackReport";
import FeedbackContent from "./FeedbackContent";
import FeedbackSubmit from "./FeedbackSubmit";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      username: "",
      features: "",
      token: "",
    };
  }
  afterLogin = (welcome, loggedIn, jwt) => {
    if (welcome) {
      sessionStorage.setItem("welcomeKit", JSON.stringify(welcome));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("isLoggedIn", true);
      this.setState({ isLoggedIn: true });
    }
  };

  logout = () => {
    sessionStorage.removeItem("welcomeKit");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("jwt");
    this.setState({ isLoggedIn: false });
  };

  static getDerivedStateFromProps(props, state) {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      try {
        var welcome = JSON.parse(sessionStorage.getItem("welcomeKit"));
        var user = welcome.user;
        var name = user.name;
      } catch (err) {
        sessionStorage.removeItem("welcomeKit");
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("jwt");
        return {
          isLoggedIn: false,
          username: "",
          features: "",
          token: "",
        };
      }
      return {
        isLoggedIn: sessionStorage.getItem("isLoggedIn"),
        username: name,
        features: welcome.features,
        token: sessionStorage.getItem("jwt"),
      };
    } else {
      return {
        isLoggedIn: false,
        username: "",
        features: "",
        token: "",
      };
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App-master-container">
          <TopHeader
            username={this.state.username}
            isLoggedIn={this.state.isLoggedIn}
            mainmenu={this.state.features}
            logout={this.logout}
          />

          <div className="App-bottom-container m-0 pt-0">
            <Route
              exact
              path="/schedule"
              render={() => (
                <BatchCardList
                  features={this.state.features}
                  token={this.state.token}
                  feedbackHandle={this.feedback}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return this.state.isLoggedIn === "true" ? (
                  <Redirect to="/schedule" />
                ) : (
                  <Login afterLogin={this.afterLogin} />
                );
              }}
            />

            <Route
              exact
              path="/Logout"
              render={() => <Login afterLogin={this.afterLogin} />}
            />

            <Route
              exact
              path="/DisplayAllStudents"
              render={() => <DisplayAllStudents token={this.state.token} />}
            />
            <Route
              exact
              path="/BatchPlanner"
              render={() => <FeedbackSubmit success="true" />}
            />

            <Footter />
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;

import React, { Component } from "react";
import "./App.css";
import Footter from "./Footter";
import "./tshhome.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'

import TopHeader from "./TopHeader";
import Login from "./Login";
import BatchCardList from "./BatchCardList";
import { HashRouter, Route, Redirect } from "react-router-dom";

import TopicManagement from "./TopicManagement";
import BatchManagement from "./BatchManagement";
import FileUpload from "./FileUpload";

import BatchManagementExcel from "./BatchManagementExcel";
import BatchManagementDashboard from "./BatchManagementDashboard";
import BatchManagementPlanner from "./BatchManagementPlanner";
import BatchManagementOutlook from "./BatchManagementOutlook";
import FeedbackManagement from "./FeedbackManagement";
import NewUser from "./NewUser";
import FeedbackCategoryManagement from "./FeedbackCategoryManagement";
import ChangePass from "./ChangePass";
import DataImportResult from "./DataImportResult";

class App extends Component {
  constructor(props) {
    super(props);
    sessionStorage.setItem("proxy", "https://austsh.com:8443");
    // sessionStorage.setItem("proxy", "http://localhost:8080");
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

  isFisrtLogin = () => {
    var welcome = JSON.parse(sessionStorage.getItem("welcomeKit"));
    if (welcome.user.firstLogin) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
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
              render={() => isLoggedIn ? (
                this.isFisrtLogin() ?
                  <ChangePass logout={this.logout} />
                  : <BatchCardList
                    features={this.state.features}
                    token={this.state.token}
                    feedbackHandle={this.feedback}
                  />
              ) : (
                  <Login afterLogin={this.afterLogin} />
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
              path="/"
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
              path="/FeedbackManagement/Feedback"
              render={() => <FeedbackManagement />}
            />
            <Route
              exact
              path="/FeedbackManagement/Category"
              render={() => <FeedbackCategoryManagement />}
            />
            <Route
              exact
              path="/DisplayAllStudents"
              render={() => <FileUpload token={this.state.token} />}
            />
            <Route
              exact
              path="/Management"
              render={() => <BatchManagement success="true" />}
            />
            <Route
              exact
              path="/Management/Outlook"
              render={() => <BatchManagementOutlook />}
            />
             <Route
              exact
              path="/Management/Import/Result"
              render={() => <DataImportResult />}
            />
            <Route
              exact
              path="/Management/Excel"
              render={() => <BatchManagementExcel success="true" />}
            />
            <Route
              exact
              path="/Dashboard"
              render={() => <BatchManagementDashboard success="true" />}
            />
            <Route
              exact
              path="/Management/Planner"
              render={() => <BatchManagementPlanner success="true" />}
            />
            <Route
              exact
              path="/TopicManagement"
              render={() => <TopicManagement />}
            />
            <Route
              exact
              path="/UserManagement"
              render={() => <NewUser />}
            />
            <Footter />
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;

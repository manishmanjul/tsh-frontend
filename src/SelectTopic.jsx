import React, { Component } from "react";

class SelectTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyId: "topicSelection",
      selectedTopic: "",
      errorMessage: "",
      next: this.props.next ? this.props.next : false,
      confirmMessage: "Confirm Topic for ",
      selectMessage: "Select Topic for ",
      currentTopicMsg: "Today",
      nextTopicMsg: "Next Class",
      RESET: 0,
      GO_TO_NEXT_STEP: this.props.step + 1,
      GO_TO_PREVIOUS_STEP: this.props.step - 1,

      response: {
        selectedTopic: "",
        step: 1,
        next: false,
        goBack: false,
      },
    };

    this.closeMe = this.closeMe.bind(this);
    this.topicSelected = this.topicSelected.bind(this);
    this.getRightBorderColor = this.getRightBorderColor.bind(this);
    this.getSatus = this.getSatus.bind(this);
    this.setTopicObj = this.setTopicObj.bind(this);
    this.getProgressColor = this.getProgressColor.bind(this);
    this.goBack = this.goBack.bind(this);
    this.reset = this.reset.bind(this);
  }

  closeMe() {
    this.reset();
    document.getElementById(this.state.keyId).style.display = "none";
    if (this.props.step >= 0) {
      this.props.resultHandler(this.state.response, true);
    }
  }

  reset() {
    this.state.selectedTopic = "";
    this.state.errorMessage = "";
    this.state.next = false;
  }

  topicSelected(topic) {
    this.state.selectedTopic = topic;
  }

  setTopicObj() {
    if (this.state.selectedTopic !== "") {
      var response = this.state.response;
      response.selectedTopic = this.state.selectedTopic;
      response.step = this.props.step + 1;
      response.next = this.props.next;
      response.goBack = false;

      if (this.props.step <= 0) this.props.resultHandler(response);
      else this.props.resultHandler(response, false);

      document.getElementById(this.state.keyId).style.display = "none";
      this.reset();
    } else {
      this.setState({ errorMessage: " - No Topic Selected" });
    }
  }

  goBack() {
    var response = this.state.response;
    response.selectedTopic = "";
    response.step = this.state.GO_TO_PREVIOUS_STEP;
    response.next = this.props.next;
    response.goBack = true;

    document.getElementById(this.state.keyId).style.display = "none";
    this.props.resultHandler(response);
  }

  getRightBorderColor(topic) {
    var returnVal = "";
    if (topic.id === this.props.currentTopic.id) {
      return "bg-warning grey";
    }
    if (this.props.next === true && topic.id === this.props.nextTopic.id) {
      return "bg-info grey";
    }
    if (topic.status === null) {
      return returnVal + "grey";
    } else if (topic.status === "In Progress") {
      return returnVal + "green";
    } else if (topic.status === "Completed") {
      return returnVal + "red";
    } else if (topic.status === "Planned") {
      return returnVal + "yellow";
    }
  }

  getSatus(topic) {
    if (topic.id === this.props.currentTopic.id) {
      this.state.selectedTopic = topic;
      return "Today's Topic";
    }
    if (this.props.next === true && topic.id === this.props.nextTopic.id) {
      this.state.selectedTopic = topic;
      return "Next Topic";
    }
    if (topic.status === null) {
      return "Not Started";
    } else if (topic.status === "In Progress") {
      return "In Progress since: " + topic.startDate;
    } else if (topic.status === "Completed") {
      return "Completed on: " + topic.endDate;
    } else if (topic.status === "Planned") {
      return "Planned from : " + topic.plannedStartDate;
    }
  }

  getProgressColor(step, myVal) {
    if (step > myVal) {
      return "background-green text-white";
    } else if (step === myVal) {
      return "background-blue text-white";
    } else {
      return "background-grey-plus1";
    }
  }

  render() {
    const data = this.props.data;
    const step = this.props.step;
    this.state.GO_TO_NEXT_STEP = step + 1;

    return (
      <div id="topicSelection" className="w3-modal">
        <div className="w3-modal-content w3-animate-zoom w-77">
          <header className="w3-container background-dark-blue text-white">
            <span
              onClick={this.closeMe}
              className="w3-button w3-display-topright w3-hover-red"
            >
              &times;
            </span>
            <h2>
              {this.props.step >= 0
                ? this.state.confirmMessage
                : this.state.selectMessage}{" "}
              {this.props.next
                ? this.state.nextTopicMsg
                : this.state.currentTopicMsg}
              <span className="text-danger font-weight-bolder large-plus-text">
                {" "}
                {this.state.errorMessage}
              </span>
            </h2>
          </header>

          {this.props.step > 0 ? (
            <div className="w-100 d-flex flex-row justify-content-between text-Helvetica text-dark medium-text font-weight-light">
              <div
                className={
                  "border-white w-20 text-center " +
                  this.getProgressColor(step, 1)
                }
              >
                Select CurrenT Topic
              </div>
              <div
                className={
                  "border-white w-20 text-center " +
                  this.getProgressColor(step, 2)
                }
              >
                Add Feedback{" "}
              </div>
              <div
                className={
                  "border-white w-20 text-center " +
                  this.getProgressColor(step, 3)
                }
              >
                Verify Next Topic
              </div>
              <div
                className={
                  "border-white w-20 text-center " +
                  this.getProgressColor(step, 4)
                }
              >
                Review and Update
              </div>
              <div
                className={
                  "border-white w-20 text-center " +
                  this.getProgressColor(step, 5)
                }
              >
                Submit Feedback
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="w3-container">
            <div className="w3-container h-400px">
              <div className="list-group h-400px auto-scroll p-0 m-0">
                {data ? (
                  data.map((topic) => (
                    <div
                      tabIndex="0"
                      className={
                        "list-group-item list-group-item-action p-0 m-0 d-flex flex-row right-border " +
                        this.getRightBorderColor(topic)
                      }
                      onClick={() => this.topicSelected(topic)}
                    >
                      <div className="w-75 border-right p-0 m-0 d-flex flex-column justify-content-center">
                        <p className="p-0 m-0 pl-4 large-text letter-s2 text-helvetica">
                          {topic.description}
                        </p>
                        <p className="p-0 m-0 pl-4 medium-text font-weight-light text-helvetica">
                          {topic.chapter}
                        </p>
                      </div>
                      <div className="w-25 medium-text font-weight-light text-helvetica pt-4 pb-4 pl-2">
                        {this.getSatus(topic)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          <footer className="w3-container background-dark-blue">
            <div className="d-flex flex-row justify-content-center">
              {this.props.step >= 0 ? (
                this.props.next ? (
                  <button
                    type="button"
                    className=" w3-center btn btn-warning rounded-lg mr-4 "
                    onClick={this.goBack}
                  >
                    Go Back
                  </button>
                ) : (
                  <button
                    type="button"
                    className=" w3-center btn btn-warning rounded-lg mr-4 "
                    onClick={this.goBack}
                    disabled
                  >
                    Go Back
                  </button>
                )
              ) : (
                <div></div>
              )}
              <button
                type="button"
                className=" w3-center btn btn-danger rounded-lg mr-4 "
                onClick={this.closeMe}
              >
                Close
              </button>
              {this.props.step >= 0 ? (
                <button
                  type="button"
                  className="btn btn-success rounded-lg ml-4"
                  onClick={this.setTopicObj}
                >
                  Confirm
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success rounded-lg ml-4"
                  onClick={this.setTopicObj}
                >
                  Select Topic
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default SelectTopic;

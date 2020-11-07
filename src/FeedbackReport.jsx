import React, { Component } from "react";
import FeedbackContent from "./FeedbackContent";

class FeedbackReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyId: "feedbackReport",
      errorMessage: "",
      resetChild: false,

      response: {
        next: false,
        goBack: false,
        studentList: "",
      },
    };

    this.getProgressColor = this.getProgressColor.bind(this);
    this.closeMe = this.closeMe.bind(this);
  }

  goBack = () => {
    this.closeMe();
    this.state.response.goBack = true;
    this.state.response.next = false;
    this.props.resultHandler(this.state.response);
  };

  submit = () => {    
    this.state.response.next = true;
    this.state.response.goBack = false;
    this.props.resultHandler(this.state.response);
    this.state.response.studentList = "";
    this.closeMe();
  };

  getProgressColor(step, myVal) {
    if (step > myVal) {
      return "background-green text-white";
    } else if (step === myVal) {
      return "background-blue text-white";
    } else {
      return "background-grey-plus1";
    }
  }

  closeMe() {
    document.getElementById(this.state.keyId).style.display = "none";
    this.state.response.studentList = "";
    this.setState({ resetChild: true });
  }

  resetDone = () => {
    this.state.resetChild = false;
  };

  getStudentListMap = (studList) => {
    this.state.response.studentList = studList;
  };

  render() {
    const step = parseInt(this.props.step);

    return (
      <div id="feedbackReport" className="w3-modal myposition">
        <div className="w3-modal-content w3-animate-zoom w-77">
          <header className="w3-container background-dark-blue text-white">
            <span
              onClick={this.closeMe}
              className="w3-button w3-display-topright w3-hover-red"
            >
              &times;
            </span>
            <h2>
              Review Feedback
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
                Select Current Topic
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
          <div className="w3-container p-1">
            <div className="w3-container h-500px auto-scroll p-0 m-0">
              <FeedbackContent
                studentName={this.props.studentName}
                step={this.props.step}
                currentTopic={this.props.currentTopic}
                nextTopic={this.props.nextTopic}
                course={this.props.course}
                term={this.props.term}
                teacher={this.props.teacher}
                attendies={this.props.attendies}
                fullFeedback={this.props.fullFeedback}
                feedbackMaster={this.props.feedbackMaster}
                reset={this.state.resetChild}
                resetDone={this.resetDone}
                addStudent={this.getStudentListMap}
              />
            </div>
          </div>
          <footer className="w3-container background-dark-blue">
            <div className="d-flex flex-row justify-content-center">
              <button
                type="button"
                className=" w3-center btn btn-warning rounded-lg mr-4 "
                onClick={this.goBack}
              >
                Go Back
              </button>

              <button
                type="button"
                className=" w3-center btn btn-danger rounded-lg mr-4 "
                onClick={this.closeMe}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-success rounded-lg ml-4"
                onClick={this.submit}
              >
                Review Completed - Submit Feedback
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default FeedbackReport;

import React, { Component } from "react";
import FeedbackBox from "./FeedbackBox";

class FeedbackMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      keyId: "feedbackSelection",
      isGoBack: false,
      resetFeedbacks: false,
      feedbackObj: {
        id: "",
        description: "",
        comment: "",
        items: new Map(),
      },
    };
    this.closeMe = this.closeMe.bind(this);
    this.getProgressColor = this.getProgressColor.bind(this);
    this.getFeedbackProgressClass = this.getFeedbackProgressClass.bind(this);
    this.next = this.next.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getAnimationCLass = this.getAnimationCLass.bind(this);
    this.resetDone = this.resetDone.bind(this);
    this.resetChildFeedbacBox = this.resetChildFeedbacBox.bind(this);
  }

  closeMe() {
    this.resetChildFeedbacBox();
    document.getElementById(this.state.keyId).style.display = "none";
    this.props.resultHandler(this.state.feedbackObj, true, true);
    this.clearFeedbacks();
  }

  async next() {
    this.setState({ isGoBack: false, resetFeedbacks: true });
    this.callBackResultHandler();
    this.clearFeedbacks();
  }

  async goBack() {
    this.setState({ isGoBack: true, resetFeedbacks: true });
    this.callBackResultHandler();
    this.clearFeedbacks();
  }

  callBackResultHandler = () => {
    document.getElementById(this.state.keyId).style.display = "none";

    var itemsCopy = new Map(this.state.feedbackObj.items);
    var feedbackObjCopy = JSON.parse(JSON.stringify(this.state.feedbackObj));
    feedbackObjCopy.items = itemsCopy;
    feedbackObjCopy.comment = this.teacherComment.value;

    setTimeout(() => {
      this.props.resultHandler(feedbackObjCopy, this.state.isGoBack);
    }, 1);
  };

  resetDone() {
    this.setState({ resetFeedbacks: false });
  }

  resetChildFeedbacBox() {
    this.setState({ resetFeedbacks: true });
  }

  clearFeedbacks = () => {
    this.state.errorMessage = "";
    this.teacherComment.value = "";
    this.state.feedbackObj.id = "";
    this.state.feedbackObj.description = "";
    this.state.feedbackObj.items = new Map();
    this.state.feedbackObj.comment = "";
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

  getFeedbackProgressClass(selfCtr) {
    var ctr = this.props.feedbackCounter;
    if (ctr === selfCtr) return "glyphicon glyphicon-play text-primary text-11";
    else if (ctr > selfCtr)
      return "glyphicon glyphicon-ok text-success large-text";
    else return "glyphicon glyphicon-pause text-lightgrey2 text-11";
  }

  recordFeedback = (id, description) => {
    this.setState({ errorMessage: "" });
    this.state.feedbackObj.id = this.props.data.id;
    this.state.feedbackObj.description = this.props.data.description;

    var temp = this.state.feedbackObj;
    temp.items.set("" + id, "" + description);
    this.setState({ feedbackObj: temp });
  };

  removeFeedback = (id) => {
    var temp = this.state.feedbackObj;
    temp.items.delete("" + id);
    this.setState({ feedbackObj: temp });
  };

  getAnimationCLass() {
    if (this.state.isGoBack) {
      return "w3-animate-top";
    } else {
      return "w3-animate-bottom";
    }
  }

  initFeedback = () => {
    this.state.errorMessage = "";
    this.teacherComment.value = "";
    this.state.feedbackObj.id = this.props.data.id;
    this.state.feedbackObj.description = this.props.data.description;
    if (this.props.initialState === "") {
      this.state.feedbackObj.items = new Map();
      this.state.feedbackObj.comment = "";
    } else {
      this.state.feedbackObj.items = new Map();
      Array.from(this.props.initialState.items.keys()).map((key) =>
        this.state.feedbackObj.items.set(
          key,
          this.props.initialState.items.get(key)
        )
      );
      this.state.feedbackObj.comment = this.props.initialState.comment;
      this.teacherComment.value = this.props.initialState.comment;
    }
    this.props.initDone();
  };

  isSelected = (id) => {
    if (this.state.feedbackObj.items.has("" + id)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const step = this.props.step;
    const data = this.props.data;

    if (data && this.props.initFeedback === true) {
      this.initFeedback();
    }

    return (
      <div id="feedbackSelection" className="w3-modal">
        <div className={"w3-modal-content w-77 " + this.getAnimationCLass()}>
          <header className="w3-container background-dark-blue text-white">
            <span
              onClick={this.closeMe}
              className="w3-button w3-display-topright w3-hover-red"
            >
              &times;
            </span>
            <span className="text-white large-plus1-text text-Helvetica letter-s2">
              Feedback for {this.props.studentName}.
              <span className="text-danger font-weight-bolder large-plus-text">
                {" "}
                {this.state.errorMessage}
              </span>
            </span>
            <p className="large-text text-white text-Helvetica font-weight-light letter-s1">
              TOPIC - {" " + this.props.topic}
            </p>
          </header>
          <div className="w3-container">
            <div className="w3-container h-400px pl-0 pr-0">
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
                  Add Feedback [{this.props.feedbackCounter + 1}/
                  {this.props.totalFeedbackCount}]
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
              <div className="d-flex flex-row w-100">
                <div className="h-400px m-0 pl-0 pr-0 pt-4 pb-0 w-15 background-grey border-b-card-green shadow-lg border-right d-flex flex-column text-center justify-content-around">
                  {this.props.feedbackMaster ? (
                    this.props.feedbackMaster.map((d, index, ar) => (
                      <div className="d-flex flex-column text-center justify-content-around">
                        <p className="text-dark text-11 font-weight-light text-helvetica text-uppercase letter-s3 p-0 m-0">
                          <i
                            className={"" + this.getFeedbackProgressClass(0)}
                          />{" "}
                          {d.description}
                        </p>
                        {index + 1 < this.props.feedbackMaster.length ? (
                          <div className="border-grey h-50 w-0px align-self-center p-0 m-0"></div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                  ;
                </div>
                <div className="text-primary pl-3 w-100 d-flex flex-column">
                  <h4 className="font-weight-bold letter-s1">
                    {" "}
                    Feedback for {data ? data.description : ""} Section{" "}
                    <span className="text-danger medium-text">
                      {this.state.errorMessage === ""
                        ? ""
                        : this.state.errorMessage}
                    </span>
                  </h4>
                  <div className="w-90 border-greyplus1"></div>
                  <div className="w-100 mt-4 d-flex flex-row justify-content-around">
                    {" "}
                    {data ? (
                      data.feedbacks.map((item) => (
                        <FeedbackBox
                          heading={item.shortDescription}
                          bodyText={item.description}
                          keyId={item.id}
                          onOnClick={this.recordFeedback}
                          onOffClick={this.removeFeedback}
                          reset={this.state.resetFeedbacks}
                          resetDone={this.resetDone}
                          selected={this.isSelected(item.id)}
                        />
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="input-group input-group-lg mt-5 pl-4 pr-4 align-self-center">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text meduim-text"
                        id="inputGroup-sizing-lg"
                      >
                        Teacher's Comment
                      </span>
                    </div>
                    <input
                      type="text"
                      id="myInput"
                      className="form-control"
                      aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm"
                      ref={(ref) => (this.teacherComment = ref)}
                    />
                  </div>
                </div>
              </div>
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
                onClick={this.next}
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default FeedbackMain;

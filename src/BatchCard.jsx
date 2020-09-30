import React, { Component } from "react";
import { Card } from "react-bootstrap";
import StudentCard from "./StudentCard";
import "./BatchCard.css";

class BatchCard extends Component {
  constructor(props) {
    super(props);

    if (props.profile) {
      this.state = {
        profile: props.profile,
        batchData: this.props.data,
        TODAY: 1,
        NEXT_CLASS: 2,
        printBooklet: false,
        submitFeedback: false,
        forFeedback: {
          step: 0,
          forTopic: {
            step: 0,
            data: this.props.data.topics,
            currentTopic: this.props.data.currentTopic,
            nextTopic: this.props.data.nextTopic,
            next: false,
            resultHandler: "",
          },
          feedback: {
            step: 0,
            studentName: "",
            topic: {},
            feedbackCounter: 0,
            totalFeedbackCount: this.props.feedbackMasterCount,
            resultHandler: "",
            initialState: "",
            feedbackMasterData: "",
            nextTopic: "",
            course: "",
            term: "",
            teacher: "",
            attendies: "",
            fullFeedback: "",
          },
        },
      };
    } else {
      this.state = {
        profile: "green",
      };
    }
    this.topicSelectionClicked = this.topicSelectionClicked.bind(this);
  }

  printBooklet = () => {
    this.state.printBooklet = !this.state.printBooklet;
  };

  launchTopicSelector = (config) => {
    this.state.forFeedback.forTopic.step = config.step;
    if (config.data) {
      this.state.forFeedback.forTopic.data = config.data;
    } else {
      this.state.forFeedback.forTopic.data = this.state.batchData.topics;
    }
    this.state.forFeedback.forTopic.currentTopic = this.state.batchData.currentTopic;
    this.state.forFeedback.forTopic.nextTopic = this.state.batchData.nextTopic;
    this.state.forFeedback.forTopic.next = config.next;
    this.state.forFeedback.forTopic.resultHandler = config.resultHandler;

    this.props.topicSelector(this.state.forFeedback.forTopic);
  };

  launchFeedbackSelector = (config) => {
    this.state.forFeedback.feedback.step = config.step;
    this.state.forFeedback.feedback.studentName = config.studentName;
    this.state.forFeedback.feedback.topic = config.topic;
    this.state.forFeedback.feedback.feedbackCounter = config.feedbackCounter;
    this.state.forFeedback.feedback.resultHandler = config.resultHandler;
    this.state.forFeedback.feedback.initialState = config.initialState;
    this.state.forFeedback.feedback.feedbackMasterData =
      config.feedbackMasterData;

    this.props.feedbackSelector(this.state.forFeedback.feedback);
  };

  launchFeedbackReviewSelector = (config) => {
    this.state.forFeedback.feedback.step = config.step;
    this.state.forFeedback.feedback.studentName = config.studentName;
    this.state.forFeedback.feedback.topic = config.topic;
    this.state.forFeedback.feedback.nextTopic = config.nextTopic;
    this.state.forFeedback.feedback.feedbackCounter = config.feedbackCounter;
    this.state.forFeedback.feedback.resultHandler = config.resultHandler;
    this.state.forFeedback.feedback.initialState = config.initialState;
    this.state.forFeedback.feedback.term = config.term;
    this.state.forFeedback.feedback.course = config.course;
    this.state.forFeedback.feedback.feedbackMasterData =
      config.feedbackMasterData;
    this.state.forFeedback.feedback.attendies = config.attendies;
    this.state.forFeedback.feedback.fullFeedback = config.fullFeedback;

    this.props.feedbackReviewSelector(this.state.forFeedback.feedback);
  };

  prepareForNextTopicSelection = (request) => {
    request.step = 3;
    request.next = true;
    return request;
  };

  /* Event method. Called when current and next topic selection is made by ser */
  topicSelectionClicked(topicDay) {
    var temp = this.state.forFeedback.forTopic;
    temp = this.populateTopicRequestForMandatory(temp);
    temp.step = -1;
    if (topicDay === this.state.TODAY) temp.next = false;
    else temp.next = true;
    temp.resultHandler = this.setTopic;

    this.launchTopicSelector(temp);
  }

  populateTopicRequestForMandatory = (request) => {
    request.data = this.state.batchData.topics;
    request.currentTopic = this.state.batchData.currentTopic;
    request.nextTopic = this.state.batchData.nextTopic;
    return request;
  };

  populateFeedbackRequestForMandatory = (request) => {
    request.topic = this.state.batchData.currentTopic;
    request.totalFeedbackCount = this.props.feedbackMasterCount;
    return request;
  };

  prepareRequestForReview = (request) => {
    request.step = 4;
    request.topic = this.state.batchData.currentTopic;
    request.nextTopic = this.state.batchData.nextTopic;
    request.term = this.state.batchData.term;
    request.teacher = this.state.batchData.teacherName;
    request.attendies = this.state.batchData.attendies;
    return request;
  };

  /* Call back method for topic selection model window to accept the result of selection */
  setTopic = (response) => {
    var tempData = this.state.batchData;
    if (response.next === false) {
      tempData.currentTopic = response.selectedTopic;
    } else {
      tempData.nextTopic = response.selectedTopic;
    }
    this.setState({ batchData: tempData });
  };

  progressManager = (request) => {
    var step = request.step;
    if (step === 0) {
      //this is the reset code
      this.setState({ feedbackStep: 0, counter: 1 });
      return;
    }
    if (step === 1) {
      var topicRequest = this.populateTopicRequestForMandatory(
        request.forTopic
      );
      this.launchTopicSelector(topicRequest);
    }
    if (step === 2) {
      var feedbackRequest = this.populateFeedbackRequestForMandatory(
        request.feedback
      );
      this.launchFeedbackSelector(feedbackRequest);
    }
    if (step === 3) {
      var nextTopicRequest = this.populateTopicRequestForMandatory(
        request.forTopic
      );
      nextTopicRequest = this.prepareForNextTopicSelection(nextTopicRequest);
      this.launchTopicSelector(nextTopicRequest);
    }
    if (step === 4) {
      var reviewRequest = this.prepareRequestForReview(request.feedback);
      this.launchFeedbackReviewSelector(reviewRequest);
    }
  };

  submitFeedback = (studentFeedback) => {
    studentFeedback.todaysTopicId = this.state.batchData.currentTopic.id;
    studentFeedback.todaysTopicDesc = this.state.batchData.currentTopic.description;
    studentFeedback.nextTopicId = this.state.batchData.nextTopic.id;
    studentFeedback.nextTopicDesc = this.state.batchData.nextTopic.description;
    studentFeedback.batchDetailId = this.state.batchData.key;
    studentFeedback.courseId = this.state.batchData.courseId;
    studentFeedback.printBooklet = this.state.printBooklet;
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      var welcomeKit = JSON.parse(sessionStorage.getItem("welcomeKit"));
      studentFeedback.updatedById = welcomeKit.teacher.id;
    }
    this.submitToServer(studentFeedback);
    console.log("ok");
  };

  submitToServer = async (studentFeedback) => {
    document.getElementById("feedbackSubmit").style.display = "block";
    const response = await fetch("/tsh/feedback/submit", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentFeedback),
    });
    if (response.status != 200) {
      this.props.feedbackSubmit(true, false, response.status);
    }
    const responseMessage = await response.json();

    if (responseMessage.returnCode === 100) {
      this.props.feedbackSubmit(true, true, responseMessage.returnCode);
    } else {
      this.props.feedbackSubmit(true, false, responseMessage.returnCode);
    }
  };

  render() {
    const data = this.state.batchData;

    return (
      <Card style={{ width: "100%" }} className="m-0 p-0 shadow-lg">
        <Card.Body className={"batch rounded m-0 " + this.state.profile}>
          <Card.Subtitle className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center pt-4 mr-2 w-100">
              <div className="d-flex flex-row w-35 h-40 shadow">
                <button
                  type="button"
                  title="Change today's topic"
                  className={
                    "d-flex border-0 flex-column justify-content-center w-35 rounded-top-left-5 rounded-bottom-left-5 h-40 background text-white text-helvetica font-weight-light text-uppercase letter-s3 " +
                    this.state.profile
                  }
                  onClick={() => this.topicSelectionClicked(this.state.TODAY)}
                >
                  <p className="p-0 m-0 align-self-center text-11">
                    Todays's Topic
                  </p>
                </button>
                <div className="d-flex w-75 h-40 pl-3 pb-0 mb-0 background-grad-grey rounded-top-right-5 rounded-bottom-right-5 text-helvetica text-lightgrey3 font-weight-bold medium-text ">
                  <p className="p-0 m-0 align-self-center">
                    {data.currentTopic.description}
                  </p>
                </div>
              </div>

              <div className="d-flex flex-row w-35 h-40 shadow">
                <button
                  type="button"
                  title="Change next topic"
                  className={
                    "d-flex border-0 flex-column justify-content-center w-35 h-40 background rounded-top-left-5 rounded-bottom-left-5 text-white text-helvetica font-weight-light text-uppercase letter-s3 " +
                    this.state.profile
                  }
                  onClick={() =>
                    this.topicSelectionClicked(this.state.NEXT_CLASS)
                  }
                >
                  <p className="p-0 m-0 align-self-center text-11">
                    Next Topic
                  </p>
                </button>
                <div className="d-flex w-75 h-40 pl-3 pb-0 mb-0 background-grad-grey rounded-top-right-5 rounded-bottom-right-5 text-helvetica text-lightgrey3 font-weight-bold medium-text ">
                  <p className="p-0 m-0 align-self-center">
                    {data.nextTopic.description}
                  </p>
                </div>
              </div>

              <div className="d-flex flex-row w-10 mr-2 ml-3 h-36 border border-primary shadow rounded-5 bg-white align-text-center background-grad-grey ">
                <div className="input-group-text mr-3 h-36 rounded-top-left-5 rounded-bottom-left-5 w-25 justify-content-center background-grey-plus">
                  <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    title="Print booklet for the next-class"
                    onClick={this.printBooklet}
                  />
                </div>
                <p className="align-self-center m-0 p-0 text-georgia text-lightgrey3 medium-text font-weight-light">
                  Print Booklet
                </p>
              </div>
              <div className="d-flex flex-row">
                <Card className="shadow-sm">
                  <Card.Header
                    className={
                      "term p-2 pr-3 pl-3 m-0 sm-text font-weight-bold text-dark border border-0 " +
                      this.state.profile
                    }
                  >
                    Term
                  </Card.Header>
                  <Card.Body
                    className={
                      "term p-0 m-0 text-center text-lightgrey3 " +
                      this.state.profile
                    }
                  >
                    {data.term}
                  </Card.Body>
                </Card>

                <Card className="text-dark ml-2 text-helvetica letter-s2 shadow-sm">
                  <Card.Header
                    className={
                      "term p-2 pr-2 pl-2 m-0 sm-text font-weight-bold border border-0 " +
                      this.state.profile
                    }
                  >
                    Teacher
                  </Card.Header>
                  <Card.Body
                    className={
                      "teacher p-0 m-0 pt-3 text-center text-lightgrey3 medium-text text-uppercase " +
                      this.state.profile
                    }
                  >
                    {data.teacherName}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Subtitle>
          <Card.Text>
            <div className="d-flex flex-row justify-content-around pt-5 pl-0 pr-0">
              {data.attendies.map((student) => (
                <StudentCard
                  profile={this.state.profile}
                  student={student}
                  progressManager={this.progressManager}
                  requestObj={this.state.forFeedback}
                  saveTopic={this.setTopic}
                  feedbackMasterData={this.props.feedbackMaster}
                  submitFeedback={this.submitFeedback}
                />
              ))}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default BatchCard;

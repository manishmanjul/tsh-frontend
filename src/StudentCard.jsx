import React, { Component } from "react";
import { Card, NavDropdown } from "react-bootstrap";
import StudentCardMenu from "./StudentCardMenu";
import "./StudentCard.css";

class StudentCard extends Component {
  constructor(props) {
    super(props);
    if (props.profile) {
      this.state = {
        profile: props.profile,
        keyId: props.keyId,
        feedbackCounter: 0,
        request: "",

        fullFeedback: new Map(),
      };
    } else {
      this.state = {
        profile: "green",
      };
    }
    this.clicked = this.clicked.bind(this);
  }

  clicked(studentName) {
    var request = this.props.requestObj;
    request.step = 1;
    request.forTopic.step = 1;
    request.forTopic.next = false;
    request.forTopic.resultHandler = this.topicResultHandler;

    request.feedback.step = 2;
    request.feedback.studentName = studentName;
    request.feedback.feedbackCounter = 0;
    request.feedback.resultHandler = this.feedbackResultHandler;
    request.feedback.initialState = "";
    request.feedback.course = this.props.student.course;
    request.feedback.feedbackMasterData = this.props.feedbackMasterData[
      request.feedback.feedbackCounter
    ];
    this.state.request = request;

    this.props.progressManager(request);
  }

  topicResultHandler = (response, isClose) => {
    if (isClose) return;

    if (response.next && response.goBack === false) {
      this.state.request.step = 4;
      this.state.request.feedback.resultHandler = this.feedbackReviewHandler;
      this.state.request.feedback.fullFeedback = this.state.fullFeedback;
      this.props.saveTopic(response);
    } else {
      this.state.request.step = 2;
      this.state.feedbackCounter = 0;
      this.prepareFeedbackRequest();
    }
    if (response.selectedTopic != "") this.props.saveTopic(response);
    this.props.progressManager(this.state.request);
  };

  feedbackResultHandler = (response, gotoNext, isClose) => {
    if (isClose) {
      this.state.fullFeedback.clear();
      this.state.feedbackCounter = 0;
      this.state.request.step = 0;
    } else {
      this.state.fullFeedback.set(response.id, response);

      if (gotoNext) this.state.feedbackCounter--;
      else this.state.feedbackCounter++;

      if (this.state.feedbackCounter < 0) {
        this.clicked(this.state.request.feedback.studentName);
        return;
      }
      if (this.state.feedbackCounter >= this.props.feedbackMasterData.length) {
        this.state.request.step = 3;
        this.state.request.forTopic.resultHandler = this.topicResultHandler;
        this.props.progressManager(this.state.request);
        return;
      }
      if (
        this.state.feedbackCounter >= 0 &&
        this.state.feedbackCounter < this.props.feedbackMasterData.length
      ) {
        this.prepareFeedbackRequest();
      }

      this.props.progressManager(this.state.request);
    }
  };

  feedbackReviewHandler = (response) => {
    if (response.goBack) {
      this.state.request.step = 3;
      this.state.request.forTopic.resultHandler = this.topicResultHandler;
      this.props.progressManager(this.state.request);
      return;
    } else if (response.next) {
      this.submitFeedback(response);
    } else {
      console.log(
        "Feedback Review Handler :: No instructions to move forward..."
      );
    }
  };

  submitFeedback = (response) => {
    console.log("Submit fedback called : " + response);
    var todaysDate = new Date();
    todaysDate =
      todaysDate.getFullYear() +
      "-" +
      (todaysDate.getMonth() + 1) +
      "-" +
      todaysDate.getDate();

    let studentFeedback = {
      todaysTopicId: "",
      todaysTopicDesc: "",
      nextTopicId: "",
      nextTopicDesc: "",
      batchDetailId: "",
      courseId: "",
      classDate: todaysDate,
      printBooklet: "",
      updatedById: "",
      feedbacks: [],
      students: [],
    };

    // create a student object
    Array.from(response.studentList.keys()).map((key) => {
      if (response.studentList.get(key).selected === true) {
        let stud = {
          id: key,
          name: response.studentList.get(key).name,
        };
        studentFeedback.students.push(stud);
      }
    });

    Array.from(this.state.fullFeedback.keys()).map((key) => {
      Array.from(this.state.fullFeedback.get(key).items.keys()).map(
        (itemKey) => {
          let givenFeedback = {
            feedbackId: itemKey,
            description: this.state.fullFeedback.get(key).items.get(itemKey),
            categoryId: this.state.fullFeedback.get(key).id,
            categoryDescription: this.state.fullFeedback.get(key).description,
            comment: this.state.fullFeedback.get(key).comment,
          };
          studentFeedback.feedbacks.push(givenFeedback);
        }
      );
    });

    this.props.submitFeedback(studentFeedback);
  };

  prepareFeedbackRequest = () => {
    this.state.request.feedback.feedbackCounter = this.state.feedbackCounter;

    var idToSend = this.props.feedbackMasterData[
      this.state.request.feedback.feedbackCounter
    ].id;
    if (this.state.fullFeedback.has(idToSend)) {
      this.state.request.feedback.initialState = this.state.fullFeedback.get(
        idToSend
      );
    } else {
      this.state.request.feedback.initialState = "";
    }
    this.state.request.feedback.feedbackMasterData = this.props.feedbackMasterData[
      this.state.request.feedback.feedbackCounter
    ];
    this.state.request.feedback.resultHandler = this.feedbackResultHandler;
  };

  render() {
    const data = this.props.student;
    return (
      <Card style={{ width: "28%" }} className="m-1 p-0 shadow-lg student">
        <Card.Header
          className={
            "d-flex flex-row justify-content-between align-items-center p-0 m-0 border-0 rounded-lg student " +
            this.state.profile
          }
        >
          <div>
            <span className="pl-2 text-helvetica font-weight-bold medium-text text-white letter-s2">
              <i className="glyphicon glyphicon-user pr-2" />
              {data.name + " ["}
              <span className="sm-text">
                Grade {data.grade + " - " + data.course}
              </span>
              ]
            </span>
          </div>
          <div>
            <StudentCardMenu />
          </div>
        </Card.Header>
        <Card.Body
          className={
            "p-0 pb-2 rounded-lg student d-flex flex-column justify-content-around align-content-center" +
            this.state.profile
          }
        >
          <Card.Subtitle className="m-0 pl-0 text-darkgrey student d-flex flex-row">
            <div
              className={
                "w-100 h-100 pt-4 m-0 pl-2 font-weight-bold text-helvetica large-text left-border background-grey-plus " +
                this.state.profile
              }
            >
              {data.previousTopic}
            </div>
            <div
              className={
                "background m-0 w-24 pt-3 text-center text-helvetica sm-text letter-s2 font-weight-lighter text-white left-border-white " +
                this.state.profile
              }
            >
              <p className="m-0 mb-1 p-0">PREVIOUS</p> <p>TOPIC</p>
            </div>
          </Card.Subtitle>
          <Card.Text className="d-flex flex-column ml-2 mt-0 mb-0 mr-2 student pb-0">
            <div className="w-100 letter-s15 text-lightgrey3 font-weight-bolder sm-text text-center m-0 mt-1 text-high-tower">
              FEEDBACK
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="border-grey w-50p h-70 rounded-top-left-10 rounded-top-right-10 background-grad-grey shadow">
                <div
                  className={
                    "w-100 d-flex flex-row justify-content-between background-grad letter-s3 text-helvetica font-weight-bold sm-text text-lightgreyplus1 rounded-top-left-10 pl-3 rounded-top-right-10 " +
                    this.state.profile
                  }
                >
                  REVISION
                  <a
                    href="#"
                    title="Change Feedback"
                    className="glyphicon glyphicon-pencil text-danger border-0"
                  />
                </div>
                <p className="text-darkgrey medium-text pt-1 pl-1 font-weight-light">
                  Needs more practice on fraction simplification.
                </p>
              </div>
              <div className="border-grey w-50p h-70 rounded-top-left-10 rounded-top-right-10 background-grad-grey shadow">
                <div
                  className={
                    "w-100 d-flex flex-row justify-content-between background-grad letter-s3 text-helvetica font-weight-bold sm-text text-lightgreyplus1 rounded-top-left-10 pl-3 rounded-top-right-10 " +
                    this.state.profile
                  }
                >
                  CLASSWORK
                  <a
                    href="#"
                    title="Change Feedback"
                    className="glyphicon glyphicon-pencil text-danger border-0"
                  />
                </div>
                <p className="text-darkgrey medium-text pt-1 pl-1 font-weight-light">
                  Needs more practice on fraction simplification.
                </p>
              </div>
              <div className="border-grey w-50p h-70 rounded-top-left-10 rounded-top-right-10 background-grad-grey shadow">
                <div
                  className={
                    "w-100 d-flex flex-row justify-content-between background-grad letter-s3 text-helvetica font-weight-bold sm-text text-lightgreyplus1 rounded-top-left-10 pl-3 rounded-top-right-10 " +
                    this.state.profile
                  }
                >
                  HOMEWORK
                  <a
                    href="#"
                    title="Change Feedback"
                    className="glyphicon glyphicon-pencil text-danger border-0"
                  />
                </div>
                <p className="text-darkgrey medium-text pt-1 pl-1 font-weight-light">
                  Needs more practice on fraction simplification.
                </p>
              </div>
              <div className="border-grey w-50p h-70 rounded-top-left-10 rounded-top-right-10 background-grad-grey shadow">
                <div
                  className={
                    "w-100 d-flex flex-row justify-content-between background-grad letter-s3 text-helvetica font-weight-bold sm-text text-lightgreyplus1 rounded-top-left-10 pl-3 rounded-top-right-10 " +
                    this.state.profile
                  }
                >
                  COMMENT
                  <a
                    href="#"
                    title="Change Feedback"
                    className="glyphicon glyphicon-pencil text-danger border-0"
                  />
                </div>
                <p className="text-darkgrey medium-text pt-1 pl-1 font-weight-light">
                  Needs more practice on fraction simplification.
                </p>
              </div>
            </div>
          </Card.Text>
          <Card.Footer className="p-0 m-0 pl-2 pr-2 pt-1 d-flex justify-content-center border-0">
            <button
              type="button"
              className="btn btn-danger btn-lg btn-block rounded-lg w-100 background-red text-uppercase letter-s3 sm-text text-helvetica text-lightgrey"
              onClick={() => this.clicked(data.name)}
            >
              <i className="glyphicon glyphicon-list-alt"></i> Current Feedback
              Pending
            </button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default StudentCard;

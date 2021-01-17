import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import BatchCard from "./BatchCard";
import SubHeader from "./SubHeader";
import SelectTopic from "./SelectTopic";
import FeedbackMain from "./FeedbackMain";

import DisplayAllStudents from "./DisplayAllStudents";
import FeedbackReport from "./FeedbackReport";
import FeedbackSubmit from "./FeedbackSubmit";

class BatchCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueProfile: "blue",
      greenProfile: "green",
      yellowProfile: "yellow",
      orangeProfile: "orange",
      expand: "",
      loaded: false,
      batchData: "",
      feedbackMasterData: "",
      feedbackMasterCount: 0,
      feedbackRefreshRequired: true,
      forTopic: "",
      forFeedback: "",
      initFeedback: false,
      submitResult: false,
      submitStatus: false,
      errorCode: 100,
    };
    this.constructext = this.constructext.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.fetchFeedbackCategories = this.fetchFeedbackCategories.bind(this);
  }

  acceptData = (data) => {
    if (data) {
      this.setState({
        batchData: JSON.parse(JSON.stringify(data)),
        loaded: true,
      });
    }
  };

  getProfile(subject) {
    if (subject.includes("Maths")) return this.state.blueProfile;
    else if (subject.includes("English")) return this.state.orangeProfile;
    else if (subject.includes("GA")) return this.state.greenProfile;
    else return this.state.orangeProfile;
  }

  constructext(item) {
    var returntext =
      item.day +
      " " +
      item.startTime +
      " - " +
      item.endTime +
      " - Grade " +
      item.grade +
      " - " +
      item.courseDescription;
    return returntext;
  }

  launchTopicSelector = (forTopicInput) => {
    this.setState({ forTopic: forTopicInput });
    document.getElementById("topicSelection").style.display = "block";
  };

  launchFeedbackSelector = async (forFeedbackConfig) => {
    await this.setState({ forFeedback: forFeedbackConfig, initFeedback: true });
    document.getElementById("feedbackSelection").style.display = "block";
  };

  launchFeedbackReviewSelector = async (forFeedbackConfig) => {
    await this.setState({ forFeedback: forFeedbackConfig });
    document.getElementById("feedbackReport").style.display = "block";
  };

  launchFeedbackSubmit = (loaded, success, code) => {
    this.setState({
      submitResult: loaded,
      submitStatus: success,
      errorCode: code,
    });
  };

  callBackPostInitFeedback = () => {
    this.setState({ initFeedback: false });
  };

  async fetchFeedbackCategories(myGrade) {
    if (this.state.expand === myGrade) {
      this.state.expand = "";
      return;
    } else {
      this.state.expand = myGrade;
    }
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/feedback/category/" +
        myGrade +
        "/" +
        "true",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      }
    );
    const catData = await response.json();

    this.setState({
      feedbackMasterData: catData,
      feedbackMasterCount: catData.length,
      feedbackRefreshRequired: false,
    });
  }

  getAttendiesName = (attendies) => {
    var names = "";
    for (var i = 0; i < attendies.length; i++) {
      names = names + attendies[i].name;
      if (i < attendies.length - 1) {
        names = names + "  |  ";
      }
    }
    return names;
  };

  render() {
    const batches = this.state.batchData;
    var eventCounter = 1;
    if (this.state.loaded === false) {
      return (
        <div className="full-height d-flex flox-row justify-content-center align-items-center background-grey">
          <DisplayAllStudents
            setToParent={this.acceptData}
            token={this.props.token}
          />
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div style={{ width: "100%" }}>
        <SubHeader features={this.props.features} />

        <SelectTopic
          step={this.state.forTopic.step}
          data={this.state.forTopic.data}
          currentTopic={this.state.forTopic.currentTopic}
          nextTopic={this.state.forTopic.nextTopic}
          next={this.state.forTopic.next}
          progressManager={this.state.forTopic.progressManager}
          resultHandler={this.state.forTopic.resultHandler}
        />

        <FeedbackMain
          studentName={this.state.forFeedback.studentName}
          topic={
            this.state.forFeedback.topic
              ? this.state.forFeedback.topic.description
              : ""
          }
          feedbackCounter={this.state.forFeedback.feedbackCounter}
          totalFeedbackCount={this.state.forFeedback.totalFeedbackCount}
          resultHandler={this.state.forFeedback.resultHandler}
          initialState={this.state.forFeedback.initialState}
          data={this.state.forFeedback.feedbackMasterData}
          step={this.state.forFeedback.step}
          initFeedback={this.state.initFeedback}
          initDone={this.callBackPostInitFeedback}
          feedbackMaster={this.state.feedbackMasterData}
        />

        <FeedbackReport
          studentName={this.state.forFeedback.studentName}
          step={this.state.forFeedback.step}
          course={this.state.forFeedback.course}
          term={this.state.forFeedback.term}
          teacher={this.state.forFeedback.teacher}
          attendies={this.state.forFeedback.attendies}
          resultHandler={this.state.forFeedback.resultHandler}
          fullFeedback={this.state.forFeedback.fullFeedback}
          feedbackMaster={this.state.feedbackMasterData}
          feedbackSubmit={this.feedbackSubmit}
          currentTopic={
            this.state.forFeedback.topic
              ? (this.state.forFeedback.topic.topicName || "") +
                " - " +
                this.state.forFeedback.topic.description +
                " - " +
                (this.state.forFeedback.topic.chapter || "")
              : ""
          }
          nextTopic={
            this.state.forFeedback.nextTopic
              ? (this.state.forFeedback.nextTopic.topicName || "") +
                " - " +
                this.state.forFeedback.nextTopic.description +
                " - " +
                (this.state.forFeedback.nextTopic.chapter || "")
              : ""
          }
        />

        <FeedbackSubmit
          loaded={this.state.submitResult}
          success={this.state.submitStatus}
          errorCode={this.state.errorCode}
        />

        <Accordion style={{ width: "100%" }}>
          {batches ? (
            batches.map((item) => (
              <Card style={{ width: "100%" }} className="m-0 p-0 shadow-lg">
                <Accordion.Toggle
                  as={Card.Header}
                  variant="link"
                  eventKey={eventCounter + ""}
                  onClick={() => this.fetchFeedbackCategories(item.grade)}
                  onCollapse={() => console.log("Expanded")}
                  className={
                    "d-flex flex-row justify-content-between align-items-center p-0 m-0 border-0 rounded-5" +
                    this.getProfile(item.course)
                  }
                >
                  <div
                    className={
                      "d-flex pl-4 w-8 m-0 h-40 text-center rounded-top-left-5 rounded-bottom-left-5 batchList " +
                      this.getProfile(item.course)
                    }
                  >
                    <p className="p-0 m-0 text-helvetica text-11 font-weight-bold align-self-center text-uppercase letter-s2 ">
                      Grade {item.grade}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center w-57 h-40 m-0 background-grad-grey ">
                    <p className="p-0 m-0 text-darkgrey text-helvetica text-12 font-weight-bold text-uppercase letter-s3 align-self-center ">
                      {this.getAttendiesName(item.attendies)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center w-15 h-40 m-0 background-grey-plus right-border-white left-border-white ">
                    <p className="p-0 m-0 text-dark text-helvetica text-12 text-capitalize letter-s1 font-weight-bold align-self-center  ">
                      {item.courseDescription}
                    </p>
                  </div>
                  <div className="d-flex w-20 h-40 pr-4 m-0 rounded-top-right-5 rounded-bottom-right-5 border background-grey-plus justify-content-end ">
                    <p className="p-0 m-0 text-darkgrey text-helvetica text-12 font-weight-bold align-self-center ">
                      {item.day + " " + item.startTime + " - " + item.endTime}
                    </p>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={"" + eventCounter++}>
                  <BatchCard
                    profile={this.getProfile(item.course)}
                    data={item}
                    feedbackHandle={this.props.feedbackHandle}
                    token={this.props.token}
                    topicSelector={this.launchTopicSelector}
                    feedbackSelector={this.launchFeedbackSelector}
                    feedbackSubmit={this.launchFeedbackSubmit}
                    feedbackReviewSelector={this.launchFeedbackReviewSelector}
                    feedbackMasterCount={this.state.feedbackMasterCount}
                    feedbackMaster={this.state.feedbackMasterData}
                    evtKey={eventCounter - 1}
                  />
                </Accordion.Collapse>
              </Card>
            ))
          ) : (
            <div></div>
          )}
        </Accordion>
      </div>
    );
  }
}

export default BatchCardList;

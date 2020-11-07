import React, { Component } from "react";
import { Accordion } from "react-bootstrap";

class FeedbackContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelClicked: false,
      studentList: new Map(),
      loaded: false,
    };
  }

  getFirstDayOfWeek = () => {
    var today = new Date();
    var firstDay = today.getDate() - today.getDay();
    var sunday = new Date();
    sunday.setDate(firstDay);
    return sunday.toDateString();
  };

  getLastDayOfWeek = () => {
    var today = new Date();
    var lastDay = today.getDate() - today.getDay() + 6;
    var saturday = new Date();
    saturday.setDate(lastDay);
    return saturday.toDateString();
  };

  panelClicked = () => {
    this.state.panelClicked = !this.state.panelClicked;
  };

  getShortDesc(id, item) {
    var returnVal = "";
    var feedbackCategory = "";
    this.props.feedbackMaster.map((value) => {
      if (id === value.id) {
        feedbackCategory = value.feedbacks;
        return;
      }
    });

    feedbackCategory.map((fb) => {
      if (fb.id + "" === item) {
        returnVal = fb.shortDescription;
        return;
      }
    });

    return returnVal;
  }

  getDesc = (id, item) => {
    var returnVal = "";
    var feedbackCategory = "";
    this.props.feedbackMaster.map((value) => {
      if (id === value.id) {
        feedbackCategory = value.feedbacks;
        return;
      }
    });

    feedbackCategory.map((fb) => {
      if (fb.id + "" === item) {
        returnVal = fb.description;
        return;
      }
    });

    return returnVal;
  };

  getStudentBorder = (id) => {
    if (this.state.studentList.has(id)) {
      if (this.state.studentList.get(id).selected) {
        return " background orange text-white";
      } else {
        return " border-primary";
      }
    }
  };

  studentClicked = async (id) => {
    var temp = this.state.studentList;
    var stud = temp.get(id);
    stud.selected = !stud.selected;
    temp.set(id, stud);
    await this.setState({ studentList: temp });
  };

  render() {
    if (this.props.reset) {
      this.state.studentList.clear();
      this.state.loaded = false;
      if (this.state.panelClicked)
        document.getElementById("moreStudents").click();
      this.props.resetDone();
    } else if (
      this.props.attendies &&
      this.props.attendies.length > 0
      // this.state.loaded === false
    ) {
      this.props.attendies.map((item) => {
        var isCurrent = false;
        if (item.name === this.props.studentName) isCurrent = true;
        else isCurrent = false;

        if (!!!this.state.studentList.has(item.id)) {
          this.state.studentList.set(item.id, {
            name: item.name,
            selected: isCurrent,
          });
        }
      });
      this.props.addStudent(this.state.studentList);
      this.state.loaded = true;
    }

    return (
      <Accordion className="w-100 d-flex flex-column">
        <div className="p-0 m-0 border-bottom grey pb-1 w-100 text-center">
          {!(this.props.step > 0) ? (
            <div className="text-Palatino p-0 m-0 pl-5 pt-1 h-36 w-100 batchList blue text-capitalize large-text letter-s3 font-weight-bold align-center">
              the study house - [{" "}
              <span className="text-cursive text-lowercase letter-s0 text-yellow medium-text font-weight-light font-italic">
                thestudyhouse.com
              </span>{" "}
              ]
            </div>
          ) : (
            <div></div>
          )}
          <p className="text-georgia text-darkgrey font-weight-bold letter-s1 large-plus1-text p-0 m-0">
            Feedback for {this.props.studentName}{" "}
            <Accordion.Toggle as="a" variant="link" eventKey="100">
              <i
                id="moreStudents"
                className="glyphicon glyphicon-pencil text-11 text-primary"
                title="Copy this feedback to other students"
                onClick={this.panelClicked}
              />
            </Accordion.Toggle>
          </p>
          <p className="text-georgia text-darkgrey font-weight-bold letter-s1 text-11 p-0 m-0">
            Current Week - {this.getFirstDayOfWeek()} -{" "}
            {this.getLastDayOfWeek()}
          </p>
        </div>

        <Accordion.Collapse eventKey="100">
          <div className="w-100 d-flex flex-row justify-content-center">
            <div className="w-75 ml-4 mt-3 d-flex align-self-center flex-row justify-content-center align-self-center medium-text text-darkgrey text-helvetica left-border-blue border-grey rounded-right-5">
              <div className="w-75 d-flex flex-row pl-3">
                <span className="p-0 m-0 align-self-center">
                  Copy this Feedback to :{" "}
                </span>
                {this.props.attendies && this.props.attendies.length > 1 ? (
                  this.props.attendies.map((item) =>
                    item.name !== this.props.studentName ? (
                      <div
                        className={
                          "w-20 h-40 p-0 m-0 ml-5 mt-2 mb-2 mr-3 d-flex shadow-sm flex-row border rounded-10 text-uppercase text-11 font-weight-bold text-center justify-content-center" +
                          this.getStudentBorder(item.id)
                        }
                        onClick={() => this.studentClicked(item.id)}
                      >
                        <span className="m-0 p-0 align-self-center">
                          {item.name}
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )
                  )
                ) : (
                  <div className="w-20 h-40 p-0 m-0 ml-5 mt-2 mb-2 mr-3 d-flex shadow-sm flex-row border-grey background-grey rounded-10 text-uppercase text-11 font-weight-bold text-center justify-content-center">
                    <span className="m-0 p-0 align-self-center">
                      No more student in this batch
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Accordion.Collapse>
        <div className="w-100 d-flex flex-column justify-content-center">
          <div className="p-0 m-0 mt-3 ml-4 pt-4 pb-4 w-75 align-self-center background-light-  grey text-helvetica text-11 text-dark letter-s1 left-border green border-grey rounded-right-5">
            <p className="p-0 m-0 pl-3 text-uppercase letter-s2 text-verdena">
              Subject :{" "}
              <span className="medium-text text-capitalize">
                {this.props.course}
              </span>
            </p>
            <p className="p-0 m-0 pl-3 text-uppercase letter-s2 text-verdena">
              topic :{" "}
              <span className="medium-text text-capitalize">
                {this.props.currentTopic}
              </span>
            </p>
            <p className="p-0 m-0 pl-3 text-uppercase letter-s2 text-verdena">
              Next Topic :{" "}
              <span className="medium-text text-capitalize">
                {this.props.nextTopic}
              </span>
            </p>
            <p className="p-0 m-0 pl-3 text-uppercase letter-s2 text-verdena">
              Teacher :{" "}
              <span className="medium-text text-capitalize">
                {this.props.teacher}
              </span>
            </p>
            <p className="p-0 m-0 pl-3 text-uppercase letter-s2 text-verdena">
              Term :{" "}
              <span className="medium-text text-capitalize">
                {this.props.term}
              </span>
            </p>
          </div>
          <div className="w-75 ml-4 pt-4 align-self-center d-flex justify-content-center flex-row flex-wrap ">
            {this.props.fullFeedback ? (
              Array.from(this.props.fullFeedback.values()).map((element) => (
                <div className="w-49 h-80 border-grey mr-1 mb-1 shadow-sm rounded-top-left-5 rounded-bottom-right-5 d-flex flex-column border-b-card-green">
                  <span className="pt-1 pb-1 mb-2 text-georgia text-lightgrey3 align-self-center text-11 font-weight-bold letter-s4 text-uppercase background-grey-plus w-100 text-center">
                    {element.description}
                    <i
                      className="glyphicon glyphicon-pencil smaller-text text-primary"
                      title="Edit Feedback"
                    />
                  </span>
                  {Array.from(element.items.keys()).map((item) => (
                    <span className="text-13 ml-1 mt-2 mb-1 text-dark text-helvetica font-weight-bold text-uppercase letter-s2">
                      <i className="glyphicon glyphicon-asterisk smaller-text text-primary pl-1 pr-2" />
                      {this.getShortDesc(element.id, item) + " - "}
                      <span className="pl-1 text-verdena text-13 text-dark text-capitalize font-weight-light letter-s1">
                        {this.getDesc(element.id, item)}
                      </span>
                    </span>
                  ))}

                  <span className="text-13 ml-3 mt-3 mb-1 text-dark text-helvetica font-weight-bold text-uppercase letter-s2">
                    <span className="badge badge-info badge-lg p-2">
                      Teacher's Comment -
                    </span>
                    <p className="pl-1 mt-2 text-verdena text-13 text-dark text-capitalize font-weight-light letter-s1">
                      {element.comment !== ""
                        ? element.comment
                        : "--- none ---"}
                    </p>
                  </span>
                </div>
              ))
            ) : (
              <div>this is me</div>
            )}
          </div>
        </div>
      </Accordion>
    );
  }
}

export default FeedbackContent;

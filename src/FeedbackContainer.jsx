import React from "react";
import { Container } from "react-bootstrap";
import FeedbackTemplate from "./FeedbackTemplate";

const FeedbackContainer = ({ topic, deleteFeedback, emailFeedback }) => {
  const constructTopicName = (topic) => {
    var topicName = "";
    if (topic.topicName === null) topicName = "";
    else topicName = topic.topicName;
    if (topicName.length > 0) topicName = topicName + " : ";
    if (topic.description !== null) {
      topicName = topicName + topic.description;
      if (topic.chapter !== null && topicName.length > 0)
        topicName = topicName + " | ";
    }
    if (topic.chapter !== null) topicName = topicName + topic.chapter;
    return topicName;
  };

  const formatDate = (d) => {
    var dt = new Date(d);
    return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
  };

  const mailClicked = (id, studId) => {
    emailFeedback(document.getElementById(id).outerHTML, studId);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-between w-47 shadow text-dark p-0 m-0"
      style={{ border: "solid 1px rgb(224, 222, 222)", width: "47%" }}
    >
      <section
        className="d-flex flex-row justify-content-center w=100 background-grey-plus border-grey m-0 p-0"
        style={{ border: "solid 1px rgb(224, 222, 222)" }}
      >
        <span className="d-flex flex-column w-15 background-grad darkblue p-0 m-0 text-center justify-content-center border-white text-verdena text-12 text-white font-weight-bold">
          {formatDate(topic.providers[0].feedbackDate)}
        </span>
        <span className="w-75 p-0 m-0 text-center border-white">
          <h4 className="text-high-tower">{constructTopicName(topic)}</h4>
        </span>
        <span className="d-flex flex-column justify-content-center w-15 text-center m-0 p-0 border-white text-verdena text-10 text-white font-weight-bold background-grad darkblue">
          {"G " + topic.grade.grade + " " + topic.course.shortDescription}
        </span>
      </section>
      {topic.providers[0].feedbackCategory.map((c) => (
        <section className="pt-3 pl-2">
          <p className="d-flex flex-row justify-content-between text-georgia text-darkgrey large-text text-uppercase letter-s2 m-0 p-0 pl-3">
            <span>{c.description}</span>
            <i
              className="glyphicon glyphicon-edit text-right mr-5 pr-5 cur-pointer"
              title="Edit this Section of feedback"
            ></i>
          </p>
          <div className="w-90 border border-danger p-0 m-0 mb-3"></div>
          {c.feedbacks.map((fb) => (
            <p className="m-0 mb-1 p-0 pr-2">
              <i className="text-primary glyphicon glyphicon-leaf"></i>
              <span className="ml-3 text-13 text-georgia">
                {fb.shortDescription + " - " + fb.description}
              </span>
            </p>
          ))}
          <p className="m-0 mb-1 p-0 pr-2">
            <i className="text-danger glyphicon glyphicon-user font-weight-bold">
              {"  "}Teacher
            </i>
            <span className="ml-3 text-13 text-georgia">
              {c.teachersComment}
            </span>
          </p>
        </section>
      ))}
      <section className="d-flex flex-row justify-content-between border-t-grey bg-danger text-13 mt-3">
        <div className="w-50 text-white text-left text-11 font-weight-bold pl-3">
          Feedback by - {topic.providers[0].teacher.teacherName}
        </div>
        <div className="w-50  text-right">
          <i
            className="glyphicon glyphicon-envelope text-white mr-3 cur-pointer"
            title="Email a copy of this Feedback"
            onClick={() =>
              mailClicked(topic.id, topic.providers[0].studentBatch.id)
            }
          ></i>
          <i
            className="glyphicon glyphicon-trash text-white mr-3 cur-pointer"
            title="Delete this Feedback"
            onClick={() => deleteFeedback(topic)}
          ></i>
        </div>
      </section>
      <FeedbackTemplate topic={topic} />
    </Container>
  );
};

export default FeedbackContainer;

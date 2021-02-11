import React from "react";

const FeedbackTemplate = ({ topic }) => {
  const formatDate = (d) => {
    var dt = new Date(d);
    return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
  };

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

  const capitalise = (text) => {
    return text.toUpperCase(text);
  };

  let counter = true;

  const getBackground = () => {
    var bgcolor = "";
    if (counter === true) {
      bgcolor = "rgb(248, 245, 244)";
    } else {
      bgcolor = "whte";
    }
    counter = !counter;
    return bgcolor;
  };

  return (
    <div
      style={{
        // display: "flex",
        border: "1px solid rgb(224, 222, 222)",
        width: "100%",
        justifyContent: "center",
      }}
      id={topic.id}
      hidden="true"
    >
      {/* <div
        id="2178"
        style={{
          border: "1px solid rgb(224, 222, 222)",
          width: "40%",
          align: "center",
        }}
      > */}
      <section
        style={{
          border: "1px solid rgb(224, 222, 222)",
          align: "center",
          fontSize: "0",
          paddingTop: "4px",
          paddingBottom: "3px",
          backgroundColor: "rgb(11, 102, 138)",
          color: "white",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          [{formatDate(topic.providers[0].feedbackDate)}] -{" "}
        </span>
        <span style={{ padding: "0%", fontSize: "20px", fontWeight: "bold" }}>
          {constructTopicName(topic)} -{" "}
        </span>
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          {"G -" + topic.grade.grade + " " + topic.course.shortDescription}
        </span>
      </section>

      {topic.providers[0].feedbackCategory.map((c) => (
        <section
          style={{
            display: "flex-column",
            border: "1px solid rgb(224, 222, 222)",
            background: getBackground(),
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            <span>{capitalise(c.description)}</span>
          </p>
          <hr style={{ width: "30%" }} color="red" />

          {c.feedbacks.map((fb) => (
            <p>
              <span>{fb.shortDescription + " - " + fb.description}</span>
            </p>
          ))}
          <p style={{ color: "red" }}>
            Teacher -{" "}
            <span style={{ color: "black" }}>{c.teachersComment}</span>
          </p>
        </section>
      ))}
      <section
        style={{
          display: "flex-column",
          border: "1px solid rgb(224, 222, 222)",
          background: "rgb(248, 245, 244)",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "12px", fontWeight: "bold" }}>
          <span>
            Feedback By:{" "}
            <span style={{ color: "red" }}>
              {topic.providers[0].userTO == null
                ? topic.providers[0].teacher.teacherName
                : topic.providers[0].userTO.name}
            </span>
          </span>
        </p>
      </section>
      {/* </div> */}
    </div>
  );
};

export default FeedbackTemplate;

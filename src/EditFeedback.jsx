import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const EditFeedback = ({ setEditing, editTopic }) => {
  const [feedbackCategory, setFeedbackCategory] = useState([]);
  const [originalState, setOriginalState] = useState({});

  const fetchFeedbackCategories = async (myGrade) => {
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/feedback/category/" +
        myGrade +
        "/" +
        "true",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const catData = await response.json();
    setFeedbackCategory(catData);
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

  const formatDate = (d) => {
    var dt = new Date(d);
    return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
  };

  useEffect(() => {
    fetchFeedbackCategories(editTopic.grade.grade);
  }, []);

  const getFeedbackForCat = (cat) => {
    if (feedbackCategory.length > 0) {
      var returnCat = feedbackCategory.filter((c) => c.id == cat.id);

      var tempFeedback = [];
      returnCat[0].feedbacks.map((f) => {
        var exist = false;
        cat.feedbacks.map((ef) => {
          if (ef.id == f.id) {
            exist = true;
          }
        });
        if (exist == false) {
          tempFeedback.push(f);
        }
      });
    }
    return tempFeedback;
  };

  const isExist = (c) => {
    var exist = false;
    editTopic.providers[0].feedbackCategory.map((f) => {
      if (f.id == c.id) {
        exist = true;
      }
    });
    return exist;
  };

  const cancelEditing = () => {
    if (
      window.confirm(
        "All changes will be lost. Do you still want to cancel editing?"
      )
    )
      setEditing({ mode: false });
  };

  const addFeedback = (currentFeedback, feedback) => {
    currentFeedback.feedbacks.push(feedback);
    var temp = { ...editTopic };
    setEditing({ mode: true, editTopic: temp });
  };

  const removeFeedback = (curr, removeFeedback) => {
    var fbs = curr.feedbacks.filter((rf) => rf.id !== removeFeedback.id);
    curr.feedbacks = fbs;
    var temp = { ...editTopic };
    setEditing({ mode: true, editTopic: temp });
  };

  const removeCategory = (removeCat) => {
    var temp = { ...editTopic };
    var tempCat = temp.providers[0].feedbackCategory.filter(
      (c) => c.id !== removeCat.id
    );
    temp.providers[0].feedbackCategory = tempCat;
    setEditing({ mode: true, editTopic: temp });
  };

  const addCategory = (addCat) => {
    var temp = { ...editTopic };
    var tempFeedback = { ...addCat };
    tempFeedback.feedbacks = [];
    temp.providers[0].feedbackCategory.push(tempFeedback);
    setEditing({ mode: true, editTopic: temp });
  };

  const updateFeedback = async () => {
    var dataToSend = {
      studentName: editTopic.providers[0].studentBatch.student.studentName,
      studentBatchId: editTopic.providers[0].studentBatch.id,
      feedbacks: editTopic.providers[0].feedbackCategory,
      teacherId: editTopic.providers[0].teacher
        ? editTopic.providers[0].teacher.id
        : "",
      userName: editTopic.providers[0].userTO
        ? editTopic.providers[0].userTO.name
        : "",
      topicId: editTopic.id,
      topicName: editTopic.topicName,
      topicChapter: editTopic.chapter,
      topicDescription: editTopic.description,
      topicProgressId: editTopic.providers[0].topicProgress.id,
    };

    if (window.confirm("Do you want to update all changes to this feedback?")) {
      const response = await fetch(
        sessionStorage.getItem("proxy") + "/tsh/feedback/updateStudentFeedback",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      setEditing({ mode: false, editTopic: editTopic });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between w-70 w3-animate-bottom">
      <Container
        className="d-flex flex-column justify-content-between w-100 shadow-lg text-dark p-0 m-0 mb-5 w3-animate-bottom "
        style={{ border: "solid 1px rgb(224, 222, 222)", width: "47%" }}
      >
        <section
          className="d-flex flex-row justify-content-center w=100 background-grey-plus2 border-grey m-0 p-0"
          style={{ border: "solid 1px rgb(224, 222, 222)" }}
        >
          <span className="d-flex flex-column w-15 background-grad grey3 p-0 m-0 text-center justify-content-center border-white text-verdena text-12 text-white font-weight-bold">
            {formatDate(editTopic.providers[0].feedbackDate)}
          </span>
          <span className="w-75 p-0 m-0 text-center border-white">
            <h4 className="text-high-tower">{constructTopicName(editTopic)}</h4>
          </span>
          <span className="d-flex flex-column justify-content-center w-15 text-center m-0 p-0 border-white text-verdena text-10 text-white font-weight-bold background-grad grey3">
            {"G " +
              editTopic.grade.grade +
              " " +
              editTopic.course.shortDescription}
          </span>
        </section>
        {editTopic.providers[0].feedbackCategory.map((c) => (
          <section className="pt-3 pl-2">
            <p className="d-flex flex-row justify-content-between text-georgia text-darkgrey large-text text-uppercase letter-s2 m-0 p-0 pl-3 pr-5">
              <span>{c.description}</span>
              <i
                className="ml-2 mr-5 pr-5 text-11 cur-pointer text-danger text-secondary glyphicon glyphicon-remove"
                title="Delete this Category"
                onClick={() => removeCategory(c)}
              ></i>
            </p>
            <div className="w-90 border border-secondary p-0 m-0 mb-3"></div>
            {c.feedbacks.map((fb) => (
              <p className="m-0 mb-1 p-0 pr-2 ">
                <i className="text-secondary glyphicon glyphicon-leaf"></i>
                <span className="ml-3 text-13 text-georgia">
                  {fb.shortDescription + " - " + fb.description}
                </span>
                <i
                  className="ml-2 text-11 cur-pointer text-danger text-secondary glyphicon glyphicon-remove"
                  title="Delete this Feedback"
                  onClick={() => removeFeedback(c, fb)}
                ></i>
              </p>
            ))}
            <p className="m-0 mb-1 mt-2 p-0 pr-2">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text font-weight-bold text-georgia"
                    id="inputGroup-sizing-sm"
                  >
                    Teacher's Comment
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeHolder={c.teachersComment}
                  onChange={(e) => (c.teachersComment = e.target.value)}
                />
              </div>
            </p>
            <div className=" d-flex flex-column flex-wrap justify-content-start mt-2 pt-2 mr-1">
              <p className="text-secondary text-georgia text-13 font-weight-bold mt-0 mb-0 pt-0 pb-0 align-self-center">
                Add More Feedbacks for {c.description}:{" "}
              </p>
              <div className="d-flex flex-row w-100 justify-content-center mt-2 ">
                {getFeedbackForCat(c) ? (
                  getFeedbackForCat(c).length > 0 ? (
                    getFeedbackForCat(c).map((c1) => (
                      <div
                        className="w-22 background-lightgreen border rounded-10 shadow-sm h-25 cur-pointer text-10 text-uppercase text-georgia text-center text-align-center pt-1 ml-2 mr-2"
                        title="Add this Feedback"
                        onClick={() => addFeedback(c, c1)}
                      >
                        {c1.shortDescription}
                      </div>
                    ))
                  ) : (
                    <p className="text-georgia text-warning font-weight-bold">
                      No More feedbacks to add
                    </p>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
        ))}

        <div className="d-flex flex-column mt-3 pb-3 w-100 border text-center text-georgia text-darkgrey">
          <h4 className="text-primary font-weight-bold">
            Add More Feedback Categories
          </h4>
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {feedbackCategory.length > 0 ? (
              feedbackCategory.map((f) =>
                !isExist(f) ? (
                  <div
                    className="d-flex flex-column justify-content-center text-center mr-3 text-warning align-text-center w-20 h-50 background-blue text-uppercase rounded-5 cur-pointer"
                    onClick={() => addCategory(f)}
                  >
                    <p className="pt-0 pb-0 mt-0 mb-0 ">{f.description}</p>
                  </div>
                ) : (
                  <></>
                )
              )
            ) : (
              <div className="text-center text-dark text-11 font-weight-bold text-georgia w-50 h-40 background-lightgreen text-uppercase mt-3">
                No More Categories to Add
              </div>
            )}
          </div>
        </div>
      </Container>

      <div className="w-100 d-flex flex-row justify-content-end">
        <button className="btn btn-danger mr-4" onClick={() => cancelEditing()}>
          Cancel
        </button>
        <button className="btn btn-primary " onClick={() => updateFeedback()}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditFeedback;

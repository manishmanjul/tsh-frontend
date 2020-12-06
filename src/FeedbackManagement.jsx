import React, { useEffect, useState } from "react";
import FeedbackContanier from "./FeedbackContainer";
import Loading from "./Loading";
import Pagination from "./Pagination";
import StudentList from "./StudentList";

const FeedbackManagement = () => {
  const [student, setStudent] = useState({ id: "", name: "" });
  const [students, setStudents] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [page, setPage] = useState(1);
  const [feedbackSent, setFeedbackSent] = useState(0);

  const selected = (keyStud, studName) => {
    setStudent({ id: keyStud, name: studName });
    getSingleStudentFeedback(keyStud);
  };

  useEffect(() => {
    getStudentsFromServer();
  }, []);

  const getSingleStudentFeedback = async (studId) => {
    let reqObject = { id: studId };

    const response = await fetch("/tsh/feedback/getSingleStudentFeedback", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqObject),
    });

    const result = await response.json();
    setDataCount(result.topics.length);
    setFeedback(result.topics);
  };

  const getStudentsFromServer = async () => {
    const response = await fetch("/tsh/student/getStudents", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
    const tempStudets = await response.json();
    setStudents(tempStudets);
    setStudent({ id: tempStudets[2].id, name: tempStudets[2].name });
  };

  const getDisplayList = () => {
    let tempArr = [];
    for (var i = page * 2 - 2; i < page * 2; i++) {
      if (feedback.length >= i + 1) tempArr.push(feedback[i]);
    }
    return tempArr;
  };

  const deleteFeedback = async (topic) => {
    const deleteSubject = {
      studentBatchId: topic.providers[0].studentBatch.id,
      topicId: topic.id,
      teacherId: topic.providers[0].teacher.id,
    };
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      const response = await fetch("/tsh/feedback/deleteFeedback", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteSubject),
      });
      const resultMessage = await response.json();
      console.log(resultMessage.returnCode + " ::" + resultMessage.message);
      getSingleStudentFeedback(topic.providers[0].studentBatch.id);
    }
  };

  const emailFeedback = async (htmlElement, studId) => {
    var dataToSend = { element: htmlElement, studentBatchId: studId };
    console.log("Inside Feedbaxck Management");
    if (window.confirm("Are you sure you want to email this feedback?")) {
      const response = await fetch("/tsh/mail/send", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const resultMessage = await response.json();
      if (resultMessage.returnCode === 1) {
        setFeedbackSent(true);
      }
    }
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <div className="w-100 d-flex flex-row">
        <div className="w-20"></div>
        <div className="w-80 d-flex flex-column text-center">
          <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0">
            {student.name === ""
              ? "Feedback Management"
              : "Feedback Of " + student.name}
          </p>
        </div>
      </div>

      <div className="d-flex flex-row w-100 mt-3">
        <div className="w-20">
          <div className="text-high-tower text-uppercase letter-s1 text-center large-text  w-95 background-grad darkblue text-white  ml-3 rounded">
            Student List
          </div>
          <div className="w-100 scroll">
            {students.length > 0 ? (
              students.map((s) => (
                <StudentList
                  iAmActive={student.id}
                  keyStud={s.id}
                  name={s.name}
                  grade={"Grade " + s.grade + " - " + s.course}
                  callBack={selected}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <section className="w-80 ">
          {dataCount < 1 ? (
            student.id === "" ? (
              <Loading />
            ) : (
              <div className="pt-5 mt-5 w-100 text-center">
                <h1 className="text-darkgrey mt-5 pt-5 text-palatino">
                  No Feedback Found for {student.name}
                </h1>
              </div>
            )
          ) : (
            <div className="d-flex flex-row flex-wrap justify-content-around  text-dark mb-3">
              {getDisplayList().map((f) => (
                <FeedbackContanier
                  topic={f}
                  deleteFeedback={deleteFeedback}
                  emailFeedback={emailFeedback}
                />
              ))}
            </div>
          )}
          {feedbackSent ? (
            <div
              className="alert alert-success w-100"
              role="alert"
              onClick={() => setFeedbackSent(0)}
            >
              <h4 className="alert-heading">Feeedback Sent!</h4>
              An Email has been sent to the Parent.
            </div>
          ) : (
            <></>
          )}
          {dataCount > 0 ? (
            <Pagination dataCount={dataCount} perPage="2" callBack={setPage} />
          ) : (
            <></>
          )}
        </section>
      </div>
    </div>
  );
};

export default FeedbackManagement;

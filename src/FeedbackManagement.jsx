import React, { useEffect, useState } from "react";
import { createTrue } from "typescript";
import EditFeedback from "./EditFeedback";
import FeedbackContanier from "./FeedbackContainer";
import FeedbackManagementHeader from "./FeedbackManagementHeader";
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
  const [filters, setFilters] = useState({
    teacher: "",
    grade: "",
    namePattern: "",
  });
  const [edit, setEdit] = useState({ mode: false, editTopic: {} });

  const selected = (keyStud, studName) => {
    setStudent({ id: keyStud, name: studName });
    getSingleStudentFeedback(keyStud);
    setPage(1);
  };

  useEffect(() => {
    getStudentsFromServer();
  }, []);

  const getSingleStudentFeedback = async (studId) => {
    let reqObject = { id: studId };

    if (studId == "") return;
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/feedback/getSingleStudentFeedback",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqObject),
      }
    );

    var result = [];
    result = await response.json();

    let aggregateFeedbacks = [];

    for (var k = 0; k < result.topics.length; k++) {
      for (var l = 0; l < result.topics[k].providers.length; l++) {
        var tempFeedback = { ...result.topics[k] };
        tempFeedback.providers = [];
        tempFeedback.providers[0] = { ...result.topics[k].providers[l] };
        aggregateFeedbacks.push(tempFeedback);
      }
    }

    setDataCount(aggregateFeedbacks.length);
    setFeedback(aggregateFeedbacks);
  };

  useEffect(() => {
    if (edit.mode == false) getSingleStudentFeedback(student.id);
  }, [edit]);

  const callBackFilter = (filters) => {
    setFilters(filters);
  };

  const getStudentsFromServer = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/student/getStudents",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const tempStudets = await response.json();
    setStudents(tempStudets);
    setStudent({ id: tempStudets[4].id, name: tempStudets[4].name });
    getSingleStudentFeedback(tempStudets[4].id);
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
      topicProgressId: topic.providers[0].topicProgress.id,
    };
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      const response = await fetch(
        sessionStorage.getItem("proxy") + "/tsh/feedback/deleteFeedback",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deleteSubject),
        }
      );
      const resultMessage = await response.json();
      getSingleStudentFeedback(topic.providers[0].studentBatch.id);
    }
  };

  const emailFeedback = (htmlElement, studId) => {
    var dataToSend = { element: htmlElement, studentBatchId: studId };
    if (window.confirm("Are you sure you want to email this feedback?")) {
      fetch(sessionStorage.getItem("proxy") + "/tsh/mail/send", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      // const resultMessage = response.json();
      // if (resultMessage.returnCode === 1) {
      setFeedbackSent(true);
      // }
    }
  };

  const editFeedback = (topic) => {
    setEdit({ mode: true, editTopic: topic });
  };

  const getHeading = () => {
    if (edit.mode) return "Edit Feedback of " + student.name;
    else if (student.name === "") return "Feedback Management";
    else return "Feedback Of " + student.name;
  };

  const isFiltered = (b, idx) => {
    var teacherPassed = false;
    var gradePassed = false;
    var nameSearchPassed = false;

    if (
      filters.teacher == "Filter By Teacher" ||
      filters.teacher == "Admin" ||
      filters.teacher == "" ||
      filters.teacher == null
    )
      teacherPassed = true;
    else {
      if (b.teacher == filters.teacher) teacherPassed = true;
      else teacherPassed = false;
    }

    if (
      b.grade + "" == filters.grade ||
      filters.grade == "0" ||
      filters.grade == "" ||
      filters.grade == null
    ) {
      gradePassed = true;
    } else {
      gradePassed = false;
    }

    if (filters.namePattern == null || filters.namePattern == "")
      nameSearchPassed = true;
    else {
      if (b.name.toLowerCase().includes(filters.namePattern.toLowerCase())) {
        nameSearchPassed = true;
      } else nameSearchPassed = false;
    }
    if (teacherPassed && gradePassed && nameSearchPassed) {
      return true;
    } else return false;
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <FeedbackManagementHeader
        heading={getHeading()}
        setFilters={callBackFilter}
        showFilters="true"
      />

      <div className="d-flex flex-row w-100 border">
        <div className="w-20 ">
          <div className="text-high-tower text-uppercase letter-s1 text-center large-text  w-95 background-grad darkblue text-white  ml-3 rounded">
            Student List
          </div>
          <div
            className={edit.mode ? "w-100 scroll  disabled " : "w-100 scroll"}
          >
            {students.length > 0 ? (
              students.map((s, idx) =>
                isFiltered(s, idx) ? (
                  <StudentList
                    iAmActive={student.id}
                    keyStud={s.id}
                    name={s.name}
                    grade={"Grade " + s.grade + " - " + s.course}
                    callBack={selected}
                    disabled={edit.mode}
                  />
                ) : (
                  <></>
                )
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        <section className="w-72 ">
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
          ) : edit.mode ? (
            <div className="d-flex flex-row flex-wrap justify-content-around  text-dark mb-3">
              <EditFeedback setEditing={setEdit} editTopic={edit.editTopic} />
            </div>
          ) : (
            <div className="d-flex flex-row flex-wrap justify-content-around  text-dark mb-3">
              {getDisplayList().map((f) => (
                <FeedbackContanier
                  topic={f}
                  deleteFeedback={deleteFeedback}
                  emailFeedback={emailFeedback}
                  editFeedback={editFeedback}
                />
              ))}
              {dataCount > 0 ? (
                <Pagination
                  dataCount={dataCount}
                  perPage="2"
                  callBack={setPage}
                />
              ) : (
                <></>
              )}
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
        </section>
      </div>
    </div>
  );
};

export default FeedbackManagement;

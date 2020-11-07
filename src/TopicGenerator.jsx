import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import CourseAndSubject from "./CourseAndSubjects";
import ErrorPanel from "./ErrorPanel";

const TopicGenerator = () => {
  const [data, setData] = useState({
    termData: [],
    gradeData: [],
    courseData: [],
  });
  const [reset, setreset] = useState(false);
  const [msgpanel, setmsgpanel] = useState({
    heading: "",
    message: "",
    success: "",
    value: false,
  });

  const responseData = useRef({
    termResponse: [],
    gradeResponse: [],
    courseResponse: [],
  });

  const addRemoveTermToResponse = (term) => {
    let index = responseData.current.termResponse.findIndex(
      (t) => t.id === term.id
    );
    if (index > -1) removeTermFromResponse(term);
    else {
      let termResponse = [...responseData.current.termResponse, term];
      responseData.current = { ...responseData.current, termResponse };
    }
  };

  const addRemoveGradeToResponse = (grade) => {
    let index = responseData.current.gradeResponse.findIndex(
      (g) => g.id === grade.id
    );
    if (index > -1) removeGradeFromResponse(grade);
    else {
      let gradeResponse = [...responseData.current.gradeResponse, grade];
      responseData.current = { ...responseData.current, gradeResponse };
    }
  };

  const addRemoveCourseToResponse = (course) => {
    let index = responseData.current.courseResponse.findIndex(
      (c) => c.id === course.id
    );
    if (index > -1) removeCourseFromResponse(course);
    else {
      let courseResponse = [...responseData.current.courseResponse, course];
      responseData.current = { ...responseData.current, courseResponse };
    }
  };

  const removeTermFromResponse = (term) => {
    let termResponse = responseData.current.termResponse.filter(
      (t) => t.id !== term.id
    );
    responseData.current = { ...responseData.current, termResponse };
  };

  const removeGradeFromResponse = (grade) => {
    let gradeResponse = responseData.current.gradeResponse.filter(
      (g) => g.id !== grade.id
    );
    responseData.current = { ...responseData.current, gradeResponse };
  };

  const removeCourseFromResponse = (course) => {
    let courseResponse = responseData.current.courseResponse.filter(
      (c) => c.id !== course.id
    );
    responseData.current = { ...responseData.current, courseResponse };
  };

  const isCurrent = (term) => {
    if (term.current) {
      let index = responseData.current.termResponse.findIndex(
        (t) => t.id === term.id
      );
      if (index < 0) addRemoveTermToResponse(term);
      return "term btn btn-outline-secondary wp-60 rounded-10 mr-2 shadow-lg large-text text-helvetica font-weight-bolder active";
    } else {
      return "term btn btn-outline-secondary wp-60 rounded-10 mr-2 shadow-lg large-text text-helvetica font-weight-bolder";
    }
  };

  const callServer = async () => {
    console.log("Call server called");
    const response = await fetch("/tsh/topicmanager/getTopicData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });

    const tempData = await response.json();
    setData({
      termData: tempData.terms,
      gradeData: tempData.grades,
      courseData: tempData.course,
    });
  };

  const submitToServer = async () => {
    const dataToSend = responseData.current;
    const response = await fetch("/tsh/topicmanager/submit", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    // let responseMessage = response.json();
    let responseCode = await response.status;
    if (responseCode !== 200) {
      setmsgpanel({
        heading: "Server Error",
        message:
          "Internal Server Error. Topics could not be generated. Try again later...",
        success: false,
        value: true,
      });
    } else {
      console.log(response.json());
      setmsgpanel({
        heading: "Success",
        message:
          "All Topics were generated successfully.  Go to UPDAE TOPIC section to validate.",
        success: true,
        value: true,
      });
    }
  };

  const handleReset = () => {
    setData({ termData: [], gradeData: [], courseData: [] });
    setmsgpanel({
      heading: "",
      message: "",
      success: "",
      value: false,
    });
    responseData.current = {
      termResponse: [],
      gradeResponse: [],
      courseResponse: [],
    };
    setreset(!reset);
  };

  const handleSubmit = () => {
    let hdg = "";
    let msg = "";
    let suc = false;
    let val = false;

    if (responseData.current.termResponse.length === 0) {
      hdg = "Validation Error";
      msg = "No Term Selected. Please select a Term.";
      suc = false;
      val = true;
    } else if (responseData.current.gradeResponse.length === 0) {
      hdg = "Validation Error";
      msg = "No Grade Selected. Please select a Grade.";
      suc = false;
      val = true;
    } else if (responseData.current.courseResponse.length === 0) {
      hdg = "Validation Error";
      msg = "No Course Selected. Please select a Course.";
      suc = false;
      val = true;
    }

    if (val === true) {
      setmsgpanel({
        heading: hdg,
        message: msg,
        success: suc,
        value: val,
      });
    } else {
      submitToServer();
    }
  };

  useEffect(() => {
    callServer();
  }, [reset]);

  return (
    <section className="w-100 pl-3 d-flex flex-column">
      <div className="w-100 d-flex flex-row">
        <h3 className="font-weight-bolder text-Palatino text-lightgrey3 mr-3">
          Select Term :{" "}
        </h3>{" "}
        {data.termData ? (
          data.termData.map((term) => (
            <button
              type="button"
              key={term.term}
              className={"" + isCurrent(term)}
              data-toggle="button"
              aria-pressed="false"
              onClick={() => addRemoveTermToResponse(term)}
            >
              {term.term}
            </button>
          ))
        ) : (
          <></>
        )}
        <h3 className="font-weight-bolder text-Palatino text-lightgrey3 ml-5 mr-3">
          Select Grade :{" "}
        </h3>{" "}
        <div className="wp-300">
          {data.gradeData ? (
            data.gradeData.map((grade) => (
              <button
                type="button"
                key={grade.grade}
                className="term btn btn-secondary wp-50 hp-30  p-0 mr1 mb05 text-helvetica font-weight-bold"
                data-toggle="button"
                aria-pressed="false"
                onClick={() => addRemoveGradeToResponse(grade)}
              >
                {grade.grade}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="mt-4 mb-0 d-flex flex-row w-100">
        {msgpanel.value === true ? (
          <ErrorPanel
            heading={msgpanel.heading}
            message={msgpanel.message}
            success={msgpanel.success}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="w-100 d-flex flex-column">
        <h3 className="font-weight-bolder text-Palatino text-lightgrey3 mt-5 ">
          Select Subject :{" "}
        </h3>{" "}
        {data.courseData ? (
          data.courseData.map((sub) => (
            <CourseAndSubject
              key={sub.name}
              subject={sub}
              addRemove={addRemoveCourseToResponse}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="w-75 mt-3 mb-3 d-flex flex-row justify-content-center">
        <button
          type="button"
          className="btn btn-primary mr-4"
          onClick={() => handleSubmit()}
        >
          Generate Topics
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default TopicGenerator;

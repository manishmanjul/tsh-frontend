import React, { useEffect, useState, useRef } from "react";
import ErrorPanel from "./ErrorPanel";
import BootstrapTable from "react-bootstrap-table-next";
import Loading from "./Loading";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

const UpdateTopic = () => {
  const [data, setData] = useState({
    termData: [],
    gradeData: [],
    courseData: [],
  });
  const [reset, setreset] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [msgpanel, setmsgpanel] = useState({
    heading: "",
    message: "",
    success: "",
    value: false,
  });
  const [result, setResult] = useState([]);
  const selection = useRef({
    termS: [],
    gradeS: [],
    subjectS: [],
    categoryS: [],
  });

  const paginationProps = { showTotal: true };

  const addRemoveTermToResponse = (term, e) => {
    setLoaded(false);
    if (e.target.value === "false") {
      e.target.value = "true";
      selection.current.termS.push(term.term);
    } else {
      e.target.value = "false";
      var tempTerm = selection.current.termS.filter((t) => {
        if (t !== term.term) return t;
      });
      selection.current.termS = [...tempTerm];
    }
    doFilter();
  };

  const addRemoveGradeToResponse = (grade, e) => {
    setLoaded(false);
    if (e.target.value === "false") {
      e.target.value = "true";
      selection.current.gradeS.push(grade.grade);
    } else {
      e.target.value = "false";
      var tempGrade = selection.current.gradeS.filter((g) => {
        if (g !== grade.grade) return g;
      });
      selection.current.gradeS = [...tempGrade];
    }
    doFilter();
  };

  const addRemoveSubject = (subject, e) => {
    setLoaded(false);
    if (e.target.value === "false") {
      e.target.value = "true";
      selection.current.subjectS.push(subject);
    } else {
      e.target.value = "false";
      var tempSubject = selection.current.subjectS.filter((s) => {
        if (s !== subject) return s;
      });
      selection.current.subjectS = [...tempSubject];
    }
    doFilter();
  };

  const addRemoveCategory = (cat, e) => {
    setLoaded(false);
    if (e.target.value === "false") {
      e.target.value = "true";
      selection.current.categoryS.push(cat);
    } else {
      e.target.value = "false";
      var tempCategory = selection.current.categoryS.filter((c) => {
        if (c !== cat) return c;
      });
      selection.current.categoryS = [...tempCategory];
    }
    doFilter();
  };

  const callServer = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/topicmanager/getTopicData",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );

    const tempData = await response.json();
    setData({
      termData: tempData.terms,
      gradeData: tempData.grades,
      courseData: tempData.course,
    });
  };

  const getTopicsFromServer = async () => {
    if (data.termData.length > 0) {
      const response = await fetch(
        sessionStorage.getItem("proxy") + "/tsh/topicmanager/getAllTopics",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
        }
      );
      const tempTopics = await response.json();
      setTopics(tempTopics);
      var currenterm = data.termData.filter((t) => t.current === true);
      selection.current.termS.push(currenterm[0].term);
      let tempResult = tempTopics.filter((t) => {
        if (selection.current.termS.indexOf(parseInt(t.term)) > -1) return t;
      });
      setResult(tempResult);
      setLoaded(true);
    }
  };

  const isCurrent = (term) => {
    if (term.current) {
      return "term btn btn-outline-secondary wp-60 rounded-10 mr-2 shadow-lg large-text text-helvetica font-weight-bolder active";
    } else {
      return "term btn btn-outline-secondary wp-60 rounded-10 mr-2 shadow-lg large-text text-helvetica font-weight-bolder";
    }
  };

  const doFilter = () => {
    let tempResult = topics.filter(
      (t) => selection.current.termS.indexOf(parseInt(t.term)) > -1
    );

    if (selection.current.gradeS.length > 0) {
      tempResult = tempResult.filter(
        (g) => selection.current.gradeS.indexOf(parseInt(g.grade)) > -1
      );
    }

    let course = [];
    if (selection.current.subjectS.length > 0) {
      selection.current.subjectS.map((s) => {
        course.push(s);
        selection.current.categoryS.map((c) => {
          course.push(s + " " + c);
        });
      });
    } else {
      selection.current.categoryS.map((c) => {
        course.push("English " + c);
        course.push("Maths " + c);
        course.push("GA " + c);
      });
    }

    if (course.length > 0) {
      tempResult = tempResult.filter((c) => course.indexOf(c.course) > -1);
    }

    setResult(tempResult);
    setLoaded(true);
  };

  useEffect(() => {
    callServer();
  }, [reset]);

  useEffect(() => {
    getTopicsFromServer();
  }, [data]);

  const cols = [
    {
      dataField: "grade",
      text: "Grade",
      headerStyle: {
        background: "grey",
        color: "white",
        width: "90px",
      },
      style: {
        textAlign: "center",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
      editor: {
        type: Type.SELECT,
        text: "Change Grade",
        options: [
          {
            value: "3",
            label: "3",
          },
          {
            value: "4",
            label: "4",
          },
          {
            value: "5",
            label: "5",
          },
          {
            value: "6",
            label: "6",
          },
          {
            value: "7",
            label: "7",
          },
          {
            value: "8",
            label: "8",
          },
          {
            value: "9",
            label: "9",
          },
          {
            value: "10",
            label: "10",
          },
          {
            value: "11",
            label: "11",
          },
          {
            value: "12",
            label: "12",
          },
        ],
      },
    },
    {
      dataField: "course",
      text: "Course",
      headerStyle: { background: "grey", color: "white", width: "130px" },
      style: {
        textAlign: "center",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
      editor: {
        type: Type.SELECT,
        text: "Change Course",
        options: [
          {
            value: "English",
            label: "English",
          },
          {
            value: "English S",
            label: "English S",
          },
          {
            value: "English A",
            label: "English A",
          },
          {
            value: "English B",
            label: "English B",
          },
          {
            value: "English E",
            label: "English E",
          },
          {
            value: "Maths",
            label: "Maths",
          },
          {
            value: "Maths S",
            label: "Maths S",
          },
          {
            value: "Maths A",
            label: "Maths A",
          },
          {
            value: "Maths B",
            label: "Maths B",
          },
          {
            value: "Maths E",
            label: "Maths E",
          },
          {
            value: "GA",
            label: "GA",
          },
          {
            value: "GA S",
            label: "GA S",
          },
          {
            value: "GA A",
            label: "GA A",
          },
          {
            value: "GA B",
            label: "GA B",
          },
          {
            value: "GA E",
            label: "GA E",
          },
        ],
      },
    },
    {
      dataField: "term",
      text: "Term",
      headerStyle: { background: "grey", color: "white", width: "80px" },
      style: {
        textAlign: "center",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
      editor: {
        type: Type.SELECT,
        text: "Change Term",
        options: [
          {
            value: "1",
            label: "1",
          },
          {
            value: "2",
            label: "2",
          },
          {
            value: "3",
            label: "3",
          },
          {
            value: "4",
            label: "4",
          },
        ],
      },
    },
    {
      dataField: "week",
      text: "Week",
      headerStyle: { background: "grey", color: "white", width: "90px" },
      style: {
        textAlign: "center",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
      editor: {
        type: Type.SELECT,
        text: "Change Week",
        options: [
          {
            value: "1",
            label: "1",
          },
          {
            value: "2",
            label: "2",
          },
          {
            value: "3",
            label: "3",
          },
          {
            value: "4",
            label: "4",
          },
          {
            value: "5",
            label: "5",
          },
          {
            value: "6",
            label: "6",
          },
          {
            value: "7",
            label: "7",
          },
          {
            value: "8",
            label: "8",
          },
          {
            value: "9",
            label: "9",
          },
          {
            value: "10",
            label: "10",
          },
        ],
      },
    },
    {
      dataField: "description",
      text: "Description",
      headerStyle: { background: "grey", color: "white" },
      style: {
        textAlign: "left",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
    },
    {
      dataField: "chapter",
      text: "Chapter",
      headerStyle: { background: "grey", color: "white" },
      style: {
        textAlign: "left",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
    },
    {
      dataField: "topicName",
      text: "Topic Name",
      headerStyle: { background: "grey", color: "white" },
      style: {
        textAlign: "left",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
    },
    {
      dataField: "active",
      text: "Is Active?",
      headerStyle: { background: "grey", color: "white", width: "100px" },
      style: {
        textAlign: "center",
        fontFamily: "Verdena",
        fontSize: 13,
      },
      headerAlign: "center",
      editor: {
        type: Type.SELECT,
        text: "Change Week",
        options: [
          {
            value: "Y",
            label: "Yes",
          },
          {
            value: "N",
            label: "No",
          },
        ],
      },
    },
  ];

  const submitToServer = async (dataToSend) => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/topicmanager/update",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
    let responseCode = await response.status;
    return responseCode;
  };

  const beforeSave = async (oldValue, newValue, row, column, done) => {
    var ans = window.confirm(
      "Do you really want to change the value of this field?"
    );
    if (ans === true) {
      done();
    } else {
      done(false);
    }
    return { async: true };
  };

  const afterSave = (oldValue, newValue, row, column) => {
    var responseCode = submitToServer(row);
  };

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    beforeSaveCell: beforeSave,
    afterSaveCell: afterSave,
  });

  return (
    <section className="w-100 pl-3 d-flex flex-column">
      <div className="w-100 d-flex flex-row">
        <h3 className="font-weight-bolder text-Palatino text-lightgrey3 mr-3">
          Term :{" "}
        </h3>{" "}
        {data.termData ? (
          data.termData.map((term) => (
            <button
              type="button"
              key={term.term}
              className={"" + isCurrent(term)}
              data-toggle="button"
              aria-pressed="false"
              value={term.current}
              onClick={(e) => addRemoveTermToResponse(term, e)}
            >
              {term.term}
            </button>
          ))
        ) : (
          <></>
        )}
        <h3 className="font-weight-bolder text-Palatino text-lightgrey3 ml-3 mr-3">
          Grade :{" "}
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
                value="false"
                onClick={(e) => addRemoveGradeToResponse(grade, e)}
              >
                {grade.grade}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
        <h3 className="font-weight-bolder text-Palatino text-lightgrey3 mr-3">
          Subject :{" "}
        </h3>{" "}
        <div className="d-flex flex-column">
          <div className="d-flex flex-row wp-300 p-0 m-0">
            <button
              type="button"
              key="English"
              className="term btn btn-secondary wp-100 hp-30  p-0 mr1 mb05 text-helvetica font-weight-bold"
              data-toggle="button"
              aria-pressed="false"
              value="false"
              onClick={(e) => addRemoveSubject("English", e)}
            >
              English
            </button>
            <button
              type="button"
              key="Maths"
              className="term btn btn-secondary wp-100 hp-30  p-0 mr1 mb05 text-helvetica font-weight-bold"
              data-toggle="button"
              aria-pressed="false"
              value="false"
              onClick={(e) => addRemoveSubject("Maths", e)}
            >
              Maths
            </button>
            <button
              type="button"
              key="GA"
              className="term btn btn-secondary wp-100 hp-30  p-0 mr1 mb05 text-helvetica font-weight-bold"
              data-toggle="button"
              aria-pressed="false"
              value="false"
              onClick={(e) => addRemoveSubject("GA", e)}
            >
              General Ability
            </button>
          </div>
          <div className="d-flex flex-row">
            {data.courseData ? (
              data.courseData
                .filter((m) => m.shortDesc !== "Std")
                .map((sub) => (
                  <button
                    type="button"
                    key={sub.shortDesc}
                    className="term btn btn-secondary wp-75 hp-30  p-0 mr1 mb05 text-helvetica font-weight-bold"
                    data-toggle="button"
                    aria-pressed="false"
                    value="false"
                    onClick={(e) => addRemoveCategory(sub.shortDesc, e)}
                  >
                    {sub.shortDesc}
                  </button>
                ))
            ) : (
              <></>
            )}
          </div>
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
      <div className="w-95">
        {loaded ? (
          <BootstrapTable
            keyField="id"
            data={result}
            columns={cols}
            pagination={paginationFactory(paginationProps)}
            cellEdit={cellEdit}
          />
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default UpdateTopic;

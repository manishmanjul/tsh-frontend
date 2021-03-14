import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import "react-dropdown/style.css";

const DataImportResult = () => {
  const [data, setData] = useState({
    importItems: [],
    stats: [],
    descriptions: [],
    teachers: [],
    weekdays: [],
    subjects: [],
    grades: [],
    importDate: "",
    totalItems: 0,
  });

  const [edit, setEdit] = useState({
    id: 0,
    name: "",
    grade: "",
    subject: "",
    weekday: "",
    start: "",
    teacher: "",
  });

  const [filter, setFilter] = useState({
    status: "",
    description: "",
    teacher: "",
    weekday: "",
    subject: "",
    grade: "",
  });

  useEffect(() => {
    callServer();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const clearFilters = () => {
    setFilter({
      status: "",
      description: "",
      teacher: "",
      weekday: "",
      subject: "",
      grade: "",
    });
  };

  const escFunction = (event) => {
    if (event.keyCode == 27)
      setEdit({
        id: 0,
        name: "",
        grade: "",
        subject: "",
        weekday: "",
        start: "",
        teacher: "",
      });
  };

  const editClicked = (item) => {
    setEdit({
      id: item.id,
      name: item.name,
      grade: item.grade,
      subject: item.subject,
      weekday: item.batchDate,
      start: item.batchStartTime,
      teacher: item.teacher,
    });
  };

  const importClicked = async (item) => {
    var localItem = {};
    if (edit.id == 0) {
      localItem = {
        id: item.id,
        name: item.name,
        grade: item.grade,
        subject: item.subject,
        weekday: item.batchDate,
        start: item.batchStartTime + ":00",
        teacher: item.teacher,
      };
    } else {
      localItem = { ...edit };
      localItem.start = localItem.start + ":00";
    }

    if (
      window.confirm(
        "Do you want to Re-import this item -" +
          "Item id: " +
          localItem.id +
          " \n" +
          "Name : " +
          localItem.name +
          " \n" +
          "Subject :" +
          localItem.subject +
          "\n Grade :" +
          localItem.grade +
          "\n Start Time :" +
          localItem.start +
          "\n Batch Date :" +
          localItem.weekday +
          "\n Teacher : " +
          localItem.teacher
      )
    ) {
      const response = await fetch(
        sessionStorage.getItem("proxy") + "/tsh/import/reImport",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localItem),
        }
      );

      setData({
        importItems: [],
        stats: [],
        descriptions: [],
        teachers: [],
        weekdays: [],
        subjects: [],
        grades: [],
        importDate: "",
        totalItems: 0,
      });
      callServer();
    }
    setEdit({
      id: 0,
      name: "",
      grade: "",
      subject: "",
      weekday: "",
      start: "",
      teacher: "",
    });
  };

  const callServer = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/import/getImportedItemList/0",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setData(result);
  };

  const isFiltered = (d) => {
    var statusPass = false;
    var descriptionPass = false;
    var teacherPass = false;
    var weekdayPass = false;
    var gradePass = false;
    var subjectPass = false;

    if (
      filter.status != "" &&
      filter.status != "STATUS" &&
      d.status != filter.status
    ) {
      statusPass = true;
    }

    if (
      filter.teacher != "" &&
      filter.teacher != "TEACHER" &&
      d.teacher != filter.teacher
    ) {
      teacherPass = true;
    }

    if (
      filter.description != "" &&
      filter.description != "DESCRIPTION" &&
      d.message != filter.description
    ) {
      descriptionPass = true;
    }

    if (
      filter.weekday != "" &&
      filter.weekday != "WEEKDAY" &&
      d.weekday != filter.weekday
    ) {
      weekdayPass = true;
    }

    if (
      filter.subject != "" &&
      filter.subject != "SUBJECT" &&
      d.subject != filter.subject
    ) {
      subjectPass = true;
    }

    if (
      filter.grade != "" &&
      filter.grade != "GRADE" &&
      d.grade != filter.grade
    ) {
      gradePass = true;
    }

    if (
      statusPass ||
      descriptionPass ||
      teacherPass ||
      weekdayPass ||
      gradePass ||
      subjectPass
    )
      return true;
    else return false;
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-items-center align-content-center">
      <div className="d-flex flex-row justify-content-start text-dark w-100 h-50 pt-1 pb-1 mt-0 mb-1">
        <div className="h-100 w-15 ml-1 mr-2 d-flex flex-column border-greyplus1 rounded shadow">
          <p className="pb-0 mt-0 mb-0 text-center text-high-tower medium-plus-text font-weight-bold background-grad darkblue text-white">
            Import Date
          </p>
          <p className="pb-1 pt-1 mt-0 mb-0 text-13 text-helvetica text-center">
            {data.importDate !== "" ? data.importDate : "--"}
          </p>
        </div>
        <div className="h-100 w-15 ml-1 mr-2 d-flex flex-column border-greyplus1 rounded shadow">
          <p className="pb-0 mt-0 mb-0 text-center text-high-tower medium-plus-text font-weight-bold background-grad darkblue text-white">
            Total Items
          </p>
          <p className="pb-1 pt-1 mt-0 mb-0 text-13 text-helvetica text-center">
            {data.totalItems > 0 ? data.totalItems : 0}
          </p>
        </div>
        <div className="h-100 w-15 ml-1 mr-2 d-flex flex-column border-greyplus1 rounded shadow">
          <p className="pb-0 mt-0 mb-0 text-center text-high-tower medium-plus-text font-weight-bold background-grad darkblue text-white">
            Pass/Fail/Skip
          </p>
          <p className="pb-1 pt-1 mt-0 mb-0 text-13 text-helvetica text-center">
            <span className="text-success font-weight-bold">
              {data.pass + "/ "}
            </span>
            <span className="text-danger font-weight-bold">
              {data.fail + "/ "}
            </span>
            <span className="text-secondary font-weight-bold">{data.skip}</span>
          </p>
        </div>
        {data.stats.length > 0 ? (
          data.stats.map((s) =>
            s.status !== 4 ? (
              <div className="h-100 w-15 ml-1 mr-2 d-flex flex-column border-greyplus1 rounded shadow">
                <p className="pb-0 mt-0 mb-0 text-center text-high-tower medium-plus-text font-weight-bold background-grad darkblue text-white">
                  {s.importDesc}
                </p>
                <p className="pb-1 pt-1 mt-0 mb-0 text-13 text-helvetica text-center">
                  {s.count}
                </p>
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
      </div>

      {data.importItems.length > 0 ? (
        <div className="d-flex flex-column w-100 justify-content-center mt-1 pb-5">
          <div className="w-100 d-flex flex-row justify-content-start stick-on-top">
            <div className="d-flex flex-row w-93 justify-content-center text-dark pr-1 pl-1">
              <p className="text-high-tower mb-0 text-white text-12 text-center background-dark-blue w-2p5 ml-4 pt-1 pb-1 right-border-white1px">
                S.N
              </p>
              <p className="text-high-tower mb-0 text-white text-12 text-center background-dark-blue w-15 pt-1 pb-1 right-border-white1px">
                NAME
              </p>
              <select
                className="text-high-tower mb-0 text-white text-12 text-uppercase background-dark-blue w-5 pt-1 pb-1 right-border-white1px"
                onChange={(e) =>
                  setFilter({ ...filter, grade: e.target.value })
                }
              >
                {FileReader.grade == "" ? (
                  <option
                    className="text-12 bg-white text-dark border"
                    selected
                  >
                    GRADE
                  </option>
                ) : (
                  <option className="text-12 bg-white text-dark border">
                    GRADE
                  </option>
                )}
                {data.grades.length > 0 ? (
                  data.grades.map((g) => (
                    <option className="text-12 bg-white text-dark border">
                      {g}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <select
                className="text-high-tower mb-0 text-white text-12 text-uppercase background-dark-blue w-10 pt-1 pb-1 right-border-white1px"
                onChange={(e) =>
                  setFilter({ ...filter, subject: e.target.value })
                }
              >
                {FileReader.subject == "" ? (
                  <option
                    className="text-12 bg-white text-dark border"
                    selected
                  >
                    SUBJECT
                  </option>
                ) : (
                  <option className="text-12 bg-white text-dark border">
                    SUBJECT
                  </option>
                )}
                {data.subjects.length > 0 ? (
                  data.subjects.map((s) => (
                    <option className="text-12 bg-white text-dark border">
                      {s}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <select
                className="text-high-tower mb-0 text-white text-12 text-uppercase background-dark-blue w-10 pt-1 pb-1 right-border-white1px"
                onChange={(e) =>
                  setFilter({ ...filter, weekday: e.target.value })
                }
              >
                {filter.weekday == "" ? (
                  <option
                    className="text-12 bg-white text-dark border"
                    selected
                  >
                    WEEKDAY
                  </option>
                ) : (
                  <option className="text-12 bg-white text-dark border">
                    WEEKDAY
                  </option>
                )}
                {data.weekdays.length > 0 ? (
                  data.weekdays.map((w) => (
                    <option className="text-12 bg-white text-dark border">
                      {w}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <p className="text-high-tower mb-0 text-white text-12 text-center background-dark-blue w-8 pt-1 pb-1 right-border-white1px">
                START
              </p>
              <select
                className="text-high-tower mb-0 text-white text-12 text-uppercase background-dark-blue w-8 pt-1 pb-1 right-border-white1px"
                onChange={(e) =>
                  setFilter({ ...filter, teacher: e.target.value })
                }
              >
                {filter.teacher == "" ? (
                  <option
                    className="text-12 bg-white text-dark border"
                    selected
                  >
                    TEACHER
                  </option>
                ) : (
                  <option className="text-12 bg-white text-dark border">
                    TEACHER
                  </option>
                )}
                {data.teachers.length > 0 ? (
                  data.teachers.map((t) => (
                    <option className="text-12 bg-white text-dark border">
                      {t}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <p className="text-high-tower mb-0 text-white text-12 text-center background-dark-blue w-10 pt-1 pb-1 right-border-white1px">
                IMPORT DATE
              </p>
              <p className="text-high-tower mb-0 text-white text-12 text-center background-dark-blue w-5 pt-1 pb-1 right-border-white1px">
                CYCLE
              </p>
              <select
                className="text-high-tower mb-0 text-white text-12 text-uppercase background-dark-blue w-20 pt-1 pb-1 right-border-white1px"
                onChange={(e) =>
                  setFilter({ ...filter, description: e.target.value })
                }
              >
                {filter.description == "" ? (
                  <option
                    className="text-12 bg-white text-dark border"
                    selected
                  >
                    DESCRIPTION
                  </option>
                ) : (
                  <option className="text-12 bg-white text-dark border">
                    DESCRIPTION
                  </option>
                )}

                {data.descriptions.length > 0 ? (
                  data.descriptions.map((d) => (
                    <option className="text-12 bg-white text-dark border">
                      {d}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <select
                className="text-high-tower mb-0 text-white text-12 text-uppercase background-dark-blue w-8 pt-1 pb-1 right-border-white1px"
                onChange={(e) =>
                  setFilter({ ...filter, status: e.target.value })
                }
              >
                {filter.status == "" ? (
                  <option
                    className="text-12 bg-white text-dark border"
                    selected
                  >
                    STATUS
                  </option>
                ) : (
                  <option className="text-12 bg-white text-dark border">
                    STATUS
                  </option>
                )}
                <option className="text-12 bg-white text-dark border">
                  Success
                </option>
                <option className="text-12 bg-white text-dark border">
                  Failed
                </option>
                <option className="text-12 bg-white text-dark border">
                  Skipped
                </option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-info ml-4"
              onClick={() => clearFilters()}
            >
              Clear
            </button>
          </div>

          {data.importItems.map((d, idx) =>
            !isFiltered(d) ? (
              <div className="w-100 d-flex flex-row justify-content-start">
                <div className="d-flex flex-row text-verdena text-darkgrey w-93 justify-content-center pr-1 pl-1 pb-0 ">
                  <p className="text-12 text-center mb-0 w-2p5 pt-1 pb-1 ml-4 border-grey-light">
                    {idx + 1}
                  </p>
                  {edit.id != d.id ? (
                    <p className="text-12 mb-0 w-15 pt-1 pb-1 pl-2 border-grey-light-right-bottom">
                      {d.name}
                    </p>
                  ) : (
                    <input
                      type="text"
                      defaultValue={d.name}
                      className="w-15 rounded-5 background-grey-plus"
                      onChange={(e) =>
                        setEdit({ ...edit, name: e.target.value })
                      }
                    />
                  )}
                  {edit.id != d.id ? (
                    <p className="text-12 text-center mb-0 w-5 pt-1 pb-1 border-grey-light-right-bottom ">
                      {d.grade}
                    </p>
                  ) : (
                    <input
                      type="text"
                      defaultValue={d.grade}
                      className="w-5 rounded-5 background-grey-plus"
                      onChange={(e) =>
                        setEdit({ ...edit, grade: e.target.value })
                      }
                    />
                  )}
                  {edit.id != d.id ? (
                    <p className="text-12 text-center mb-0 w-10 pt-1 pb-1 border-grey-light-right-bottom">
                      {d.subject}
                    </p>
                  ) : (
                    <input
                      type="text"
                      defaultValue={d.subject}
                      className="w-10 rounded-5 background-grey-plus"
                      onChange={(e) =>
                        setEdit({ ...edit, subject: e.target.value })
                      }
                    />
                  )}
                  {edit.id != d.id ? (
                    <p className="text-12 text-center mb-0 w-10 pt-1 pb-1 border-grey-light-right-bottom">
                      {d.weekday}
                    </p>
                  ) : (
                    <input
                      type="text"
                      defaultValue={d.batchDate}
                      className="w-10 rounded-5 background-grey-plus"
                      onChange={(e) =>
                        setEdit({ ...edit, weekday: e.target.value })
                      }
                    />
                  )}
                  {edit.id != d.id ? (
                    <p className="text-12 text-center mb-0 w-8 pt-1 pb-1 border-grey-light-right-bottom">
                      {d.batchStartTime}
                    </p>
                  ) : (
                    <input
                      type="text"
                      defaultValue={d.batchStartTime}
                      className="w-8 rounded-5 background-grey-plus"
                      onChange={(e) =>
                        setEdit({ ...edit, start: e.target.value })
                      }
                    />
                  )}
                  {edit.id != d.id ? (
                    <p className="text-12 mb-0 w-8 pt-1 pb-1 pl-2 border-grey-light-right-bottom">
                      {d.teacher}
                    </p>
                  ) : (
                    <input
                      type="text"
                      defaultValue={d.teacher}
                      className="w-8 rounded-5 background-grey-plus"
                      onChange={(e) =>
                        setEdit({ ...edit, teacher: e.target.value })
                      }
                    />
                  )}
                  <p className="text-12 text-center mb-0 w-10 pt-1 pb-1 border-grey-light-right-bottom">
                    {d.importDate}
                  </p>
                  <p className="text-12 text-center mb-0 w-5 pt-1 pb-1 border-grey-light-right-bottom ">
                    {d.cycle}
                  </p>
                  <p className="text-12 mb-0 w-20 pt-1 pb-1 pl-2 border-grey-light-right-bottom">
                    {d.message}
                  </p>

                  <p
                    className={
                      d.status == "Success"
                        ? "text-12 text-center mb-0 w-8 pt-1 pb-1 border-grey-light-right-bottom bg-success text-white"
                        : d.status == "Failed"
                        ? "text-12 text-center mb-0 w-8 pt-1 pb-1 border-grey-light-right-bottom bg-danger text-white"
                        : "text-12 text-center mb-0 w-8 pt-1 pb-1 border-grey-light-right-bottom bg-warning text-white"
                    }
                  >
                    {d.status}
                  </p>
                </div>
                {d.status == "Failed" ? (
                  <div className="d-flex flex-row pl-2 ml-3">
                    {edit.id != d.id ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary mr-1"
                        title="Edit to correct data for this row item"
                        onClick={() => editClicked(d)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary mr-1"
                        title="Edit to correct data for this row item"
                        onClick={() =>
                          setEdit({
                            id: 0,
                            name: "",
                            grade: "",
                            subject: "",
                            weekday: "",
                            start: "",
                            teacher: "",
                          })
                        }
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary mr-1"
                      title="Import this item again"
                      onClick={() => importClicked(d)}
                    >
                      Import
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DataImportResult;

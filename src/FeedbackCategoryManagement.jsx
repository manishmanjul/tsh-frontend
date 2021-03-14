import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AppList from "./AppList";
import FeedbackManagementHeader from "./FeedbackManagementHeader";
import NewFeedback from "./NewFeedback";
import NewFeedbackCategory from "./NewFeedbackCategory";

const FeedbackCategoryManagement = () => {
  const [grades, setGrades] = useState([]);
  const [selectGrade, setSelectGrade] = useState({ id: "", grade: "" });
  const [feedbackCat, setFeedbackCat] = useState([]);
  const [selection, setSelection] = useState({
    default: "",
    catName: "",
    grade: "",
    feedback: "",
    showFeedback: false,
  });
  const [feedbackItems, setFeedbackItems] = useState([]);

  const selected = (listKey, myGrade) => {
    setSelectGrade({ id: listKey, grade: myGrade });
    fetchFeedbackCategories(myGrade);
    setSelection({
      default: "",
      grade: "",
      catName: "",
      feedback: "",
      showFeedback: false,
    });
    setFeedbackItems([]);
  };

  const refresh = async (yes, source) => {
    var tempData = [];
    if (yes) {
      tempData = await fetchFeedbackCategories(selectGrade.grade);
    }
    var selectedCat =
      selection.default == "" ? selection.grade : selection.default;
    for (var i = 0; i < tempData.length; i++) {
      if (tempData[i].id == selectedCat) {
        setFeedbackItems(tempData[i].feedbacks);
        setSelection({ ...selection }, { showFeedback: true });
        break;
      }
    }
    document.getElementById(source).click();
  };

  const feedbackCategorySelect = (dId, gId, fId, categoryName, feedbackArr) => {
    setSelection({
      default: dId,
      grade: gId,
      catName: categoryName,
      feedback: fId,
      showFeedback: true,
    });
    setFeedbackItems(feedbackArr);
  };

  const isDefaultCategoryActive = (id, isActive) => {
    var returnVal = "";
    if (id === selection.default) returnVal = "active";
    if (isActive === false)
      returnVal = returnVal + " background-grey text-lightgrey2";

    return returnVal;
  };

  const isGradeCategoryActive = (id, isActive) => {
    var returnVal = "";
    if (id === selection.grade) returnVal = "active";
    if (isActive === false)
      returnVal = returnVal + " background-grey text-lightgrey2";

    return returnVal;
  };

  const isFeedbackActive = (id, isActive) => {
    var returnVal = "";
    if (id === selection.feedback) returnVal = "active";
    if (isActive === false)
      returnVal = returnVal + " background-grey text-lightgrey2";

    return returnVal;
  };

  const fetchFeedbackCategories = async (myGrade) => {
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/feedback/category/" +
        myGrade +
        "/" +
        "false",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const catData = await response.json();

    setFeedbackCat(catData);
    return catData;
  };

  const getAllGrades = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tshServices/getAllGrades",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setSelectGrade({ id: result[0].id, grade: result[0].grade });
    fetchFeedbackCategories(result[0].grade);
    setGrades(result);
  };

  const changeState = async (reqId, item) => {
    const datatosend = {
      id: reqId,
    };
    if (
      window.confirm(
        "Are you sure you want to change the status of this feedback Item?"
      )
    ) {
      var url = "";
      if (item === "cat") url = "/tsh/feedback/toggleFeedbackCategoryState";
      else url = "/tsh/feedback/toggleFeedbackState";
      const response = await fetch(sessionStorage.getItem("proxy") + url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datatosend),
      });
      if (response.status === 202) {
        var tempData = await fetchFeedbackCategories(selectGrade.grade);

        var selectedCat =
          selection.default == "" ? selection.grade : selection.default;
        for (var i = 0; i < tempData.length; i++) {
          if (tempData[i].id == selectedCat) {
            setFeedbackItems(tempData[i].feedbacks);
            setSelection({ ...selection }, { showFeedback: true });
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    getAllGrades();
  }, []);

  return (
    <Accordion className="w-100">
      <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center text-dark">
        <FeedbackManagementHeader
          heading="Manage Feedback Categories"
          showFilters="false"
        />

        <div className="d-flex flex-row w-100 pt-1">
          <div className="w-20 ">
            <p className="w-100 text-white text-uppercase text-13 font-weight-bold text-high-tower text-center letter-s1p5 background-grad darkblue border p-0 m-0 rounded-sm">
              Grades
            </p>
            {grades.length > 0 ? (
              grades.map((g, index, arr) => (
                <AppList
                  iAmActive={selectGrade.id}
                  listKey={g.id}
                  grade={g.grade}
                  item={"Grade " + g.grade}
                  description={"Year " + g.grade}
                  callBack={selected}
                />
              ))
            ) : (
              <></>
            )}
          </div>

          <div className="w-100 left-border-grey">
            {feedbackCat.length > 0 ? (
              feedbackCat[0].grade === 0 ? (
                <section className="d-flex flex-column text-center content-center w-100 align-items-center justify-content-center mt-2">
                  <h3 className="text-high-tower">Default Feedback Category</h3>
                  <div
                    id="header"
                    className="w-75 m-0 p-0 d-flex flex-row justify-content-center background-grad darkblue text-center text-georgia text-white large-text border"
                  >
                    <span className="w-10 right-border-white1px">Id</span>
                    <span className="w-70 right-border-white1px">
                      Category Description
                    </span>
                    <div className="w-20 d-flex flex-row justify-content-center">
                      Active Status
                    </div>
                  </div>
                  {feedbackCat.map((fc) => (
                    <div
                      id={fc.id}
                      className={
                        "w-75 m-0 p-0 d-flex flex-row justify-content-center text-center text-Palatino large-text left-border-grey bottom-border-grey right-border-grey1px myGrid " +
                        isDefaultCategoryActive(fc.id, fc.active)
                      }
                      tabIndex="1"
                      onClick={() =>
                        feedbackCategorySelect(
                          fc.id,
                          selection.grade,
                          selection.feedback,
                          fc.description,
                          fc.feedbacks
                        )
                      }
                    >
                      <span className="w-10 right-border-grey1px">{fc.id}</span>
                      <span className="w-70 right-border-grey1px">
                        {fc.description}
                      </span>
                      <div className="w-20 d-flex flex-row justify-content-center">
                        <button
                          type="button"
                          className={
                            fc.active
                              ? "btn btn-outline-success btn-sm rounded"
                              : "btn btn-outline-danger btn-sm rounded"
                          }
                          onClick={() => changeState(fc.id, "cat")}
                        >
                          {fc.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                  ))}
                  <Accordion.Toggle
                    as="button"
                    type="button"
                    className="mt-2 mb-1 btn btn-sm btn-outline-primary"
                    variant="link"
                    eventKey="1"
                    id="Default"
                  >
                    Add Default Category
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1" className="p-0 m-0 w-75">
                    <NewFeedbackCategory
                      grade="0"
                      refresh={refresh}
                      source="Default"
                    />
                  </Accordion.Collapse>
                  <h3 className="text-high-tower mt-3">
                    Grade {selectGrade.grade} Feedback Category
                  </h3>
                  <div
                    id="header"
                    className="w-75 m-0 p-0 d-flex flex-row justify-content-center background-grad darkblue text-center text-georgia text-white large-text border"
                  >
                    <span className="w-10 right-border-white1px">Id</span>
                    <span className="w-70 right-border-white1px">
                      Category Description
                    </span>
                    <div className="w-20 d-flex flex-row justify-content-center">
                      Active Status
                    </div>
                  </div>
                  <div
                    id="0"
                    className="w-75 m-0 p-0 d-flex flex-row justify-content-center text-center text-Palatino large-text left-border-grey bottom-border-grey right-border-grey1px myGrid"
                  >
                    <span className="w-100 right-border-grey1px">
                      No Feedback Category defined for this grade
                    </span>
                  </div>
                  <Accordion.Toggle
                    as="button"
                    type="button"
                    className="mt-2 mb-1 btn btn-sm btn-outline-primary"
                    variant="link"
                    eventKey="2"
                    id="Grade1"
                  >
                    Add Category for Grade {selectGrade.grade}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2" className="p-0 m-0 w-75">
                    <NewFeedbackCategory
                      grade={selectGrade.grade}
                      refresh={refresh}
                      source="Grade1"
                    />
                  </Accordion.Collapse>
                </section>
              ) : (
                <section className="d-flex flex-column text-center content-center w-100 align-items-center justify-content-center mt-2">
                  <h3 className="text-high-tower mt-3">
                    Grade {selectGrade.grade} Feedback Category
                  </h3>
                  <div
                    id="header"
                    className="w-75 m-0 p-0 d-flex flex-row justify-content-center background-grad darkblue text-center text-georgia text-white large-text border"
                  >
                    <span className="w-10 right-border-white1px">Id</span>
                    <span className="w-70 right-border-white1px">
                      Category Description
                    </span>
                    <div className="w-20 d-flex flex-row justify-content-center">
                      Active Status
                    </div>
                  </div>
                  {feedbackCat.map((fc) => (
                    <div
                      id={fc.id}
                      className={
                        "w-75 m-0 p-0 d-flex flex-row justify-content-center text-center text-Palatino large-text left-border-grey bottom-border-grey right-border-grey1px myGrid " +
                        isGradeCategoryActive(fc.id, fc.active)
                      }
                      tabIndex="1"
                      onClick={() =>
                        feedbackCategorySelect(
                          selection.default,
                          fc.id,
                          selection.feedback,
                          fc.description,
                          fc.feedbacks
                        )
                      }
                    >
                      <span className="w-10 right-border-grey1px">{fc.id}</span>
                      <span className="w-70 right-border-grey1px">
                        {fc.description}
                      </span>
                      <div className="w-20 d-flex flex-row justify-content-center">
                        <button
                          type="button"
                          className={
                            fc.active
                              ? "btn btn-outline-success btn-sm rounded"
                              : "btn btn-outline-danger btn-sm rounded"
                          }
                          onClick={() => changeState(fc.id, "cat")}
                        >
                          {fc.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                  ))}
                  <Accordion.Toggle
                    as="button"
                    type="button"
                    className="mt-2 mb-1 btn btn-sm btn-outline-primary"
                    variant="link"
                    eventKey="4"
                    id="Grade2"
                  >
                    Add Category for Grade {selectGrade.grade}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="4" className="p-0 m-0 w-75">
                    <NewFeedbackCategory
                      grade={selectGrade.grade}
                      refresh={refresh}
                      source="Grade2"
                    />
                  </Accordion.Collapse>
                </section>
              )
            ) : (
              <></>
            )}

            {selection.showFeedback == true ? (
              <section className="d-flex flex-column text-center content-center w-100 align-items-center justify-content-center mt-2">
                <h3 className="text-high-tower mt-3">
                  {selection.default == ""
                    ? "Feedback Items for Grade " +
                      selectGrade.grade +
                      " - " +
                      selection.catName +
                      " Category"
                    : "Feedback Items for Default - " +
                      selection.catName +
                      " Category"}
                </h3>
                <div
                  id="header"
                  className="w-75 m-0 p-0 d-flex flex-row justify-content-center background-grad darkblue text-center text-georgia text-white large-text border"
                >
                  <span className="w-10 right-border-white1px">Id</span>

                  <span className="w-50p right-border-white1px">
                    Description
                  </span>
                  <span className="w-20 right-border-white1px">
                    Short Description
                  </span>
                  <div className="w-20 d-flex flex-row justify-content-center">
                    Active Status
                  </div>
                </div>
                {feedbackItems.length > 0 ? (
                  feedbackItems.map((fi) => (
                    <div
                      id={fi.id}
                      className={
                        "w-75 m-0 p-0 d-flex flex-row justify-content-center text-center text-Palatino large-text left-border-grey bottom-border-grey right-border-grey1px myGrid " +
                        isFeedbackActive(fi.id, fi.active)
                      }
                      tabIndex="1"
                      onClick={() =>
                        feedbackCategorySelect(
                          selection.default,
                          selection.grade,
                          fi.id,
                          selection.catName,
                          feedbackItems
                        )
                      }
                    >
                      <span className="w-10 right-border-grey1px">{fi.id}</span>
                      <span className="w-50 right-border-grey1px">
                        {fi.description}
                      </span>
                      <span className="w-20 right-border-grey1px">
                        {fi.shortDescription}
                      </span>
                      <div className="w-20 d-flex flex-row justify-content-center">
                        <button
                          type="button"
                          className={
                            fi.active
                              ? "btn btn-outline-success btn-sm rounded"
                              : "btn btn-outline-danger btn-sm rounded"
                          }
                          onClick={() => changeState(fi.id, "item")}
                        >
                          {fi.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    id="0"
                    className="w-75 m-0 p-0 d-flex flex-row justify-content-center text-center text-Palatino large-text left-border-grey bottom-border-grey right-border-grey1px myGrid "
                    tabIndex="1"
                  >
                    <span className="w-100 right-border-grey1px">
                      {"No Feedback Item found for category " +
                        selection.catName}
                    </span>
                  </div>
                )}
                <Accordion.Toggle
                  as="button"
                  type="button"
                  className="mt-2 mb-1 btn btn-sm btn-outline-primary align-self-center"
                  variant="link"
                  eventKey="3"
                  id="addfeedback"
                >
                  Add Item for Grade{" "}
                  {selectGrade.grade + " " + selection.catName}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3" className="p-0 m-0 w-75">
                  <NewFeedback
                    selection={selection}
                    grade={selectGrade.grade}
                    refresh={refresh}
                    source="addfeedback"
                  />
                </Accordion.Collapse>
              </section>
            ) : (
              <></>
            )}
            <div></div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default FeedbackCategoryManagement;

import React, { Component, useEffect } from "react";
import Toggle from "react-toggle";
import "./SubHeader.css";
import { Accordion } from "react-bootstrap";
import { useState } from "react";

const SubHeader = ({ features, setFilter }) => {
  const [mathsActive, setMathsActive] = useState(true);
  const [englishActive, setEnglishActive] = useState(true);
  const [gaActive, setGaActive] = useState(true);
  const [showAllActive, setShowAllActive] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setselectedTeacher] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  const getAllTeachers = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/Signup/getTeachers",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    var result = await response.json();
    setTeachers(result);
  };

  useEffect(() => {
    getAllTeachers();
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
    };
    setFilter(filter);
  }, []);

  const toggleMaths = () => {
    var filter = {
      maths: !mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
      selectedTeacher: selectedTeacher,
      selectedGrade: selectedGrade,
      namePattern: nameSearch,
    };
    setMathsActive(!mathsActive);
    setFilter(filter);
  };

  const toggleEnglish = () => {
    var filter = {
      maths: mathsActive,
      english: !englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
      selectedTeacher: selectedTeacher,
      selectedGrade: selectedGrade,
      namePattern: nameSearch,
    };
    setEnglishActive(!englishActive);
    setFilter(filter);
  };

  const toggleGa = () => {
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: !gaActive,
      showAllActive: showAllActive,
      selectedTeacher: selectedTeacher,
      selectedGrade: selectedGrade,
      namePattern: nameSearch,
    };
    setGaActive(!gaActive);
    setFilter(filter);
  };

  const toggleAllTeachers = () => {
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: !showAllActive,
      selectedTeacher: selectedTeacher,
      selectedGrade: selectedGrade,
      namePattern: nameSearch,
    };
    setShowAllActive(!showAllActive);
    setFilter(filter);
  };

  const teacherSelect = (e) => {
    var idx = e.target.selectedIndex;
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
      selectedTeacher: e.target[idx].text,
      selectedGrade: selectedGrade,
      namePattern: nameSearch,
    };
    setFilter(filter);
    setselectedTeacher(e.target[idx].text);
  };

  const gradeSelect = (e) => {
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
      selectedTeacher: selectedTeacher,
      selectedGrade: e.target.value,
      namePattern: nameSearch,
    };
    setFilter(filter);
    setSelectedGrade(e.target.value);
  };

  const handleSearch = (e) => {
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
      selectedTeacher: selectedTeacher,
      selectedGrade: selectedGrade,
      namePattern: e.target.value,
    };
    setFilter(filter);
    setNameSearch(e.target.value);
  };

  const clearSearch = () => {
    var filter = {
      maths: mathsActive,
      english: englishActive,
      ga: gaActive,
      showAllActive: showAllActive,
      selectedTeacher: "",
      selectedGrade: "",
      namePattern: "",
    };

    setFilter(filter);
    setSelectedGrade("");
    setselectedTeacher("");
    setNameSearch("");
  };

  var authorizeAllTeachers = false;
  if (features) {
    if (features.some((item) => item.name === "All Teachers")) {
      authorizeAllTeachers = true;
    }
  }

  return (
    <Accordion defaultActiveKey="100">
      <div className="d-flex fluid m-0 pt-2 pb-1 justify-content-between">
        <div className="d-flex flex-row" title="Show only Maths">
          <Toggle defaultChecked={mathsActive} onChange={toggleMaths} />
          <div className="ml-2 text-dark align-self-center large-text font-weight-bold">
            Maths
          </div>
        </div>
        <div className="d-flex flex-row" title="Show only English">
          <Toggle defaultChecked={englishActive} onChange={toggleEnglish} />
          <div className="ml-2 text-dark align-self-center large-text font-weight-bolder">
            English
          </div>
        </div>
        <div className="d-flex flex-row" title="Show only GA">
          <Toggle defaultChecked={gaActive} onChange={toggleGa} />
          <div className="ml-2 text-dark align-self-center large-text font-weight-bolder">
            G.A
          </div>
        </div>

        {authorizeAllTeachers ? (
          <div className="d-flex flex-row bg-white">
            <Accordion.Toggle eventKey="100" className="bg-white border-0">
              <Toggle
                defaultChecked={showAllActive}
                onChange={toggleAllTeachers}
                id="AllTeachers"
              />
            </Accordion.Toggle>
            <div className="ml-2 text-dark align-self-center large-text font-weight-bolder">
              All Teachers
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {authorizeAllTeachers ? (
        <Accordion.Collapse eventKey="100">
          <form>
            <div className="d-flex flex-row shadow  mt-1 ml-4 mr-4 mb-1 pt-2 pl-4 pb-4 rounded-10 text-dark">
              <select
                className="custom-select w-15 h-40 rounded-10 mr-3 medium-text"
                id="teachers"
                onChange={teacherSelect}
              >
                <option value="0">Filter By Teacher</option>
                {teachers ? (
                  teachers.map((t) => (
                    <option value={t.id}>{t.teacherName}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>

              <select
                className="custom-select w-15 h-40 rounded-10 mr-3 medium-text"
                id="grades"
                onChange={gradeSelect}
              >
                <option value="0">Filter By Grade</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="5">Year 5</option>
                <option value="6">Year 6</option>
                <option value="7">Year 7</option>
                <option value="8">Year 8</option>
                <option value="9">Year 9</option>
                <option value="10">Year 10</option>
                <option value="11">Year 11</option>
                <option value="12">Year 12</option>
              </select>
              {/* <div className="d-flex flex-row ml-4 pr-5 grey-light-border align-self-center h-40 w-35 rounded-10 align-content-center justify-content-between  shadow-sm">
              <div className="d-flex justify-content-center rounded-left-10 background-grey pl-3 pr-3 align-items-center">
                <span className="medium-text text-dark align-self-center">
                  Sort by
                </span>
              </div>
              <div className="custom-control custom-radio align-self-center">
                <input
                  type="radio"
                  id="customRadio1"
                  name="customRadio"
                  className="custom-control-input align-self-ce nter"
                />
                <label
                  className="custom-control-label medium-text"
                  for="customRadio1"
                >
                  Teacher
                </label>
              </div>
              <div className="custom-control custom-radio align-self-center">
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  className="custom-control-input align-self-ce nter"
                />
                <label
                  className="custom-control-label medium-text"
                  for="customRadio2"
                >
                  Subject
                </label>
              </div>
              <div className="custom-control custom-radio align-self-center mr-5">
                <input
                  type="radio"
                  id="customRadio3"
                  name="customRadio"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label medium-text"
                  for="customRadio3"
                >
                  Batch Time
                </label>
              </div>
            </div> */}

              <div className="d-flex align-self-center active-cyan-3 active-cyan-4 ml-5 rounded-10 h-40 w-15">
                <input
                  className="form-control rounded-10 h-40 medium-text text-lightgrey"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  id="searchBox"
                  onChange={handleSearch}
                />
              </div>
              <button
                type="reset"
                className="btn btn-warning h-35px rounded-10 ml-5 medium-text text-darkgrey"
                onClick={clearSearch}
              >
                Clear Filter
              </button>
            </div>
          </form>
        </Accordion.Collapse>
      ) : (
        <div></div>
      )}
    </Accordion>
  );
};
export default SubHeader;

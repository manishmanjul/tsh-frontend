import React, { useEffect } from "react";
import "./SubHeader.css";
import { useState } from "react";

const PageFilter = ({ setFilters }) => {
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
    var filter = {};
    setFilters(filter);
  }, []);

  const teacherSelect = (e) => {
    var idx = e.target.selectedIndex;
    var filter = {
      teacher: e.target[idx].text,
      grade: selectedGrade,
      namePattern: nameSearch,
    };
    setFilters(filter);
    setselectedTeacher(e.target[idx].text);
  };

  const gradeSelect = (e) => {
    var filter = {
      teacher: selectedTeacher,
      grade: e.target.value,
      namePattern: nameSearch,
    };
    setFilters(filter);
    setSelectedGrade(e.target.value);
  };

  const handleSearch = (e) => {
    var filter = {
      teacher: selectedTeacher,
      grade: selectedGrade,
      namePattern: e.target.value,
    };
    setFilters(filter);
    setNameSearch(e.target.value);
  };

  const clearSearch = () => {
    var filter = {
      teacher: "",
      grade: "",
      namePattern: "",
    };

    setFilters(filter);
    setSelectedGrade("");
    setselectedTeacher("");
    setNameSearch("");
  };

  var authorizeAllTeachers = false;
  var welcome = JSON.parse(sessionStorage.getItem("welcomeKit"));
  var features = welcome.features;
  if (features) {
    if (features.some((item) => item.name === "All Teachers")) {
      authorizeAllTeachers = true;
    }
  }

  return (
    <form className="w-100">
      {authorizeAllTeachers ? (
        <div className="d-flex w-100 flex-row shadow  mt-2 mb-1 rounded-10 text-dark">
          <select
            className="custom-select w-30 h-40 rounded-10 mr-3 medium-text align-self-center"
            id="teachers"
            onChange={teacherSelect}
          >
            <option value="0">Filter By Teacher</option>
            {teachers ? (
              teachers.map((t) => <option value={t.id}>{t.teacherName}</option>)
            ) : (
              <></>
            )}
          </select>

          <select
            className="custom-select w-30 h-40 rounded-10 mr-2 medium-text align-self-center"
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

          <div className="d-flex align-self-center active-cyan-3 active-cyan-4 ml-1 rounded-10 h-40 w-40">
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
            className="btn btn-warning h-35px rounded-10 ml-1 medium-text text-darkgrey"
            onClick={clearSearch}
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </form>
  );
};
export default PageFilter;

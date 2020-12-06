import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SingleBatch from "./SingleBatch";

const BatchManagementDashboard = () => {
  const getTimeArray = () => {
    var timearray = [];
    for (var i = 1; i <= 20; i++) {
      timearray.push(i);
    }
    return timearray;
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Batch Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger font-weight-bold">--- &nbsp;</p>
        Dashboard
        <p className="text-danger font-weight-bold">&nbsp; ---</p>
      </p>
      <section className="w-100 full-height d-flex flex-column justify-content-between border border-danger ">
        {getTimeArray().map((t) => (
          <div className="w-100 h-0 border-025 ">
            {t === 4 ? <SingleBatch /> : <></>}
          </div>
        ))}
      </section>
      <div className="w-75 align-self-center">
        <NavLink to="/BatchPlanner" className="btn btn-info mb-2">
          Go Back
        </NavLink>
      </div>
    </div>
  );
};

export default BatchManagementDashboard;

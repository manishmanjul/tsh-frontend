import React from "react";
import { NavLink } from "react-router-dom";

const BatchManagementPlanner = () => {
  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Batch Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger font-weight-bold">--- &nbsp;</p>
        Planner
        <p className="text-danger font-weight-bold">&nbsp; ---</p>
      </p>
      <div className="w-75 align-self-center">
        <NavLink to="/BatchPlanner" className="btn btn-info mb-2">
          Go Back
        </NavLink>
      </div>
    </div>
  );
};

export default BatchManagementPlanner;

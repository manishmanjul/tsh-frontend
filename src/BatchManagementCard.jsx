import React from "react";
import { NavLink } from "react-router-dom";

const BatchManagementCard = ({ heading, subHeading, msg, btnText, url }) => {
  return (
    <div className="card w-22 rounded-10 mt-3 ml-3">
      <h3 className="card-header">{heading}</h3>
      <div className="card-body">
        <h4 className="card-title">{subHeading}</h4>
        <p className="card-text text-Georgia text-13">{msg}</p>
        <NavLink to={"/BatchPlanner/" + heading} className="btn btn-primary">
          {btnText}
        </NavLink>
      </div>
    </div>
  );
};

export default BatchManagementCard;

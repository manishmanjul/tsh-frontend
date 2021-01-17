import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const FeedbackManagementHeader = ({ heading }) => {
  const [pageFeatures, setPageFeatures] = useState([]);

  const getPageFeatures = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/login/getPageFeatures/FeedbackManagement",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setPageFeatures(result);
  };

  useEffect(() => {
    getPageFeatures();
  }, []);

  return (
    <div className="w-100 d-flex flex-row">
      <div className="d-flex flex-row justify-content-left w-20 text-lightgrey3 text-18 pb-2 pl-4">
        {pageFeatures ? (
          pageFeatures.map((f) => (
            <NavLink
              className="pl-2 pr-2 m-0 h-55 align-self-center mr-3 feedback border rounded"
              title={f.title}
              to={f.target}
            >
              <i className={"m-0 mt-1 p-0 align-self-center " + f.style} />
            </NavLink>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="w-100 d-flex flex-column text-center">
        <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0">
          {heading}
        </p>
      </div>
    </div>
  );
};

export default FeedbackManagementHeader;

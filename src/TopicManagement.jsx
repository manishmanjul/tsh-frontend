import React, { useEffect, useState } from "react";
import CreateTopics from "./CreateTopics";
import TopicGenerator from "./TopicGenerator";

import TopicPlanner from "./TopicPlanner";
import UpdateTopic from "./UpdateTopics";

const TopicManagement = () => {
  const [pageFeatures, setPageFeatures] = useState([]);
  const [modelToShow, setModelToShow] = useState({
    model: "",
    description: "",
  });

  const getPageFeatures = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/login/getPageFeatures/TopicManagement",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setModelToShow({
      model: result[0].name,
      description: result[0].description,
    });
    setPageFeatures(result);
  };

  useEffect(() => {
    getPageFeatures();
  }, []);

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Topic Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger font-weight-bold">--- &nbsp;</p>
        {modelToShow.model}
        <p className="text-danger font-weight-bold">&nbsp; ---</p>
      </p>
      <div className="text-verdena text-dark text-10 font-weight-bold">
        <ul className="nav nav-tabs">
          {pageFeatures ? (
            pageFeatures.map((f) => (
              <li className="nav-item cur-pointer ">
                <a
                  className={
                    modelToShow.description === f.description
                      ? "text-uppercase nav-link active"
                      : "text-uppercase nav-link"
                  }
                  onClick={() =>
                    setModelToShow({
                      model: f.name,
                      description: f.description,
                    })
                  }
                  title={f.title}
                >
                  {f.name}
                </a>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="text-dark d-flex flex-row pt-3">
        {modelToShow.description === "generate" && <TopicGenerator />}
        {modelToShow.description === "update" && <UpdateTopic />}
        {modelToShow.description === "planner" && <TopicPlanner />}
        {modelToShow.description === "create" && <CreateTopics />}
      </div>
    </div>
  );
};

export default TopicManagement;

import React, { useState } from "react";
import TopicGenerator from "./TopicGenerator";

import TopicPlanner from "./TopicPlanner";
import UpdateTopic from "./UpdateTopics";

const TopicManagement = () => {
  const [modelToShow, setModelToShow] = useState({
    generate: false,
    update: true,
    planner: false,
  });

  const getSubext = () => {
    if (modelToShow.generate) return "Generate Topic";
    if (modelToShow.update) return "Update Topic";
    if (modelToShow.planner) return "Topic Planner";
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Topic Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger font-weight-bold">--- &nbsp;</p>
        {getSubext()}
        <p className="text-danger font-weight-bold">&nbsp; ---</p>
      </p>
      <div className="text-verdena text-dark text-10 font-weight-bold">
        <ul className="nav nav-tabs">
          <li className="nav-item cur-pointer ">
            <a
              className={modelToShow.generate ? "nav-link active" : "nav-link"}
              onClick={() =>
                setModelToShow({
                  generate: true,
                  update: false,
                  planner: false,
                })
              }
            >
              GENERATE TOPIC
            </a>
          </li>
          <li className="nav-item cur-pointer">
            <a
              className={modelToShow.update ? "nav-link active" : "nav-link"}
              onClick={() =>
                setModelToShow({
                  generate: false,
                  update: true,
                  planner: false,
                })
              }
            >
              UPDATE TOPICS
            </a>
          </li>
          <li className="nav-item cur-pointer ">
            <a
              className={modelToShow.planner ? "nav-link active" : "nav-link"}
              onClick={() =>
                setModelToShow({
                  generate: false,
                  update: false,
                  planner: true,
                })
              }
            >
              TOPIC PLANNER
            </a>
          </li>
        </ul>
      </div>
      <div className="text-dark d-flex flex-row pt-3">
        {modelToShow.generate && <TopicGenerator />}
        {modelToShow.update && <UpdateTopic />}
        {modelToShow.planner && <TopicPlanner />}
      </div>
    </div>
  );
};

export default TopicManagement;

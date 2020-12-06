import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Circle } from "rc-progress";
import { useEffect, useState } from "react";

const BatchManagementOutlook = () => {
  const [processStatus, setProcessStatus] = useState({
    psCode: 0,
    percentage: 0,
    statusMessage: "",
  });

  useEffect(() => {
    var ans = window.confirm(
      "Confirm... Do you really want to import from Outlook?"
    );
    if (ans) {
      var response = startImport();
      console.log("startImport: " + response);
    } else {
      document.getElementById("goback").click();
    }
  }, []);

  useEffect(() => {
    var status = "";
    if (processStatus.psCode !== 0) {
      setTimeout(() => {
        status = getStatus();
      }, 2000);
    }
  }, [processStatus]);

  const getStatus = async () => {
    console.log("Status called");
    const response = await fetch("/tsh/process/status", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ processId: processStatus.psCode }),
    });
    let responseCode = await response.status;
    var status = await response.json();
    if (processStatus.percentage < 100) {
      setProcessStatus({
        psCode: processStatus.psCode,
        percentage: status.percetCompleted,
        statusMessage:
          status.stepName === null
            ? processStatus.statusMessage
            : status.stepName,
      });
    }

    return status;
  };

  const startImport = async () => {
    console.log("Import called");
    const response = await fetch("/tsh/process/importFromOutlook", {
      method: "POST",
      headers: {
        // eslint-disable-next-line
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
    let responseCode = await response.status;
    var pscode = await response.json();

    setProcessStatus({
      psCode: pscode.psCode,
      percentage: pscode.percetCompleted,
      statusMessage: pscode.stepName,
    });
    return responseCode;
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Batch Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger font-weight-bold">--- &nbsp;</p>
        Outlook
        <p className="text-danger font-weight-bold">&nbsp; ---</p>
      </p>
      <div className="w-75 align-self-center h-400px">
        <div className="w-100 align-self-center d-flex flex-column ">
          <h3 className="text-lightgreyplus text-georgia align-self-center font-weight-bold">
            {" "}
            Importing Batch data from outlook
          </h3>
          <h5 className="text-dark text-georgia align-self-center m-0 mt-1">
            {" "}
            {processStatus.percentage} %
          </h5>
          <Circle
            percent={processStatus.percentage}
            strokeWidth="6"
            className="hp-100 mt-2"
          />
          <h5 className="text-lightgreyplus text-georgia align-self-center font-weight-bold mt-3">
            {" "}
            {processStatus.statusMessage}...
          </h5>
        </div>
        <NavLink id="goback" to="/BatchPlanner" className="btn btn-info mb-2">
          Go Back
        </NavLink>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => getStatus()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default BatchManagementOutlook;

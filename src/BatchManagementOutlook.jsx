import React from "react";
import { Circle } from "rc-progress";
import { useEffect, useState } from "react";
import InputStartEndDate from "./InputStartEndDate";
import { NavLink } from "react-router-dom";

const BatchManagementOutlook = () => {
  const [processStatus, setProcessStatus] = useState({
    psCode: 0,
    percentage: 0,
    statusMessage: "",
    cycle: 0,
  });
  const [go, setGo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (go == false) return;
    var ans = window.confirm(
      "Do you really want to import from Outlook? \nStart Date : " +
        startDate.toDateString() +
        "\nEnd Date :" +
        endDate.toDateString()
    );
    if (ans) {
      setConfirm(true);
      var response = startImport();
      console.log("startImport: " + response);
    } else {
      setGo(false);
    }
  }, [go]);

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
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/process/status",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ processId: processStatus.psCode }),
      }
    );
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
        cycle: status.controlIdentifier,
      });
    }

    return status;
  };

  const startImport = async () => {
    console.log("Import called");
    var sDate =
      startDate.getDate() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getFullYear();
    var eDate =
      endDate.getDate() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getFullYear();

    var dataToSend = { fromDate: sDate, toDate: eDate };
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/process/importFromOutlook",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
    let responseCode = await response.status;
    var pscode = await response.json();

    setProcessStatus({
      psCode: pscode.psCode,
      percentage: pscode.percetCompleted,
      statusMessage: pscode.stepName,
      cycle: pscode.controlIdentifier,
    });
    return responseCode;
  };

  useEffect(() => {
    var first = new Date();
    var dd = first.getDate();
    first.setDate(dd - 6);
    setStartDate(first);
    setEndDate(new Date());
  }, []);

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger font-weight-bold">--- &nbsp;</p>
        Import from Outlook
        <p className="text-danger font-weight-bold">&nbsp; ---</p>
      </p>
      {confirm == false ? (
        <div className="text-dark align-self-center border w-50 mb-5 shadow-sm">
          <InputStartEndDate
            heading="Select a Date range to import data from Outlook Calendar"
            startAt={startDate}
            endBy={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <div className="d-flex flex-row justify-content-center mb-4">
            <NavLink
              id="goback"
              to="/Management"
              className="btn btn-sm btn-danger mr-4"
            >
              Cancel
            </NavLink>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setGo(true)}
            >
              Start Import
            </button>
          </div>
        </div>
      ) : (
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
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => getStatus()}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default BatchManagementOutlook;

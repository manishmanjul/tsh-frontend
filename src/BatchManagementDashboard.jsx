import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import SingleBatch from "./SingleBatch";

const BatchManagementDashboard = () => {
  const [forDate, setForDate] = useState(new Date());
  const [batchData, setBatchData] = useState([]);
  const [error, setError] = useState("");

  const getDisplayDate = () => {
    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    return (
      weekDay[forDate.getDay()] +
      ", " +
      getValidDateOnly() +
      ", " +
      forDate.toLocaleTimeString()
    );
  };

  const getValidDateOnly = () => {
    return (
      forDate.getDate() +
      "-" +
      (forDate.getMonth() + 1) +
      "-" +
      forDate.getFullYear()
    );
  };

  const fetchAllBatchesForDate = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") +
        "/tsh/dashboard/getBatchDetails/" +
        getValidDateOnly(),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 202) {
      const localBatchData = await response.json();
      setBatchData(localBatchData);
      setError("");
    } else if (response.status == 204) {
      setError("No Batches found for this Date");
      setBatchData([]);
    } else {
      setError("Internal Server Error !! Try Again Later...");
      setBatchData([]);
    }
  };

  useEffect(() => {
    fetchAllBatchesForDate();
  }, [forDate.getDate()]);

  const nextDate = () => {
    let tempDate = new Date();
    forDate.setDate(forDate.getDate() + 1);
    tempDate.setDate(forDate.getDate());
    tempDate.setMonth(forDate.getMonth());
    tempDate.setFullYear(forDate.getFullYear());
    setForDate(tempDate);
  };

  const prevDate = () => {
    let tempDate = new Date();
    forDate.setDate(forDate.getDate() - 1);
    tempDate.setDate(forDate.getDate());
    tempDate.setMonth(forDate.getMonth());
    tempDate.setFullYear(forDate.getFullYear());
    setForDate(tempDate);
  };

  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center z-4">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center ">
        Batch Management
      </p>
      <p className="text-high-tower font-style-bold text-lightgrey3 mt-0 mb-0 pb-0 p-0 align-self-center d-flex flex-row">
        <p className="text-danger pb-0 mb-0 font-weight-bold">--- &nbsp;</p>
        Dashboard
        <p className="text-danger font-weight-bold mb-0 pb-0 ">&nbsp; ---</p>
      </p>
      <div className="w-95 m-0 mb-1 pl-4 d-flex flex-row ">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mr-3"
          title="View today's batch schedule"
          onClick={() => setForDate(new Date())}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mr-3"
          title="Previous Day"
          onClick={() => prevDate()}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mr-3"
          title="Next Day"
          onClick={() => nextDate()}
        >
          {">"}
        </button>
        <label className="text-14 font-weight-bold text-verdena text-dark  pt-1">
          {getDisplayDate()}
        </label>
      </div>
      {error == "" ? (
        <section className="d-flex flex-row flex-wrap justify-content-center border-t-025 pt-3 mb-3">
          {batchData ? (
            batchData.length > 0 ? (
              batchData.map((b) => (
                <SingleBatch key={b.batchDetailId} batch={b} />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </section>
      ) : (
        <section className="d-flex flex-row flex-wrap justify-content-center border-t-025 pt-3 mb-3">
          <div className="alert alert-info w-100" role="alert">
            <h4 className="alert-heading">{error}</h4>
          </div>
        </section>
      )}
    </div>
  );
};

export default BatchManagementDashboard;

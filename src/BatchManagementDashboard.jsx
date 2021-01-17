import React from "react";

import SingleBatch from "./SingleBatch";

const BatchManagementDashboard = () => {
  const getToday = () => {
    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    var t = new Date();
    return weekDay[t.getDay()] + ", " + t.toLocaleString();
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
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mr-3"
          title="Previous Day"
        >
          {"<"}
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mr-3"
          title="Next Day"
        >
          {">"}
        </button>
        <lable className="text-14 font-weight-bold text-verdena text-dark  pt-1">
          {getToday()}
        </lable>
      </div>
      <section className="d-flex flex-column border-t-025 pt-3 mb-3">
        <div className="w-98 align-self-center">
          <SingleBatch />
        </div>
      </section>
    </div>
  );
};

export default BatchManagementDashboard;

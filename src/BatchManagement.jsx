import React from "react";
import BatchManagementCard from "./BatchManagementCard";

const BatchManagement = () => {
  return (
    <div className="w-100 border-grey d-flex flex-column justify-content-center align-content-center">
      <p className="text-high-tower font-style-bold text-lightgrey3 text-32 mt-3 mb-0 p-0 align-self-center">
        Batch Management
      </p>

      <div className="d-flex flex-row flex-wrap w-75  mt-3 mb-5 text-Palatino justify-content-center text-dark align-self-center">
        <BatchManagementCard
          heading="Dashboard"
          subHeading="Daily view of Batches"
          msg="View All Batches with Students on a Day by Day basis."
          btnText="Start Dashboard"
          url=""
        />
        <BatchManagementCard
          heading="Outlook"
          subHeading="Import from Outlook"
          msg="Import Students, Batches and Schedules of entire week from Outlook"
          btnText="Start Import"
          url=""
        />

        <BatchManagementCard
          heading="Excel"
          subHeading="Import from CSV"
          msg="Import Students, Batches and Schedules of entire week from an
          excel or CSV file"
          btnText="Start Import"
          url=""
        />

        <BatchManagementCard
          heading="Planner"
          subHeading="Batch Planning Board"
          msg="Open a planning board allowing to create, manage and delete batch schedules and data"
          btnText="Start Planner"
          url=""
        />
      </div>
    </div>
  );
};

export default BatchManagement;

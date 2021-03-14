import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React from "react";

const InputStartEndDate = ({
  heading,
  startAt,
  endBy,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="d-flex flex-column text-dark w-100">
      <h3 className="text-high-tower align-self-center mb-3">{heading}</h3>
      <div className="ml-2 mt-4 mb-4 pt-0 pb-0 d-flex flex-row justify-content-center">
        <div className="d-flex flex-row">
          <div className="background-grey-plus1 pl-2 pr-2 pt -0 pb-0 mt-0 h-25 text-georgia text-center rounded-left-5">
            <span className="pt-2 pb-0 pl-0 pr-0 mt-0 mb-0 ml-0 mr-0 align-self-center">
              Start Date
            </span>
          </div>
          <DatePicker
            selected={startAt}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="rounded-right-5 border-grey h-25 pl-2"
          />
        </div>
        <div className="d-flex flex-row ml-5">
          <div className="background-grey-plus1 pl-2 pr-2 pt -0 pb-0 mt-0 h-25 text-georgia text-center rounded-left-5">
            <span className="pt-2 pb-0 pl-0 pr-0 mt-0 mb-0 ml-0 mr-0 align-self-center">
              End Date
            </span>
          </div>
          <DatePicker
            selected={endBy}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="rounded-right-5 border-grey h-25 pl-2"
          />
        </div>
      </div>
    </div>
  );
};

export default InputStartEndDate;

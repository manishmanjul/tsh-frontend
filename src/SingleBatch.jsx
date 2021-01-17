import React from "react";

const SingleBatch = () => {
  return (
    <div className="w-12 h-170 p-0 m-0 d-flex flex-column justify-content-between batchList blue  shadow rounded border-grey">
      <div className="d-flex flex-column p-0 m-0 w-100 background-grey-plus3 text-dark shadow-lg rounded bottom-border-grey">
        <p className="text-white text-Palatino font-weight-bold text-14 letter-s2 align-self-center p-0 pr-1 m-0">
          11:15 AM
        </p>
      </div>
      <div className="d-flex flex-column flex-grow-1 justify-content-start text-center text-white">
        <div className="d-flex flex-row justify-content-between bottom-border-grey w-100 pb-0 align-self-start">
          <div className="text-center pl-2">
            <p className="letter-s3 pt-1 text-uppercase text-10 text-verdena font-weight-bold pt-1 pb-0 mb-0">
              CR#
            </p>
            <p className="letter-s1 text-Capitalize text-12 text-verdena p-0 m-0 pb-0 pt-0 mb-0">
              0
            </p>
          </div>
          <div className="flex-grow-1 pr-3 text-center">
            <p className="letter-s3 pt-1 text-uppercase text-10 text-georgia font-weight-bold pb-0 mb-0">
              Maths
            </p>
            <p className="letter-s1 text-Capitalize text-10 text-georgia pb-0 mb-0">
              Manish
            </p>
          </div>
          <div className="text-25 text-Palatino font-weight-bold mr-2 mt-0 p-0">
            <p className="p-0 m-0 ">7</p>
          </div>
        </div>
        <div className="w-100 pl-3 pb-2 pt-2 d-flex flex-column flex-grow-1 justify-content-around align-items-start">
          <span className="p-0 m-0 ml-3 text-11 text-georgia text-center text-uppercase letter-s2">
            <input type="checkbox" className="mr-3" />
            Nikhil
          </span>
          <span className="p-0 m-0 ml-3 text-11 text-georgia text-center text-uppercase letter-s2">
            <input type="checkbox" className="mr-3" />
            Tegbir
          </span>
          <span className="p-0 m-0 ml-3 text-11 text-georgia text-center text-uppercase letter-s2">
            <input type="checkbox" className="mr-3" />
            Daniel
          </span>
          <span className="p-0 m-0 ml-3 text-11 text-georgia text-center text-uppercase letter-s2">
            <input type="checkbox" className="mr-3" />
            Krish
          </span>
        </div>
      </div>
      <div className="w-100 d-flex flex-row align-self-end text-dark justify-content-between text-center pt-1 pl-3 pr-3 pb-1 background-grey rounded">
        <i
          className="text-11 cur-pointer align-self-center p-0 glyphicon glyphicon-remove-circle"
          title="Cancel this batch for today"
        />
        <i
          className="text-11 cur-pointer align-self-center p-0 glyphicon glyphicon-transfer"
          title="Mark a student absent"
        />
        <i
          className="text-11 cur-pointer align-self-center p-0 glyphicon glyphicon-refresh"
          title="Reschedule this batch to another time"
        />
        <i
          className="text-11 cur-pointer align-self-center p-0 glyphicon glyphicon-random"
          title="Change Teacher for today"
        />
        <i
          className="text-11 cur-pointer align-self-center p-0 glyphicon glyphicon-plus"
          title="Assign a classroom"
        />
      </div>
    </div>
  );
};

export default SingleBatch;

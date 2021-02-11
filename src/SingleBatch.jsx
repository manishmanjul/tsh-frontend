import React from "react";

const SingleBatch = ({ batch }) => {
  const getBGColor = () => {
    if (batch.cancelled) {
      return "grey";
    } else {
      return batch.bgColor;
    }
  };

  const getFontColor = () => {
    if (batch.cancelled) {
      return "black";
    } else {
      return batch.fontColor;
    }
  };

  return (
    <div
      className="w-16 h-170 p-0 mb-4 mt-2 ml-4 d-flex flex-column justify-content-between shadow-sm rounded border-grey"
      style={{ background: getBGColor() }}
    >
      <div className="d-flex flex-column p-0 m-0 w-100 background-grey-plus3 text-dark shadow-lg rounded bottom-border-grey">
        <p className="text-white text-Palatino font-weight-bold text-14 letter-s2 align-self-center p-0 pr-1 m-0">
          {batch.startTime}
        </p>
      </div>
      <div
        className="d-flex flex-column flex-grow-1 justify-content-start text-center"
        style={{ color: getFontColor() }}
      >
        <div className="d-flex flex-row justify-content-between bottom-border-grey w-100 pb-0 align-self-start">
          <div className="text-center pl-2">
            <p className="pt-1 text-10 text-verdena font-weight-bold pt-1 pb-0 mb-0">
              Room #
            </p>
            <p className="letter-s1 text-Capitalize text-12 text-verdena p-0 m-0 pb-0 pt-0 mb-0">
              0
            </p>
          </div>
          <div className="flex-grow-1 pr-3 text-center">
            <p className="pt-1 text-11 text-georgia font-weight-bold pb-0 mb-0">
              {batch.course}
            </p>
            <p className="letter-s1 text-Capitalize text-10 text-georgia pb-0 mb-0">
              {batch.teacher.teacherName}
            </p>
          </div>
          <div className="text-25 text-Palatino font-weight-bold mr-2 mt-0 p-0">
            <p className="p-0 m-0 ">{batch.grade}</p>
          </div>
        </div>
        <div className="w-100 pb-2 pt-2 d-flex flex-column flex-grow-1 justify-content-around align-items-start">
          {batch.studentList ? (
            batch.studentList.map((s) => (
              <span
                key={s.id}
                className="p-0 m-0 ml-2 text-11 text-georgia text-uppercase letter-s1"
              >
                <input type="checkbox" className="mr-2" />
                {s.name}
              </span>
            ))
          ) : (
            <></>
          )}
          {batch.cancelled ? (
            <span className="w-100 p-0 text-14 text-georgia text-uppercase align-self-center bg-danger text-white letter-s3">
              CANCELLED
            </span>
          ) : (
            <></>
          )}
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

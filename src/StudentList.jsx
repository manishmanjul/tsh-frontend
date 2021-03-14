import React from "react";

const StudentList = (props) => {
  const isActive = () => {
    if (props.iAmActive === props.keyStud) return "active";
  };

  const iWasCicked = () => {
    props.callBack(props.keyStud, props.name);
  };

  const getKey = (name) => {
    return "https://ui-avatars.com/api/?background=random&name=" + name;
  };

  return (
    <ul
      className="list-group list-group-flush list my--3 text-dark ml-3 pl-1 border-b-grey cur-pointer "
      onClick={iWasCicked}
    >
      <li
        className={
          props.disabled
            ? "studList list-group-item background-grey-plus text-lightgrey2 " +
              isActive()
            : "studList list-group-item " + isActive()
        }
        tabIndex="1"
      >
        <div className="row align-items-center ">
          <img
            alt="placeholder"
            src={getKey(props.name)}
            className="w-15 rounded-25 m-0 p-0"
          />
          <div className="m-0 p-0 ml-3">
            <h6 className="m-0 p-0">{props.name}</h6>
            <small className="m-0 p-0 text-11">{props.grade}</small>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default StudentList;

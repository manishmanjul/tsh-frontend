import React from "react";

const AppList = (props) => {
  const isActive = () => {
    if (props.iAmActive === props.listKey) return "active";
  };

  const iWasCicked = () => {
    props.callBack(props.listKey, props.grade);
  };

  return (
    <ul
      className="list-group list-group-flush list my--3 text-dark border-b-grey cur-pointer "
      onClick={iWasCicked}
    >
      <li className={"appList list-group-item " + isActive()} tabIndex="1">
        <div className="row align-items-center pl-3">
          <i className="text-success glyphicon glyphicon-leaf" />
          <div className="m-0 p-0 ml-3">
            <h6 className="m-0 p-0">{props.item}</h6>
            <small className="m-0 p-0 text-11">{props.description}</small>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default AppList;

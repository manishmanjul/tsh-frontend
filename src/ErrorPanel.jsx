import React from "react";

const ErrorPanel = ({ heading, message, success }) => {
  const getCSS = () => {
    if (success) return "text-success";
    else return "text-danger";
  };

  return (
    <section className="w-75 d-flex flex-row">
      <h2 className={"text-high-tower p-0 m-0 " + getCSS()}>{heading} : </h2>
      <h4
        className={
          "font-weight-bold text-high-tower align-self-center pt-2 ml-3 m-0 " +
          getCSS()
        }
      >
        {message}
      </h4>
    </section>
  );
};

export default ErrorPanel;

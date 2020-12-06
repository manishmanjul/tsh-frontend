import React from "react";

const AlertModel = ({ heading, message, type, setResponse }) => {
  const closeMe = () => {
    document.getElementById("alert").style.display = "none";
  };

  const respond = (button) => {
    closeMe();

    if (button === "yes") {
      setResponse(true);
    } else if (button === "no") {
      setResponse(false);
    }
  };

  return (
    <div id="alert" className="w3-modal">
      <div className="w3-modal-content w3-animate-zoom w-49 border border-grey">
        <header className="w3-container background-dark-blue text-white">
          <span
            onClick={() => closeMe()}
            className="w3-button w3-display-topright w3-hover-red"
          >
            &times;
          </span>
          <h6>{heading}</h6>
        </header>
        <div className="w3-container pt-3 pb-3">
          <div className="w3-container h-100px text-dark text-center">
            <i className="glyphicon mr-3 large-plus1-text" />
            <h5>{message}</h5>
          </div>
        </div>

        <footer className="w3-container">
          <div className="d-flex flex-row justify-content-center">
            <button
              type="button"
              className=" w3-center btn btn-primary btn-sm rounded-lg mb-2 pl-5 pr-5"
              onClick={() =>
                type === "alert" ? respond("ok") : respond("yes")
              }
            >
              {type === "alert" ? "OK" : "Yes"};
            </button>
            {type === "confirm" ? (
              <button
                type="button"
                className=" w3-center btn btn-primary btn-sm rounded-lg mb-2 pl-5 pr-5"
                onClick={() => respond("no")}
              >
                No
              </button>
            ) : (
              <></>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AlertModel;

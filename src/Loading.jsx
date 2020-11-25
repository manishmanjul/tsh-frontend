import React from "react";

const Loading = () => {
  return (
    <div className="w-75 h-70 d-flex flox-row justify-content-center align-items-center">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;

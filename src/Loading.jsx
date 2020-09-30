import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="full-height d-flex flox-row justify-content-center align-items-center background-grey">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loading;

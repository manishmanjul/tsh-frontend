import React, { Component } from "react";
import FeedbackReport from "./FeedbackReport";

class BatchPlannerest extends Component {
  displayModel = () => {
    document.getElementById("feedbackReport").style.top = "-50px";
    document.getElementById("feedbackReport").style.display = "block";
  };

  render() {
    return (
      <div>
        <FeedbackReport step="4" studentName="Manish Manjul" />
        <button type="button" onClick={this.displayModel}>
          Click me
        </button>
      </div>
    );
  }
}

export default BatchPlannerest;

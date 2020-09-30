import React, { Component } from "react";

class FeedbackSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: this.props.loaded,
      success: this.props.success,
    };
  }

  closeMe = () => {
    document.getElementById("feedbackSubmit").style.display = "none";
  };

  getStatus = () => {
    if (this.props.success === true) {
      return " glyphicon-ok text-success";
    } else {
      return " glyphicon-remove text-danger";
    }
  };

  getText = () => {
    if (this.props.success === true) {
      return "Feedback Submitted Successfully !!!";
    } else {
      return (
        "Error " +
        this.props.errorCode +
        " - Submit Feedback failed. Try again after sometime."
      );
    }
  };

  render() {
    if (this.props.loaded === false) {
      return (
        <div id="feedbackSubmit" className="w3-modal myposition">
          <div className="w3-modal-content w3-animate-zoom d-flex flex-column text-center background-grey w-20 h-70 justify-content-center">
            <div
              className="spinner-border text-info align-self-center"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id="feedbackSubmit" className="w3-modal">
        <div className="w3-modal-content w3-animate-zoom w-49 border border-grey">
          <header className="w3-container background-dark-blue text-white">
            <span
              onClick={this.closeMe}
              className="w3-button w3-display-topright w3-hover-red"
            >
              &times;
            </span>
            <h6>Feedback Submit Status</h6>
          </header>
          <div className="w3-container pt-3 pb-3">
            <div className="w3-container h-100px text-dark text-center">
              <i
                className={"glyphicon mr-3 large-plus1-text" + this.getStatus()}
              />
              <h5>{this.getText()}</h5>
            </div>
          </div>

          <footer className="w3-container">
            <div className="d-flex flex-row justify-content-center">
              <button
                type="button"
                className=" w3-center btn btn-primary btn-sm rounded-lg mb-2 pl-5 pr-5"
                onClick={this.closeMe}
              >
                OK
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default FeedbackSubmit;

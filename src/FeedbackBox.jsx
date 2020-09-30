import React, { Component } from "react";

class FeedbackBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.boxClicked = this.boxClicked.bind(this);
    this.getBorderColor = this.getBorderColor.bind(this);
    this.getButtonProp = this.getButtonProp.bind(this);
    this.getextSize = this.getextSize.bind(this);
    this.geHeadertextSize = this.geHeadertextSize.bind(this);
  }

  async boxClicked() {
    // this.setState({ clicked: !this.state.clicked });
    this.state.clicked = !this.state.clicked;
    if (this.state.clicked) {
      if (this.props.onOnClick)
        this.props.onOnClick(this.props.keyId, this.props.heading);
    } else {
      if (this.props.onOffClick) this.props.onOffClick(this.props.keyId);
    }
  }

  getButtonProp() {
    if (this.state.clicked) return "border-green";
    else return "shadow-lg border-greyplus1";
  }

  getBorderColor() {
    if (this.state.clicked) return "green";
    else return "";
  }
  getextSize() {
    if (this.state.clicked) return "letter-s1";
    else return "letter-s1p5";
  }

  geHeadertextSize() {
    if (this.state.clicked) return "letter-s2p5";
    else return "letter-s3";
  }

  render() {
    if (this.props.reset) {
      this.state.clicked = false;
      this.props.resetDone();
    }

    if (this.props.selected) {
      this.state.clicked = this.props.selected;
    }

    return (
      <div
        id="feedBox"
        className={
          "w-20 h-70 mt-3 d-flex flex-column justify-content-between rounded feedbox " +
          this.getButtonProp()
        }
        onClick={this.boxClicked}
      >
        <p
          className={
            "w-100 text-uppercase text-primary text-Helvetica text-11 font-weight-bolder border-bottom grey text-center pt-2 pb-2 " +
            this.geHeadertextSize()
          }
        >
          {this.props.heading ? this.props.heading : "Dummy Header"}
        </p>
        <p
          className={
            "w-100 text-lightgrey2 text-Helvetica font-weight-light text-center pb-2 text-11 " +
            this.getextSize()
          }
        >
          {this.props.bodyText
            ? this.props.bodyText
            : "Learned the concept but needs support sometimes"}
        </p>
        <div
          className={
            "w-100 h-10 background-grad-vertical " + this.getBorderColor()
          }
        ></div>
      </div>
    );
  }
}

export default FeedbackBox;

import React, { Component } from "react";
import "./Footter.css";
import secure from "./images/positivessl_trust_seal_sm_124x32.png";

class Footter extends Component {
  render() {
    return (
      <div className="d-flex flex-row justify-content-end footer w-100">
        <div className="w-100 d-flex flex-column align-items-center footer">
          <p className="p-0 m-0 text-Palatino">
            The Study House - The Ponds, Sydney, NSW -2769.{" "}
          </p>
          <p className="p-0 m-0">thestudyhouse.com.au</p>
        </div>
        <img className="mr-2" src={secure} />
      </div>
    );
  }
}

export default Footter;

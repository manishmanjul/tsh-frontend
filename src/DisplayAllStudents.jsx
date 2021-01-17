import React, { Component } from "react";

class DisplayAllStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      groups: [],
      token: props.token,
    };
  }

  async componentDidMount() {
    var today = new Date();
    today =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/schedule",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
      }
    );
    const body = await response.json();
    this.setState({ groups: body, isLoading: false });
    if (this.props.setToParent) {
      this.props.setToParent(this.state.groups);
    }
  }

  render() {
    return <div></div>;
  }
}

export default DisplayAllStudents;

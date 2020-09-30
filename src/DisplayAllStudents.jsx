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
    const response = await fetch("/tsh/schedule?date=" + today, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    });
    const body = await response.json();
    this.setState({ groups: body, isLoading: false });
    console.log(body);
    if (this.props.setToParent) {
      this.props.setToParent(this.state.groups);
    }
  }

  render() {
    // const { groups, isLoading } = this.state;
    // if (isLoading) {
    //   return <p className="text-dark">Loading...</p>;
    // }

    return (
      // <div className="text-dark large-text">
      //   <h2> List of students </h2>
      //   <ul>
      //     {groups.map((group) => (
      //       <li key={group.key}>
      //         {group.day} : {group.startTime} - Grade: {group.grade}{" "}
      //         {group.course} {group.teacherName}
      //       </li>
      //     ))}
      //   </ul>
      // </div>
      <div></div>
    );
  }
}

export default DisplayAllStudents;

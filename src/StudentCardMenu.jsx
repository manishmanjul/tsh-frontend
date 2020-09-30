import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import "./StudentCardMenu.css";

class StudentCardMenu extends Component {
  render() {
    return (
      <DropdownButton
        as={ButtonGroup}
        key="key1"
        id="id1"
        variant=""
        title=""
        className="p-0 m-0 rounded-lg border-top-0 border-right-0 border-bottom-0"
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownButton>
    );
  }
}

export default StudentCardMenu;

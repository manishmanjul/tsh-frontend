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
        <Dropdown.Item
          className="medium-plus-text text-darkgrey text-Palatino"
          eventKey={this.props.evtKey}
          onClick={() =>
            this.props.markAbsent(
              this.props.studName,
              this.props.studentBatchId
            )
          }
        >
          Mark Absent
        </Dropdown.Item>
        {/* <Dropdown.Item className="medium-plus-text text-darkgrey text-Palatino">
          View Topic Progress
        </Dropdown.Item>
        <Dropdown.Item className="medium-plus-text text-darkgrey text-Palatino">
          View/Manage Feeback
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="medium-plus-text text-darkgrey text-Palatino">
          Report Concerns
        </Dropdown.Item> */}
      </DropdownButton>
    );
  }
}

export default StudentCardMenu;

import React, { Component } from "react";
import Toggle from "react-toggle";
import "./SubHeader.css";
import { Accordion } from "react-bootstrap";

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mathsActive: true,
      englishActive: true,
      gaActive: true,
      showAllActive: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {
    const features = this.props.features;
    var authorizeAllTeachers = false;
    if (features) {
      if (features.some((item) => item.name === "All Teachers")) {
        authorizeAllTeachers = true;
      }
    }
    return (
      <Accordion>
        <div className="d-flex fluid m-0 pt-3 pb-3 justify-content-between">
          <div className="d-flex flex-row">
            <Toggle
              defaultChecked={this.state.mathsActive}
              onChange={this.onToggle}
            />
            <div className="ml-2 text-dark align-self-center large-text font-weight-bold">
              Maths
            </div>
          </div>
          <div className="d-flex flex-row">
            <Toggle
              defaultChecked={this.state.englishActive}
              onChange={this.onToggle}
            />
            <div className="ml-2 text-dark align-self-center large-text font-weight-bolder">
              English
            </div>
          </div>
          <div className="d-flex flex-row">
            <Toggle
              defaultChecked={this.state.gaActive}
              onChange={this.onToggle}
            />
            <div className="ml-2 text-dark align-self-center large-text font-weight-bolder">
              G.A
            </div>
          </div>

          <Accordion.Toggle eventKey="100" className="bg-white border-0">
            {authorizeAllTeachers ? (
              <div className="d-flex flex-row bg-white">
                <Toggle
                  defaultChecked={this.state.showAllActive}
                  onChange={this.onToggle}
                />
                <div className="ml-2 text-dark align-self-center large-text font-weight-bolder">
                  All Teachers
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="100">
          <div className="d-flex flex-row shadow  mt-2 ml-4 mr-4 mb-4 pt-4 pl-4 pb-4 rounded-10 text-dark">
            <select className="custom-select w-15 h-40 rounded-10 mr-3 medium-text">
              <option defaultValue>Filter By Teacher</option>
              <option value="1">Manish</option>
              <option value="2">Rahul</option>
              <option value="3">Tanya</option>
              <option value="4">Nitu</option>
              <option value="5">Raunav</option>
              <option value="6">Maahika</option>
              <option value="7">Vipneet</option>
              <option value="8">Janani</option>
            </select>

            <select className="custom-select w-15 h-40 rounded-10 mr-3 medium-text">
              <option defaultValue>Filter By Grade</option>
              <option value="1">Year 3</option>
              <option value="2">Year 4</option>
              <option value="3">Year 5</option>
              <option value="4">Year 6</option>
              <option value="5">Year 7</option>
              <option value="6">Year 8</option>
              <option value="7">Year 9</option>
              <option value="8">Year 10</option>
              <option value="9">Year 11</option>
              <option value="10">Year 12</option>
            </select>
            <div className="d-flex flex-row ml-4 pr-5 grey-light-border align-self-center h-40 w-35 rounded-10 align-content-center justify-content-between  shadow-sm">
              <div className="d-flex justify-content-center rounded-left-10 background-grey pl-3 pr-3 align-items-center">
                <span className="medium-text text-dark align-self-center">
                  Sort by
                </span>
              </div>
              <div className="custom-control custom-radio align-self-center">
                <input
                  type="radio"
                  id="customRadio1"
                  name="customRadio"
                  className="custom-control-input align-self-ce nter"
                />
                <label
                  className="custom-control-label medium-text"
                  for="customRadio1"
                >
                  Teacher
                </label>
              </div>
              <div className="custom-control custom-radio align-self-center">
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  className="custom-control-input align-self-ce nter"
                />
                <label
                  className="custom-control-label medium-text"
                  for="customRadio2"
                >
                  Subject
                </label>
              </div>
              <div className="custom-control custom-radio align-self-center mr-5">
                <input
                  type="radio"
                  id="customRadio3"
                  name="customRadio"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label medium-text"
                  for="customRadio3"
                >
                  Batch Time
                </label>
              </div>
            </div>
            <div className="d-flex align-self-center active-cyan-3 active-cyan-4 ml-5 rounded-10 h-40 w-15">
              <input
                className="form-control rounded-10 h-40 medium-text text-lightgrey"
                type="text"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
            <button
              type="button"
              className="btn btn-warning h-35px rounded-10 ml-5 medium-text text-darkgrey"
            >
              Clear Filter
            </button>
          </div>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}
export default SubHeader;

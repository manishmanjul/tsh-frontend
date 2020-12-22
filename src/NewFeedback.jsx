import React from "react";

const NewFeedback = ({ grade, gradeList, section }) => {
  const submitForm = async () => {};

  const getAllTeachers = async () => {};

  const handleChange = (e) => {};

  return (
    <section className="w-100 border mt-5 background-grey-plus shadow-lg align-self-center">
      <h3 className="text-high-tower mt-1">
        Create New Feedback for Grade {grade} - {section} category.
      </h3>
      <form
        className="form-inline w-100 d-flex flex-row justify-content-start flex-wrap pl-1 pr-2"
        onSubmit={submitForm}
      >
        <div className="input-group mb-2 mr-sm-2 w-50 d-flex justify-content-center flex-nowrap">
          <div className="input-group-prepend">
            <div className="input-group-text">Description</div>
          </div>
          <input
            type="text"
            className="form-control w-50"
            id="inlineFormInputGroupDescription"
            placeholder="Description"

            // onChan1ge={}
          />
        </div>
        <div className="input-group mb-2 mr-sm-2 w-47 d-flex justify-content-center flex-nowrap">
          <div className="input-group-prepend">
            <div className="input-group-text">Short Description</div>
          </div>
          <input
            type="text"
            className="form-control w-75"
            id="inlineFormInputGroupShort"
            placeholder="Short Description"
            // onChange={}
          />
        </div>
        <div className="input-group mb-2 mr-sm-2 w-50">
          <div className="input-group-prepend">
            <div className="input-group-text">Criteria</div>
          </div>
          <input
            type="text"
            className="form-control w-75"
            id="inlineFormInputGroupCriteria"
            placeholder="Criteria"
            // onChange={}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary mb-2">
          Add Feedback Item
        </button>
      </form>
    </section>
  );
};

export default NewFeedback;

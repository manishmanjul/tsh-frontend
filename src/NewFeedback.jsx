import React, { useEffect, useState } from "react";

const NewFeedback = ({ selection, grade, refresh, source }) => {
  const [validation, setValidation] = useState({
    descProp: "",
    descMsg: "Description",
    shortProp: "",
    shortMsg: "Order",
  });
  const [description, setDescription] = useState("");
  const [short, setShort] = useState("");
  const [criteria, setCriteria] = useState("");
  const [status, setStatus] = useState({
    code: 0,
    msg: "",
  });

  const submitForm = async () => {
    if (description == "") {
      setValidation({
        descProp: "background-pink",
        descMsg: "Description cannot be blank",
        shortProp: validation.orderProp,
        shortMsg: validation.orderMsg,
      });
      return;
    } else {
      setValidation({
        descProp: "",
        descMsg: "Description",
        shortProp: validation.orderProp,
        shortMsg: validation.orderMsg,
      });
    }

    if (short == "") {
      setValidation({
        descProp: "",
        descMsg: validation.descMsg,
        shortProp: "background-pink",
        shortMsg: "Short Description cannot be blank",
      });
      return;
    } else {
      setValidation({
        descProp: validation.descProp,
        descMsg: validation.descMsg,
        shortProp: "",
        shortMsg: "short",
      });
    }

    addFeedbackItem();
  };

  const addFeedbackItem = async () => {
    const dataToSend = {
      description: description,
      active: true,
      shortDescription: short,
      criteria: criteria,
      category: selection.default == "" ? selection.grade : selection.default,
    };
    var gradeText = grade == 0 ? "Default Category?" : "Grade " + grade + "?";
    var ans = window.confirm(
      "Do you want to add " +
        description +
        " as a Feedback item for " +
        gradeText
    );
    if (!ans) return;

    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/feedback/addFeedback",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );

    if (response.status === 202) {
      setStatus({
        code: 1,
        msg:
          "Successfully created a new Feedback item : " +
          description +
          " for " +
          gradeText,
      });
    } else {
      setStatus({
        code: 2,
        msg: "Something went wrong " + response.statusText,
      });
    }
  };

  const clearModel = () => {
    setStatus({ code: 0, msg: "" });
    setDescription("");
    setShort("");
    setCriteria("");
    if (status.code == 1) refresh(true, source);
  };

  const getGrade = () => {
    var gradetext = "";
    if (selection.default == "")
      gradetext = "Grade " + grade + " - " + selection.catName + " category.";
    else gradetext = "Default - " + selection.catName + " category.";

    return gradetext;
  };

  return (
    <section className="w-100 d-flex flex-column justify-content-center align-items-center border mt-5 background-grey-plus shadow-lg align-self-center">
      <h3 className="text-high-tower mt-1">
        {"Create New Feedback for " + getGrade()}
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
            className={"form-control w-50 " + validation.descProp}
            id="inlineFormInputGroupDescription"
            placeholder={validation.descMsg}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="input-group mb-2 mr-sm-2 w-47 d-flex justify-content-center flex-nowrap">
          <div className="input-group-prepend">
            <div className="input-group-text">Short Description</div>
          </div>
          <input
            type="text"
            className={"form-control w-75 " + validation.shortProp}
            id="inlineFormInputGroupShort"
            placeholder={validation.shortMsg}
            onChange={(e) => setShort(e.target.value)}
            value={short}
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
            onChange={(e) => setCriteria(e.target.value)}
            value={criteria}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary mb-2">
          Add Feedback Item
        </button>
      </form>

      {status.code !== 0 ? (
        <div
          className={
            status.code === 1
              ? "alert w-75 alert-success pt-0"
              : "alert w-75 alert-danger"
          }
          role="alert"
          onClick={() => setStatus({ code: 0, msg: "" })}
        >
          <h4 className="alert-heading">
            {status.code === 1 ? "Success !!" : "!! Error !!"}
          </h4>
          <p>{status.msg}</p>
          <button
            type="button"
            className={
              status.code === 1
                ? "btn btn-sm btn-success"
                : "btn btn-sm btn-danger"
            }
            onClick={() => clearModel()}
          >
            OK
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default NewFeedback;

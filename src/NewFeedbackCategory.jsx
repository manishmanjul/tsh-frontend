import React, { useEffect, useState } from "react";

const NewFeedbackCategory = ({ grade }) => {
  const [validation, setValidation] = useState({
    descProp: "",
    descMsg: "Description",
    orderProp: "",
    orderMsg: "Order",
  });
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState({
    code: 0,
    msg: "",
  });

  const submitForm = async () => {
    if (description === "") {
      setValidation({
        descProp: "background-pink",
        descMsg: "Description cannot be blank",
        orderProp: validation.orderProp,
        orderMsg: validation.orderMsg,
      });
      return;
    } else {
      setValidation({
        descProp: "border border-success",
        descMsg: "Description",
        orderProp: validation.orderProp,
        orderMsg: validation.orderMsg,
      });
    }

    if (order === "") {
      setValidation({
        descProp: validation.descProp,
        descMsg: validation.descMsg,
        orderProp: "background-pink",
        orderMsg: "Order cannot be blank",
      });
      return;
    } else {
      setValidation({
        descProp: validation.descProp,
        descMsg: validation.descMsg,
        orderProp: "",
        orderMsg: "Order",
      });
    }

    if (isNaN(order)) {
      setOrder("");
      setValidation({
        descProp: validation.descProp,
        descMsg: validation.descMsg,
        orderProp: "background-pink",
        orderMsg: "Order should be an Integer",
      });
      return;
    } else {
      setValidation({
        descProp: validation.descProp,
        descMsg: validation.descMsg,
        orderProp: "",
        orderMsg: "Order",
      });
    }
  };

  useEffect(() => {
    setDescription("");
    setOrder("");
  }, [grade]);

  return (
    <section className="w-100 d-flex flex-column justify-content-center align-items-center border mt-5 background-grey-plus shadow-lg">
      <h3 className="text-high-tower mt-1">
        Create New Feedback Category for{" "}
        {grade === "0" ? "Default Category" : "Grade " + grade}
      </h3>
      <form
        className="form-inline w-100 d-flex flex-row justify-content-around"
        onSubmit={submitForm}
      >
        <div className="input-group mb-2 mr-sm-2 w-50 d-flex justify-content-center flex-nowrap">
          <div className="input-group-prepend">
            <div className="input-group-text">Description</div>
          </div>
          <input
            type="text"
            className={"form-control w-75 " + validation.descProp}
            id="inlineFormInputGroupDescription"
            placeholder={validation.descMsg}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="input-group mb-2 mr-sm-2 w-47 d-flex justify-content-center flex-nowrap">
          <div className="input-group-prepend">
            <div className="input-group-text">Order</div>
          </div>
          <input
            type="text"
            className={"form-control w-75 " + validation.orderProp}
            id="inlineFormInputGroupOrder"
            placeholder={validation.orderMsg}
            onChange={(e) => setOrder(e.target.value)}
            value={order}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary mb-2">
          Add Category
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
          {status.msg}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default NewFeedbackCategory;

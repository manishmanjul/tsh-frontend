import React, { useEffect, useState } from "react";

const CreateTopics = () => {
  const [topics, setTopics] = useState([]);
  const [selection, setSelection] = useState({
    gradeProp: "",
    termProp: "",
    weekProp: "",
    subjectProp: "",
    chapterProp: "",
    descriptionProp: "",
    topicNameProp: "",
    messageProp: "text-danger",
    messageString: "",
  });

  const [oneItem, setOneItem] = useState({
    grade: "0",
    term: "0",
    week: "0",
    course: "",
    chapter: "",
    description: "",
    topicName: "",
  });

  const [topicMaster, setTopicMaster] = useState({});

  const resetOneItem = () => {
    setOneItem({
      grade: "0",
      term: "0",
      week: "0",
      course: "",
      chapter: "",
      description: "",
      topicName: "",
    });
  };

  const getTopicMasterData = async () => {
    const response = await fetch(
      sessionStorage.getItem("proxy") + "/tsh/topicmanager/getTopicData",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      }
    );
    const tempData = await response.json();
    setTopicMaster(tempData);
  };

  useEffect(() => {
    getTopicMasterData();
  }, []);

  const formSubmit = () => {
    if (oneItem.term === "0") {
      setSelection({
        ...selection,
        termProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Mandatory field Term. Select an option.",
      });
      return;
    } else {
      setSelection({ ...selection, termProp: "", messageString: "" });
    }

    if (oneItem.week === "0") {
      setSelection({
        ...selection,
        weekProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Mandatory field Week. Select an option.",
      });
      return;
    } else {
      setSelection({ ...selection, weekProp: "", messageString: "" });
    }

    if (oneItem.grade === "0") {
      setSelection({
        ...selection,
        gradeProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Mandatory field grade. Select an option.",
      });
      return;
    } else {
      setSelection({ ...selection, gradeProp: "", messageString: "" });
    }

    if (oneItem.course === "") {
      setSelection({
        ...selection,
        subjectProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Mandatory field subject. Select an option.",
      });
      return;
    } else {
      setSelection({ ...selection, subjectProp: "", messageString: "" });
    }

    if (oneItem.chapter === "") {
      setSelection({
        ...selection,
        chapterProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Chapter cannot be blank.",
      });
      return;
    } else {
      setSelection({ ...selection, chapterProp: "", messageString: "" });
    }

    if (oneItem.topicName === "") {
      setSelection({
        ...selection,
        topicNameProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Topic Name cannot be blank.",
      });
      return;
    } else {
      setSelection({ ...selection, topicNameProp: "", messageString: "" });
    }

    if (oneItem.description === "") {
      setSelection({
        ...selection,
        descriptionProp: "background-pink",
        messageProp: "text-danger",
        messageString: "Description cannot be blank.",
      });
      return;
    } else {
      setSelection({ ...selection, descriptionProp: "", messageString: "" });
    }

    var temptopics = [...topics];
    temptopics.push({ ...oneItem });
    resetOneItem();
    setTopics([...temptopics]);
  };

  const deleteItem = (idx) => {
    var temptopics = [];
    for (var i = 0; i < topics.length; i++) {
      if (i !== idx) temptopics.push({ ...topics[i] });
    }

    setTopics([...temptopics]);
  };

  const createTopics = async () => {
    if (topics.length <= 0) {
      window.alert(
        "No new topics found. Nothing to create. Please click Add Topic to generate new topics first"
      );
      return;
    } else {
      if (
        window.confirm(
          "Do you want to create " +
            topics.length +
            " new topics? Confirm(Yes/No)"
        )
      ) {
        var datatosend = { topicRequest: topics };

        const response = await fetch(
          sessionStorage.getItem("proxy") + "/tsh/topicmanager/createTopic",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("jwt"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datatosend),
          }
        );

        if (response.status === 202) {
          setSelection({
            ...selection,
            messageProp: "text-success",
            messageString: "Successfully created " + topics.length + " topics",
          });
          setTopics([]);
        } else {
          setSelection({
            ...selection,
            messageProp: "text-danger",
            messageString:
              "Unable to create Topics. Internal Server error. Try again later.",
          });
        }
      }
    }
  };

  return (
    <section className="d-flex flex-column justify-content-center align-items-center w-100 text-dark">
      <h3 className="text-high-tower">New Topics</h3>
      <div className="w-85 border-t-grey shadow rounded-lg ">
        <div className="d-flex flex-row background-dark-blue text-center text-georgia text-white large-text m-0 pl-0">
          <p className="p-0 m-0 left-border-grey bottom-border-grey right-border-grey1px w-5">
            Term
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-10">
            Week
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-10">
            Grade
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-10">
            Subject
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-15">
            Chapter
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-24">
            Topic Name
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-24">
            Description
          </p>
          <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-2"></p>
        </div>
        {topics.length <= 0 ? (
          <div className="w-100 m-0 p-0 background-grey text-12 text-center font-weight-bold">
            Click 'Add Topic' to create new topic
          </div>
        ) : (
          topics.map((t, index) => (
            <div className="d-flex flex-row w-100 m-0 p-0 text-13 text-center font-weight-bold bg-white">
              <p className="p-0 m-0 left-border-grey bottom-border-grey right-border-grey1px w-5">
                {t.term}
              </p>
              <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-10">
                {t.week}
              </p>
              <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-10">
                {t.grade}
              </p>
              <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-10">
                {t.course}
              </p>
              <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-15">
                {t.chapter}
              </p>
              <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-24">
                {t.topicName}
              </p>
              <p className="p-0 m-0 bottom-border-grey right-border-grey1px w-24">
                {t.description}
              </p>
              <p
                className="p-0 m-0 bottom-border-grey right-border-grey1px w-2 large-text glyphicon glyphicon-remove-circle text-danger cur-pointer"
                tabIndex="100"
                title="Delete this item"
                onClick={() => deleteItem(index)}
              ></p>
            </div>
          ))
        )}
      </div>
      <button
        type="button"
        className="mt-3 mb-3 btn btn-primary rounded"
        onClick={createTopics}
      >
        Create Topics
      </button>

      <h3 className="text-high-tower mt-4">
        Add Topic Details & Click Add Topic
      </h3>
      <div
        className={
          "large-text mt-0 mb-0 text-georgia text-center h-40 " +
          selection.messageProp
        }
      >
        {selection.messageString}
      </div>
      <form
        className="form-inline mb-3 mt-0 w-85 pt-5 d-flex flex-column justify-content-around border-t-grey shadow rounded-lg border"
        onSubmit={formSubmit}
      >
        <div className="d-flex flex-row justify-content-between w-100 m-0 p-0 pl-2 pr-2 ">
          <div className="input-group mb-2 w-20 d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend w-35">
              <div className="input-group-text w-100 d-flex flex-row justify-content-center ">
                Term
              </div>
            </div>
            <select
              className={
                "custom-select w-75 h-40 rounded-10 mr-3 medium-text " +
                selection.termProp
              }
              onChange={(e) => setOneItem({ ...oneItem, term: e.target.value })}
              onClick={() =>
                setSelection({ ...selection, termProp: "", messageString: "" })
              }
              value={oneItem.term}
            >
              <option value="0" defaultValue>
                Select
              </option>
              {topicMaster && topicMaster.terms ? (
                topicMaster.terms.map((t) => (
                  <option value={t.term} key={t.id}>
                    {t.description}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>

          <div className="input-group mb-2 mr-sm-2 w-20  d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend w-35">
              <div className="input-group-text w-100 d-flex flex-row justify-content-center ">
                Week
              </div>
            </div>
            <select
              className={
                "custom-select w-75 h-40 rounded-10 mr-3 medium-text " +
                selection.weekProp
              }
              onChange={(e) => setOneItem({ ...oneItem, week: e.target.value })}
              onClick={() =>
                setSelection({ ...selection, weekProp: "", messageString: "" })
              }
              value={oneItem.week}
            >
              <option value="0" defaultValue>
                Select
              </option>
              {topicMaster && topicMaster.week ? (
                topicMaster.week.map((w) => (
                  <option value={w.weekNumber} key={w.id}>
                    {w.description}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>

          <div className="input-group mb-2 mr-sm-2 w-20  d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend w-35">
              <div className="input-group-text w-100 d-flex flex-row justify-content-center ">
                Grade
              </div>
            </div>
            <select
              className={
                "custom-select w-75 h-40 rounded-10 mr-3 medium-text " +
                selection.gradeProp
              }
              onChange={(e) =>
                setOneItem({ ...oneItem, grade: e.target.value })
              }
              onClick={() =>
                setSelection({ ...selection, gradeProp: "", messageString: "" })
              }
              value={oneItem.grade}
            >
              <option value="0" defaultValue>
                Select
              </option>
              {topicMaster && topicMaster.grades ? (
                topicMaster.grades.map((g) => (
                  <option value={g.grade} key={g.id}>
                    {"Grade " + g.grade}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>

          <div className="input-group mb-2 mr-sm-2 w-20  d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend w-35">
              <div className="input-group-text w-100 d-flex flex-row justify-content-center ">
                subject
              </div>
            </div>
            <select
              className={
                "custom-select w-75 h-40 rounded-10 mr-3 medium-text " +
                selection.subjectProp
              }
              onChange={(e) =>
                setOneItem({ ...oneItem, course: e.target.value })
              }
              onClick={() =>
                setSelection({
                  ...selection,
                  subjectProp: "",
                  messageString: "",
                })
              }
              value={oneItem.course}
            >
              <option value="0" defaultValue>
                Select
              </option>
              {topicMaster && topicMaster.rCourse ? (
                topicMaster.rCourse.map((s) => (
                  <option value={s.shortDescription} key={s.id}>
                    {s.shortDescription}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-start w-100 m-0 mt-3 p-0 pl-0 pr-0">
          <div className="input-group m-0 mb-2 w-25 d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend m-0 w-30">
              <div className="input-group-text w-100">Chapter</div>
            </div>
            <input
              type="text"
              className={"form-control w-70 " + selection.chapterProp}
              id="inlineFormInputGroupDescription"
              placeholder="Chapter"
              onChange={(e) =>
                setOneItem({ ...oneItem, chapter: e.target.value })
              }
              onClick={() =>
                setSelection({
                  ...selection,
                  chapterProp: "",
                  messageString: "",
                })
              }
              value={oneItem.chapter}
            />
          </div>
          <div className="input-group mb-2 mr-sm-2 w-35 d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend w-30">
              <div className="input-group-text w-100">Topic Name</div>
            </div>
            <input
              type="text"
              className={"form-control w-70 " + selection.topicNameProp}
              id="inlineFormInputGroupDescription"
              placeholder="Topic Name"
              onChange={(e) =>
                setOneItem({ ...oneItem, topicName: e.target.value })
              }
              onClick={() =>
                setSelection({
                  ...selection,
                  topicNameProp: "",
                  messageString: "",
                })
              }
              value={oneItem.topicName}
            />
          </div>
          <div className="input-group mb-2 w-40 d-flex justify-content-center flex-nowrap">
            <div className="input-group-prepend w-30">
              <div className="input-group-text w-100">Description</div>
            </div>
            <input
              type="text"
              className={"form-control w-70 " + selection.descriptionProp}
              id="inlineFormInputGroupDescription"
              placeholder="Description"
              onChange={(e) =>
                setOneItem({ ...oneItem, description: e.target.value })
              }
              onClick={() =>
                setSelection({
                  ...selection,
                  descriptionProp: "",
                  messageString: "",
                })
              }
              value={oneItem.description}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded shadow-sm mt-4 mb-3"
        >
          Add Topic
        </button>
      </form>
    </section>
  );
};

export default CreateTopics;

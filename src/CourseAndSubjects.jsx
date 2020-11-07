import React from "react";

const CourseAndSubject = ({ subject, addRemove }) => {
  const handleClick = (name, subject) => {
    let course = { description: subject.name + " " + name, id: subject.id };
    addRemove(course);
  };

  return (
    <div className="w-75 d-flex flex-row">
      <div className="w-20 border-grey mb-1 mr-2 background-grad darkblue text-palatino text-11 text-white font-weight-bold letter-s1 text-capitalcase text-center pt-1">
        {subject.name}
      </div>
      {subject.subjects ? (
        subject.subjects.map((s) => (
          <button
            type="button"
            key={s.id}
            className="course btn btn-outline-secondary mr1 mb-1 w-25 border-grey text-11 text-high-tower font-weight-light letter-s1 text-uppercase"
            data-toggle="button"
            aria-pressed="false"
            value={s.id}
            onClick={() => handleClick(subject.name, s)}
          >
            {s.name}
          </button>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CourseAndSubject;

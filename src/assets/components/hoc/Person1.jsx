import React from "react";
import UpdatedComponent from "./Hoc";

const Person1 = (props) => {

  return (
    <div>
      <h3>
        Roman Reigns is offering the Amount of ${props.count}
        <button onClick={props.increaseHandler}>Increase</button>
      </h3>
    </div>
  );
};

export default UpdatedComponent(Person1);
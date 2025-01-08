import React from "react";
import UpdatedComponent from "./Hoc";

const Person2 = (props) => {

  return (
    <div>
      <h3>
        Jimmy USO is offering the Amount of ${props.count}{" "}
        <button onClick={props.increaseHandler}>Increase</button>
      </h3>
    </div>
  );
};

export default UpdatedComponent(Person2);
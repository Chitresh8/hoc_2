import React, { useState } from "react";

const UpdatedComponent = (OriginalComponent) => {
  const withCountFn = () => {
    const [count, setCount] = useState(10);

    const increaseHandler = () => {
      setCount(count * 2);
    };
    return (
      <OriginalComponent increaseHandler={increaseHandler} count={count} />
    );
  };
  return withCountFn;
};
export default UpdatedComponent;

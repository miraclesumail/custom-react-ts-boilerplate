import React, { useContext } from "react";
import { ReducerContext } from "../routes";

const renderList = item => (
  <li key={item.name}>
    {item.name}--{item.age}
  </li>
);

export default () => {
  const [state, disptch] = useContext(ReducerContext);
  return <div>{state.list && state.list.map(renderList)}</div>;
};

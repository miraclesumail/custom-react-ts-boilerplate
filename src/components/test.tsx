import React, { Component, useEffect } from "react";
import reactDom from "react-dom";
import api from "@src/utils/api-request";

const Portal: React.FC<any> = ({ children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    // (async function getData() {
    //   const data = await fetch("/api/data");
    //   console.log(await data.json());
    // })();

    (async function getData() {
      const data = await api.request("/api/save", "post", {
        method: "post",
        body: JSON.stringify({ name: "qqqq", age: 18 })
      });
      console.log(data);
    })();
  }, []);

  return <div>www</div>;
};

export default Portal;

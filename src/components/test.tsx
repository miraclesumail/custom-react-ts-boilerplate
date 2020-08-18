import React, { Component, useEffect } from "react";
import reactDom from "react-dom";

const Portal: React.FC<any> = ({ children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    // (async function getData() {
    //   const data = await fetch("/api/data");
    //   console.log(await data.json());
    // })();

    (async function getData() {
      const data = await fetch("/api/save", {
        method: "post",
        body: JSON.stringify({ name: "qqqq", age: 18 }),
        headers: {
          "content-type": "application/json"
        }
      });
      console.log(await data.json());
    })();
  }, []);

  return <div>www</div>;
};

export default Portal;

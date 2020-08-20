import React, { Component } from "react";

export function Decrator1(msg): any {
  return Cmp => {
    return class Test extends Component {
      public componentDidMount() {
        console.log("componentDidMount", msg);
      }

      render() {
        return <Cmp {...this.props} />;
      }
    };
  };
}

export function debounce(time) {
  return function(target, property, descriptor) {
    const func = descriptor.value;
    let timer = null;
    descriptor.value = function(...args) {
      console.log(target, "property");
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        console.log(this, "what is this");
        func.apply(this, args);
      }, time);
    };

    return descriptor;
  };
}

enum eventsMap {
  create,
  destroy
}

function reportEvent(event: string) {
  return function(target, property, descriptor) {
    const func = descriptor.value;

    descriptor.value = function(...args) {
      if (eventsMap[event]) {
        this.props.dispatch({
          type: event,
          payload: {
            name: localStorage.getItem("name"),
            time: Date.now()
          }
        });
      }

      func.apply(this.args);
    };

    return descriptor;
  };
}

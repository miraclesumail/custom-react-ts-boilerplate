import React, { Component, useEffect } from "react";
import reactDom, { createPortal } from "react-dom";

const Portal: React.FC<any> = ({ children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return createPortal(children, el);
};

class App extends Component<any, { name: string }> {
  public state = {
    name: "www"
  };

  public render() {
    return (
      <div>
        <div>hp\\\p</div>
        <Portal>
          <span>dkkkd</span>
        </Portal>
      </div>
    );
  }
}

reactDom.render(<App />, document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept();
}

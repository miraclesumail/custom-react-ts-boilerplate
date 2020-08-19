import React, { Component, useEffect } from "react";
import reactDom, { createPortal } from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import Test from "./components/test";
import Routes from "./routes";
import 'antd-mobile/dist/antd-mobile.min.css';

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
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          {/*<Portal>
            <span>dkllkkk jkkk</span>
          </Portal>
          <Test />*/}
        </div>
        <Routes />
      </BrowserRouter>
    );
  }
}

reactDom.render(<App />, document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept();
}

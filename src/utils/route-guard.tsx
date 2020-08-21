import React, { Component } from "react";
import { Redirect } from "react-router-dom";

interface Props {
  needLogin?: boolean;
  renderer: any;
}

class RouteGuard extends Component<Props, any> {
  public state = {
    Component: null
  };

  componentDidMount() {
    const { renderer } = this.props;
    if (this.isAccessible()) {
      this.setState({
        Component: renderer
      });
    }
  }

  public isAccessible = () => {
    const { needLogin } = this.props;
    return !needLogin || localStorage.getItem("token");
  };

  render() {
    const { needLogin } = this.props;
    const { Component } = this.state;
    const forbid = this.isAccessible();
    return !forbid ? (
      <Redirect to="/login" />
    ) : Component ? (
      <Component {...this.props} />
    ) : null;
  }
}

export default RouteGuard;

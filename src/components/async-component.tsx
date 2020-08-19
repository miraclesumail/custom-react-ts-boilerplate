import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  return class Container extends Component<any, any> {
    public state = {
      component: null
    };

    public componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
}

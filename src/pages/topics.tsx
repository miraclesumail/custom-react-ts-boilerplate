import React, { Component } from "react";
import { Drawer, List, NavBar, Icon } from "antd-mobile";
import { autobind } from "core-decorators";
import { Decrator1, debounce } from "@src/utils/decrators";
import "../css/topic.css";

@Decrator1("what")
class componentName extends Component {
  state = {
    docked: false
  };

  onDock = d => {
    this.setState({
      [d]: !this.state[d]
    });
  };

  @autobind
  @debounce(3000)
  public onClick() {
    console.log("you clicked this");
  }

  render() {
    const sidebar = (
      <List>
        {[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15
        ].map((i, index) => {
          if (index === 0) {
            return (
              <List.Item
                key={index}
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                multipleLine
              >
                Category
              </List.Item>
            );
          }
          return (
            <List.Item
              key={index}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            >
              Category{index}
            </List.Item>
          );
        })}
      </List>
    );

    return (
      <div style={{ height: "100%" }}>
        <NavBar
          icon={<Icon type="ellipsis" />}
          onLeftClick={() => this.onDock("docked")}
        >
          Docked in document
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          contentStyle={{
            color: "#A6A6A6",
            textAlign: "center",
            paddingTop: 42
          }}
          sidebarStyle={{ border: "1px solid #ddd" }}
          sidebar={sidebar}
          docked={this.state.docked}
        >
          <div onClick={this.onClick}> Click upper-left corner</div>
        </Drawer>
      </div>
    );
  }
}

export default componentName;

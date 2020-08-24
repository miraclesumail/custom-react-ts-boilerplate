import React, { Component } from "react";

class Mine extends Component<any, any> {
  public getRenderText = () => {
    const { isBomb, bombCount, isChecked, isMarked } = this.props;
    if (isChecked) {
      return isBomb ? "💣" : bombCount ? bombCount : "";
    } else if (isMarked) {
      return "🚩";
    } else {
      return "";
    }
  };

  render() {
    const { handleClick, onMark, isChecked } = this.props;
    return (
      <div
        className={isChecked ? "cell active" : "cell"}
        onClick={handleClick}
        onContextMenu={onMark}
      >
        {this.getRenderText()}
      </div>
    );
  }
}

export default Mine;

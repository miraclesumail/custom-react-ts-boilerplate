import React from "react";
import animateComp from "@src/components/animate-component";
import "@src/css/home.css";
import api from "@src/utils/api-request";

const Test: React.FunctionComponent<any> = ({ forwardRef }) => {
  return <div ref={forwardRef} className="block" />;
};

const Danc = React.forwardRef((props, forwardRef) => (
  <Test {...props} forwardRef={forwardRef} />
));

const animateOptions = {
  keyframes: [
    { translateY: -40 },
    { translateX: 250 },
    { translateY: 40 },
    { translateX: 0 },
    { translateY: 0 },
  ],
  duration: 4000,
  easing: "easeOutElastic(1, .8)",
  loop: true,
};

const Ele = animateComp(
  // {
  //   translateX: 250,
  //   width: {
  //     value: "*=1.5"
  //   },
  //   delay: 1000,
  //   rotate: "1turn",
  //   direction: "alternate",
  //   duration: 2000
  // },
  animateOptions,
  Danc
);

class FancyButton extends React.Component {
  private ref = React.createRef<any>();

  componentDidMount() {
    console.log(this.props, "axiab");
  }

  render() {
    return <Ele ref={this.ref} />;
  }
  // ...
}

export default class App extends React.Component {
  popupRef = React.createRef();

  componentDidMount() {
    console.log("this is popupRef", this.popupRef.current);
    api
      .request("/common/getTodo", "post", {
        body: JSON.stringify({
          task: "sleeping",
        }),
        timeOut: 20,
      })
      .then((res: any) => {
        console.log(res);
      });
  }

  render() {
    return <Ele ref={this.popupRef} />;
  }
}

/*export default () => {
  return (
    <div>
      homelkjlll
      <Ele />
    </div>
  );
};*/

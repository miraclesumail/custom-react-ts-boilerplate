import React from "react";
import { Switch, Route } from "react-router-dom";
import AsyncComponent from "./components/async-component";

const routes: any[] = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Home" */ "./pages/home")
    )
  },
  {
    name: "about",
    path: "/about",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "About" */ "./pages/about")
    )
  },
  {
    name: "topics",
    path: "/topics",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Topic" */ "./pages/topics")
    )
  }
];

export default () => {
  return (
    <Switch>
      {routes.map(item => (
        <Route
          path={item.path}
          key={item.name}
          exact={item.exact}
          component={item.component}
        />
      ))}
      {/*<Route path="/about">
        <About />
      </Route>
      <Route path="/topics">
        <Topics />
      </Route>
      <Route path="/">
        <Home />
      </Route>*/}
    </Switch>
  );
};

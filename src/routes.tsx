import React, { useReducer, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import AsyncComponent from "./components/async-component";

export const ReducerContext = createContext(null);

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

function reducer(state: { [key: string]: any }, action: any) {
  switch (action.type) {
    case "addPerson":
      return { list: [...state.list, { name: "wo", age: 11 }] };
    default:
      throw new Error();
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    list: [{ name: "wo", age: 18 }, { name: "ni", age: 18 }]
  });

  return (
    <ReducerContext.Provider value={[state, dispatch ]}>
      <Switch>
        {routes.map(item => (
          <Route
            path={item.path}
            key={item.name}
            exact={item.exact}
            component={item.component}
          />
        ))}
      </Switch>
    </ReducerContext.Provider>
  );
};

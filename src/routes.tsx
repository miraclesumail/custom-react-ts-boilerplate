import React, { useReducer, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import AsyncComponent from "./components/async-component";
import RouteGuard from "@src/utils/route-guard";
export const ReducerContext = createContext(null);

const routes: any[] = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Login" */ "./pages/home")
    ),
    needLogin: true
  },
  {
    name: "about",
    path: "/about",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Login" */ "./pages/about")
    ),
    needLogin: true
  },
  {
    name: "topics",
    path: "/topics",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Login" */ "./pages/topics")
    ),
    needLogin: true
  },
  {
    name: "login",
    path: "/login",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Login" */ "./pages/login")
    )
  },
  {
    name: "sweeper",
    path: "/sweeper",
    exact: true,
    component: AsyncComponent(() =>
      import(/* webpackChunkName: "Login" */ "./pages/sweeper")
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
    <ReducerContext.Provider value={[state, dispatch]}>
      <Switch>
        {routes.map(item => (
          <Route
            path={item.path}
            key={item.name}
            exact={item.exact}
            render={props =>
              item.needLogin ? (
                <RouteGuard
                  needLogin={true}
                  renderer={item.component}
                  {...props}
                />
              ) : (
                <item.component {...props} />
              )}
          />
        ))}
      </Switch>
    </ReducerContext.Provider>
  );
};

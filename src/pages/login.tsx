import React from "react";
import { useHistory } from "react-router-dom";
import useForm from "@src/utils/hooks/rc-form";
import api from "@src/utils/api-request";

const stateSchema = {
  name: { value: "", error: "" },
  password: { value: "", error: "" }
};

const validationStateSchema = {
  name: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid name format."
    }
  },
  password: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid password format."
    }
  }
};

export default () => {
  const history = useHistory();
  const {
    state,
    handleOnChange,
    handleOnSubmit,
    disable
  } = useForm(stateSchema, validationStateSchema, state => {
    api
      .request("/login", "post", {
        body: JSON.stringify({
          name: state.name.value,
          password: state.password.value
        })
      })
      .then((res: any) => {
        console.log(res);
        localStorage.setItem("token", res.token);
      });
  });

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="name">
            name:
            <input
              type="text"
              name="name"
              value={state.name.value}
              onChange={handleOnChange}
            />
          </label>
          {state.name.error && (
            <p style={{ color: "red" }}>{state.name.error}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">
            password:
            <input
              type="text"
              name="password"
              value={state.password.value}
              onChange={handleOnChange}
            />
          </label>
          {state.password.error && (
            <p style={{ color: "red" }}>{state.password.error}</p>
          )}
        </div>
        <input type="submit" value="提交" />
      </form>
    </div>
  );
};

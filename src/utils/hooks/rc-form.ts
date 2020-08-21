import { useState, useCallback, useEffect } from "react";

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(
    () => {
      if (isDirty) {
        setDisable(validateState());
      }
    },
    [state, isDirty]
  );

  // 注意这里里面的校验是依赖state的  所以每次state更新时要重新创建才行
  const validateState = useCallback(
    () => {
      const hasErrorInState = Object.keys(validationSchema).some(key => {
        const isInputFieldRequired = validationSchema[key].required;
        const stateValue = state[key].value; // state value
        const stateError = state[key].error; // state error
        return (isInputFieldRequired && !stateValue) || stateError;
      });
      return hasErrorInState;
    },
    [state, validationSchema]
  );

  const handleOnChange = useCallback(
    event => {
      setIsDirty(true);
      const name = event.target.name;
      const value = event.target.value;
      let error = "";
      if (validationSchema[name].required) {
        if (!value) {
          error = "This is required field.";
        }
      }
      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === "object"
      ) {
        if (value && !validationSchema[name].validator.regEx.test(value)) {
          error = validationSchema[name].validator.error;
        }
      }
      setState(prevState => ({
        ...prevState,
        [name]: { value, error }
      }));
    },
    [validationSchema]
  );

  // 验证通过提交
  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();
      if (!disable) {
        callback(state);
      }
    },
    [state]
  );

  return { state, disable, handleOnChange, handleOnSubmit };
}

export default useForm;

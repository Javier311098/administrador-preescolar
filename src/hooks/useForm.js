import { useEffect, useMemo, useState } from "react";

export const useForm = (initialState = {}, validaciones = {}) => {
  const [values, setValues] = useState(initialState);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    crearValidaciones();
  }, [values]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const crearValidaciones = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(validaciones)) {
      const [fn, errorMessage] = validaciones[formField];

      formCheckedValues[`${formField}Valid`] = fn(values[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return [values, handleInputChange, formValidation, isFormValid, reset];
};

export const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: "",
  result: 0,
};
export const operators = ["+", "-", "*", "/"];
export const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0];

export const calculatorReducer = (state, action) => {
  if (action.type === "OPERAND") {
    if (
      state.currentOperand.toString().includes(".") &&
      action.value.toString() === "."
    ) {
      return {
        ...state,
      };
    }
    const operand = state.currentOperand.toString() + action.value.toString();
    return {
      ...state,
      currentOperand: operand,
      result: !state.result
        ? operand
        : /\-|\+|\/|\*/.test(state.result.toString())
        ? state.result + action.value
        : state.result + state.operation + action.value,
    };
  }
  if (action.type === "OPERATOR") {
    if (!state.currentOperand) {
      return {
        ...state,
      };
    }
    if (!state.previousOperand) {
      return {
        previousOperand: state.currentOperand,
        currentOperand: "",
        operation: action.value,
        result: state.currentOperand + action.value,
      };
    }
    let result = eval(
      `${state.previousOperand} ${state.operation} ${state.currentOperand} `
    );
    return {
      previousOperand: result,
      operation: action.value,
      currentOperand: "",
      result: result,
      //   result: result + action.value,
    };
  }
  if (action.type === "EQUALS") {
    let result = eval(
      `${state.previousOperand} ${state.operation} ${state.currentOperand} `
    );
    return {
      previousOperand: "",
      operation: "",
      currentOperand: result,
      result: result,
    };
  }
  if (action.type === "CLEAR") {
    return initialState;
  }
};

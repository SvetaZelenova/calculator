import { ACTIONS } from "../constants/constants";

export const initialState = {
  overwrite: false,
  currentOperand: "0",
  previousOperand: "",
  operation: "",
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const cur = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(cur)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + cur;
      break;
    case "-":
      computation = prev - cur;
      break;
    case "*":
      computation = prev * cur;
      break;
    case "/":
      computation = prev / cur;
      break;
    default:
      throw new Error("The operation entered couldn't be identified");
  }
  return computation.toString();
};

export const calculatorReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.value,
          overwrite: false,
        };
      }
      if (payload.value === "0" && state.currentOperand === "0") {
        return state;
      }
      if (state.currentOperand === "0") {
        return {
          ...state,
          currentOperand: payload.value,
        };
      }
      if (payload.value === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.value}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.currentOperand && !state.previousOperand) {
        return {
          state,
        };
      }
      if (!state.currentOperand) {
        return {
          ...state,
          operation: payload.value,
        };
      }
      if (!state.previousOperand) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.value,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.value,
        currentOperand: null,
      };
    case ACTIONS.EVALUATE:
      if (!state.operation || !state.currentOperand || !state.previousOperand) {
        return state;
      }
      return {
        overwrite: true,
        previousOperand: "",
        operation: "",
        currentOperand: evaluate(state),
      };
    case ACTIONS.CLEAR:
      return initialState;
    default:
      return initialState;
  }
};

import "./App.css";
import { useReducer } from "react";

import Button from "./components/Button";
import ButtonsGroup from "./components/ButtonsGroup";

import { operators, numbers, ACTIONS } from "./constants/constants";
import { calculatorReducer, initialState } from "./utils/utils";

function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const operatorInputHandler = (op) => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { value: op } });
  };
  const numberInputHandler = (num) => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { value: num } });
  };
  const clearAllHandler = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };
  const equalHandler = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };

  return (
    <div className="calculator__field">
      <div className="output">
        <div className="output__previous-operand">
          {state.previousOperand} {state.operation}
        </div>
        <div className="output_current-operand">{state.currentOperand}</div>
      </div>
      {/* <input readOnly className="input" value={state.result} /> */}

      <div className="buttons">
        <ButtonsGroup keys={operators} clickHandler={operatorInputHandler} />
        <ButtonsGroup keys={numbers} clickHandler={numberInputHandler} />
        <Button sign={"C"} className="clear" onPress={clearAllHandler} />
        <Button sign={"="} className="equal-sign" onPress={equalHandler} />
      </div>
    </div>
  );
}

export default App;

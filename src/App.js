import "./App.css";
import { useReducer } from "react";
import {
  calculatorReducer,
  initialState,
  operators,
  numbers,
} from "./utils/utils";
import Button from "./Button";

function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const operatorInputHandler = (op) => {
    dispatch({ type: "OPERATOR", value: op });
  };
  const numberInputHandler = (num) => {
    dispatch({ type: "OPERAND", value: num });
  };
  const clearAllHandler = () => {
    dispatch({ type: "CLEAR" });
  };
  const equalHandler = () => {
    dispatch({ type: "EQUALS" });
  };

  const operatorsContent = operators.map((op) => {
    return (
      <Button
        key={op}
        sign={op}
        className="operator"
        onPress={operatorInputHandler.bind(null, op)}
      />
    );
  });

  const numbersContent = numbers.map((num) => {
    return (
      <Button
        key={num}
        sign={num}
        className="number"
        onPress={numberInputHandler.bind(null, num)}
      />
    );
  });

  return (
    <div className="calculator__field">
      <input readOnly className="input" value={state.result} />

      <div className="buttons">
        {operatorsContent}
        {numbersContent}
        <Button sign={"C"} className="clear" onPress={clearAllHandler} />
        <Button sign={"="} className="equal-sign" onPress={equalHandler} />
      </div>
    </div>
  );
}

export default App;

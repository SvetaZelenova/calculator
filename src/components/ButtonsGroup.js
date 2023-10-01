import Button from "./Button";

const ButtonsGroup = ({keys, clickHandler}) => {
    return keys.map((key) => {
        return (
          <Button
            key={key}
            sign={key}
            className="number"
            onPress={clickHandler.bind(null, key)}
          />
        );
      });
};

export default ButtonsGroup;

const Button = ({ sign, className, onPress }) => {
  return (
    <div className={`button ${className}`} onClick={onPress}>
      {sign}
    </div>
  );
};

export default Button;

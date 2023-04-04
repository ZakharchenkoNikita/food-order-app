import classes from "./Checkout.module.css";

import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const controlInputError = (error) =>
  `${classes.control} ${error ? classes.invalid : ""}`;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput(isNotEmpty);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postalCodeValue,
    });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameControl = controlInputError(nameHasError);
  const streetControl = controlInputError(streetHasError);
  const postalCodeControl = controlInputError(postalCodeHasError);
  const cityControl = controlInputError(cityHasError);

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a name.</p>}
      </div>
      <div className={streetControl}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a street.</p>}
      </div>
      <div className={postalCodeControl}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCodeValue}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && <p>Please enter a postal code.</p>}
      </div>
      <div className={cityControl}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && (
          <p className={classes.invalid}>Please enter a city.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;

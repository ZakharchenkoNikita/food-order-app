import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { isLoading, sendRequest: sendOrderRequest } = useHttp();

  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (event) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    sendOrderRequest({
      url: "https://reactmeals-23e37-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: "POST",
      body: { user: userData, orderItems: cartContext.items },
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmitingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully send the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmitingModalContent}
      {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

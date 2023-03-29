import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const arrItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {arrItems.length > 0 ? (
        <ul>
          {arrItems.map((arrItem) => (
            <CartItem
              key={arrItem.id}
              item={{
                id: arrItem.id,
                title: arrItem.name,
                quantity: arrItem.quantity,
                total: arrItem.totalPrice,
                price: arrItem.price,
              }}
            />
          ))}
        </ul>
      ) : (
        "no product in your cart"
      )}
    </Card>
  );
};

export default Cart;

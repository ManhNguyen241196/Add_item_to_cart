import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const arrItems = useSelector((state) => state.cart.items);
  console.log(arrItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
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
    </Card>
  );
};

export default Cart;

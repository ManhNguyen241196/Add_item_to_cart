import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./components/store/UI-slice";
import { sendCartData, fetchCartData } from "./components/store/cart-action";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart); //useSelector sẽ mặc định trỏ
  //trực tiếp vào object chứa các state của nhánh store nào đó.
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // mục đích hiển thị chỉ cần hiển thị ở lần load trang đầu tiên
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "sending",
    //     title: "sending...",
    //     meassage: "sending cart data",
    //   })
    // );
    // const response = await fetch(
    //   "https://cartproject-bf51d-default-rtdb.firebaseio.com/cart.json",
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   }
    // // );
    // if (!response.ok) {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Error",
    //       title: "Error !",
    //       meassage: "Gửi lỗi",
    //     })
    //   );
    //   throw new Error("sending error");
    // }

    //gui xong có response phan hồi
    // dispatch(
    //   uiActions.showNotification({
    //     status: "success",
    //     title: "Success !",
    //     meassage: "Gửi thành công cart data",
    //   })
    // );

    // const responseData = await response.json();
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart)); //lúc này dispatch sẽ k chạy trỏ tới actions của
    // reducer như bình thường nữa. mà biến của dispatch lần này là 1 function bình thường.

    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Error",
    //       title: "Error !",
    //       meassage: "Gửi lỗi",
    //     })
    //   );
    // });

    setTimeout(() => {
      //đương nhiên khi dispatch chọc trực tiếp vào action reducer sẽ thay đổi state và sẽ render lại
      //hiển thị code.
      dispatch(uiActions.showNotification({}));
    }, 5000);

    console.log("chạy useEffect");
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          meassage={notification.meassage}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

import { uiActions } from "./UI-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatchs) => {
    const fetchData = async () => {
      // gán function vào 1 biến và function đó có await nên đầu function phải có async
      const response = await fetch(
        "https://cartproject-bf51d-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatchs(
        cartActions.replaceCart({
          items: cartData.items || [], // neu trong cart khong có hàng thì phải trả vào 1 mảng rỗng
          // vì nếu k sẽ bị lỗi undefine vì dù trong cart có hàng hay không nó vẫn sẽ render theo phương thức mảng.
          // mảng rỗng [] nó sẽ hiểu là các giá tị bằng không hết
          totalQuantity: cartData.totalQuantity,
        })
      );
      console.log("day la data fetch ve", cartData); //đây là data khi trả về.
    } catch (error) {
      dispatchs(
        uiActions.showNotification({
          status: "error",
          title: "Error !",
          meassage: "Nhan data lỗi",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  // đây là  hàm để khi được gọi sẽ trả về logic gửi data. Data chính là biến đầu vào.
  //chạy mã này ở bên ngoài reducers.

  return async (dispatchs) => {
    //return của hàm này LÀ 1 HÀM KHÁC. có biến là dispatch (chính là cái const dispatch = useDispatch())
    dispatchs(
      // lúc này dispatchs không được khai báo là useDispatch trước đó nhưng với kết cầu function này
      // khi gọi với cấu trúc như trên thì nó vẫn chứa thuộc tính như dispatch được gán useDispatch() để tro trực
      //tiếp vào action của reducer. => cách né việc useDispatch không thể được khai báo và sử dụng trong nội bộn hàm.
      uiActions.showNotification({
        status: "sending",
        title: "sending...",
        meassage: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://cartproject-bf51d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending error");
      }

      const responseData = await response.json();
    }; // hàm này sẽ có nhiệm vụ gửi data lên link server

    try {
      //try catch để chạy và tìm lỗi của promise gửi data nếu có.
      await sendRequest();
      //gui xong có response phan hồi
      dispatchs(
        uiActions.showNotification({
          status: "success",
          title: "Success !",
          meassage: "Gửi thành công cart data",
        })
      );
    } catch (error) {
      dispatchs(
        uiActions.showNotification({
          status: "Error",
          title: "Error !",
          meassage: "Gửi lỗi",
        })
      );
    }
  };
};

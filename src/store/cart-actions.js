import { uiSliceActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
// these are action creators to solve the issue of side effects
export const fetchCartData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        "https://request-bb071-default-rtdb.firebaseio.com//cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetching data failed");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await getData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity : cartData.totalQuantity,
      }));
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching Cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "sending data...",
        message: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://request-bb071-default-rtdb.firebaseio.com//cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch {
      sendRequest().catch((error) => {
        dispatch(
          uiSliceActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending Cart data failed",
          })
        );
      });
    }
  };
};

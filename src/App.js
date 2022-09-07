import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
//import { uiSliceActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { Fragment } from "react";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notifications = useSelector((state) => state.ui.Notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
    
  }, [dispatch]);

  useEffect(() => {
    /*  const sendCartData = async () => {
      dispatch(
        uiSliceActions.showNotification({
          status: "pending",
          title: "sending data...",
          message: "sending cart data",
        })
      );

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

      // const responseData = await response.json();
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    };*/

    if (isInitial) {
      isInitial = false;
      return;
    }
    /* sendCartData().catch((error) => {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed",
        })
      );
    });*/
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notifications && (
        <Notification
          status={notifications.status}
          title={notifications.title}
          message={notifications.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

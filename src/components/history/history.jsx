import React, { useEffect } from "react";
import { useStore } from "zmp-framework/react";
import store from "../../store";
import Loading from "./loading";
import Heading from "./heading";
import Empty from "./empty";
import OrderList from "./order-list";

const History = () => {
  const orders = useStore("orders");
  const loading = useStore("loadingOrders");

  useEffect(() => {
    store.dispatch("fetchOrders");
  }, []);

  return (
    <>
      <Heading />
      {loading ? (
        <Loading />
      ) : (
        <>{orders.length > 0 ? <OrderList /> : <Empty />}</>
      )}
    </>
  );
};

History.displayName = "zmp-history";

export default History;

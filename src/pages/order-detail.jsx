import React from "react";
import { Page } from "zmp-framework/react";
import Back from "../components/order-detail/back";
import OrderDetail from "../components/order-detail/order-detail";

const OrderDetailPage = (props) => {
  const { zmproute, zmprouter } = props;

  return (
    <Page name="order-detail">
      <Back />
      <OrderDetail id={zmproute.query.id} zmprouter={zmprouter} />
    </Page>
  );
};
export default OrderDetailPage;

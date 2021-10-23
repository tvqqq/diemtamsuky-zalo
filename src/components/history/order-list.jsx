import React from "react";
import { useStore, Text, Box } from "zmp-framework/react";
import PlacedOrder from "./placed-order";

const OrderList = () => {
  const orders = useStore("orders");

  return (
    <Box m={4}>
      <Text bold className="my-4">
        Lịch sử đơn hàng
      </Text>
      {orders.map((order) => (
        <Box key={order._id} mx={0} my={2}>
          <PlacedOrder order={order} />
        </Box>
      ))}
    </Box>
  );
};

OrderList.displayName = "zmp-history-order-list";

export default OrderList;

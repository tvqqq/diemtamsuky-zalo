import React from "react";
import {
  useStore,
  Text,
  Box,
  Card,
  List,
  ListItem,
} from "zmp-framework/react";
import { Price } from "../products/prices";
import "../../css/order-detail.scss";
import ZaloMsg from "../zalo";

const OrderDetail = ({ id, zmprouter }) => {
  const orders = useStore("orders");
  let order = orders.filter((o) => o._id === id);
  if (order.length === 0) {
    zmprouter.navigate("/");
    return false;
  }
  order = order[0];

  return (
    <>
      <Card className="order-detail" inset>
        <Box>
          <Text bold className="text-heading">
            Thông tin đơn hàng
          </Text>
          <List>
            <ListItem title="Mã đơn" after={order._id}></ListItem>
            <ListItem title="Người nhận" after={order.name}></ListItem>
            <ListItem title="Số điện thoại" after={order.phone}></ListItem>
            <ListItem title="Địa chỉ nhận">
              <span className="location-content">{order.address}</span>
            </ListItem>
          </List>
        </Box>
        <Box>
          <Text bold className="text-heading">
            Các sản phẩm đã chọn
          </Text>
          <List>
            {order.cart.map((cart) => (
              <ListItem
                key={cart.product._id}
                title={`${cart.quantity} x ${cart.product.name}`}
              >
                <Price slot="content" amount={cart.subtotal} unit="đ" />
              </ListItem>
            ))}
            <ListItem title="Tổng cộng">
              <Price slot="content" amount={order.total} unit="đ" />
            </ListItem>
          </List>
        </Box>
      </Card>
      <ZaloMsg />
    </>
  );
};

OrderDetail.displayName = "zmp-history-order-detail";

export default OrderDetail;

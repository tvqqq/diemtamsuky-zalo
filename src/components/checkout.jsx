import React, { useEffect, useState } from "react";
import {
  useStore,
  Button,
  Text,
  Actions,
  ActionsGroup,
  ActionsLabel,
  List,
  ListItem,
  Icon,
  Box,
  Input,
  Link,
  Preloader,
} from "zmp-framework/react";
import { Price } from "./prices";
import ProductOrder from "./product-order";
import store from "../store";
import "../css/checkout.scss";

const Checkout = ({ children, onReturn }) => {
  const cloudinaryUrl = useStore("cloudinaryUrl");
  const showCheckout = useStore("showCheckout");
  const setShowCheckout = (value) => {
    store.dispatch("setShowCheckout", value);
  };
  const cart = useStore("cart");
  const totalAmount = useStore("totalAmount");

  const [show, setShow] = useState(false);
  useEffect(() => setShow(showCheckout), [showCheckout]);

  const [loading, setLoading] = useState(false);
  const checkout = async () => {
    setLoading(true);
    await store.dispatch("checkout");
    setLoading(false);
  };

  const user = useStore("user");
  const note = useStore("note");
  return (
    <>
      <div onClick={() => setShowCheckout(true)}>{children}</div>
      <Actions
        className="custom-action-sheet"
        opened={show}
        onActionsClosed={() => setShowCheckout(false)}
        onActionsClose={() => {
          if (onReturn) {
            onReturn();
          }
        }}
      >
        <ActionsGroup>
          <Button
            typeName="ghost"
            className="close-button"
            onClick={() => setShowCheckout(false)}
          >
            <Icon zmp="zi-arrow-left" size={24}></Icon>
          </Button>
          <ActionsLabel bold>
            <span className="title">Xác nhận đơn hàng</span>
          </ActionsLabel>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsLabel className="p-0">
            <Box className="text-left">
              <Text bold>Thông tin khách hàng</Text>
            </Box>
            <List className="my-0">
              <ListItem className="editable-info">
                <Box slot="root-start" className="label d-flex v-center">
                  <Icon zmp="zi-user-circle" size="20" />
                  <strong>Tên của bạn</strong>
                </Box>
                <div className="inline-input">
                  <Input
                    type="text"
                    maxlength={100}
                    placeholder="Nhập tên của bạn..."
                    resizable
                    value={user.name}
                    onChange={(e) =>
                      store.dispatch("setUser", { name: e.target.value })
                    }
                  />
                </div>
              </ListItem>
              <ListItem className="editable-info">
                <Box slot="root-start" className="label d-flex v-center">
                  <Icon zmp="zi-notif-ring" size="20" />
                  <strong>Số điện thoại</strong>
                </Box>
                <div className="inline-input">
                  <Input
                    type="text"
                    maxlength={100}
                    placeholder="Nhập số điện thoại liên hệ..."
                    resizable
                    value={user.phone}
                    onChange={(e) =>
                      store.dispatch("setUser", { phone: e.target.value })
                    }
                  />
                </div>
              </ListItem>
              <ListItem className="editable-info">
                <Box slot="root-start" className="label d-flex v-center">
                  <Icon zmp="zi-location" size="20" />
                  <strong>Địa chỉ</strong>
                </Box>
                <div className="inline-input">
                  <Input
                    type="text"
                    maxlength={100}
                    placeholder="Nhập địa chỉ giao hàng..."
                    resizable
                    value={user.address}
                    onChange={(e) =>
                      store.dispatch("setUser", { address: e.target.value })
                    }
                  />
                </div>
              </ListItem>
              <ListItem className="editable-info">
                <Box slot="root-start" className="label d-flex v-center">
                  <Icon zmp="zi-list-2" size="20" />
                  <strong>Ghi chú</strong>
                </Box>
                <div className="inline-input">
                  <Input
                    type="textarea"
                    maxlength={500}
                    placeholder="Nhập nội dung ghi chú... (tối đa 500 ký tự)"
                    resizable
                    value={note}
                    onChange={(e) => store.dispatch("setNote", e.target.value)}
                  />
                </div>
              </ListItem>
            </List>
          </ActionsLabel>
          <ActionsLabel className="p-0">
            <Box className="text-left">
              <Text bold>Thông tin đơn hàng</Text>
            </Box>
            <List className="my-0">
              {cart.map((item, i) => (
                <ListItem key={i}>
                  <img
                    slot="media"
                    src={cloudinaryUrl + item.product.image}
                    className="product-image"
                  />
                  <Price
                    slot="content"
                    amount={item.subtotal}
                    unit="đ"
                    className="pr-4"
                  />
                  <Box className="text-left">
                    <Text className="mb-0" bold>
                      <span className="text-danger"> {item.quantity} x</span>{" "}
                      {item.product.name}
                    </Text>
                    <ProductOrder
                      product={item.product}
                      cartItem={item}
                      cartIndex={i}
                    >
                      <Link>
                        <Text fontSize="12" className="text-primary">
                          Chỉnh sửa
                        </Text>
                      </Link>
                    </ProductOrder>
                  </Box>
                </ListItem>
              ))}
            </List>
          </ActionsLabel>
        </ActionsGroup>
        <ActionsGroup />
        <ActionsLabel className="sticky-action-footer">
          <List className="my-0">
            <ListItem>
              <div className="flex-1">
                <Box className="d-flex v-center">
                  <Text className="text-left mb-0" fontSize={12}>
                    Lưu ý: Giá trị đơn hàng chưa tính tiền ship và quán sẽ liên
                    hệ với bạn để xác nhận đơn hàng.
                  </Text>
                </Box>
                <Box className="d-flex v-center space-between">
                  <Text>Tạm tính</Text>
                  <Price fontSize={20} bold amount={totalAmount} />
                </Box>
                <Box>
                  <Button
                    onClick={checkout}
                    large
                    responsive
                    fill
                    disabled={loading}
                  >
                    {loading && <Preloader className="loading-button" />}
                    Đặt hàng
                  </Button>
                </Box>
              </div>
            </ListItem>
          </List>
        </ActionsLabel>
      </Actions>
    </>
  );
};

Checkout.displayName = "zmp-checkout";

export default Checkout;

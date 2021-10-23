import React, { useState, useMemo, useEffect } from "react";
import {
  useStore,
  Text,
  Title,
  Actions,
  ActionsGroup,
  ActionsLabel,
  Button,
  Icon,
  Row,
  Col,
  Box,
  List,
  ListItem,
  zmp,
} from "zmp-framework/react";
import { Price } from "./prices";
import store from "../../store";
import "../../css/product-order.scss";

const ProductOrder = ({ product, children, cartItem, cartIndex }) => {
  const { name, price, image, description } = product;
  const [showOrder, setShowOrder] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const cloudinaryUrl = useStore("cloudinaryUrl");

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [showOrder]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    const limit = cartItem ? 0 : 1;
    setQuantity(quantity > limit ? quantity - 1 : limit);
  };

  const subtotal = useMemo(() => {
    let subtotal = price;
    subtotal *= quantity;
    return subtotal;
  }, [quantity]);

  const order = () => {
    const item = {
      quantity,
      subtotal,
      product,
    };
    if (cartItem) {
      store.dispatch("updateCartItem", { index: cartIndex, item });
    } else {
      store.dispatch("addToCart", item);
    }
  };
  const addToCart = () => {
    order();
    setShowOrder(false);
  };

  const removeFromCart = () => {
    zmp.dialog
      .create({
        title: "Xác nhận",
        content: "Bạn có chắc muốn xoá sản phẩm này khỏi đơn hàng?",
        buttons: [
          {
            text: "Không",
            close: true,
          },
          {
            text: "Đồng Ý",
            close: true,
            onClick() {
              setShowOrder(false);
              store.dispatch("removeCartItem", cartIndex);
            },
          },
        ],
      })
      .open();
  };

  const checkout = () => {
    order();
    setShowOrder(false);
    store.dispatch("setShowCheckout", true);
  };

  return (
    <div>
      <div onClick={() => setShowOrder(true)}>{children}</div>
      <Actions
        className="custom-action-sheet product-order"
        opened={showOrder}
        onActionsClosed={() => setShowOrder(false)}
      >
        <ActionsGroup>
          <Button
            typeName="ghost"
            className="close-button"
            onClick={() => setShowOrder(false)}
          >
            <Icon zmp="zi-close" size={24}></Icon>
          </Button>
          <ActionsLabel bold>
            <span className="title">Chọn món</span>
          </ActionsLabel>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsLabel className="bg-white product-preview">
            <Row>
              <Col className="image">
                <img src={cloudinaryUrl + image} className="w-100" />
              </Col>
              <Col className="description">
                <Title bold>{name}</Title>
                <Price amount={price} />
                <Text fontSize={11} className="text-secondary">
                  {description}
                </Text>
              </Col>
            </Row>
          </ActionsLabel>
          <ActionsLabel className="p-0 text-left">
            <Box>
              <Text bold>Số lượng</Text>
            </Box>
            <List className="my-0">
              <ListItem>
                <div className="quantity-selector">
                  <Button small typeName="tertiary" onClick={decreaseQuantity}>
                    -
                  </Button>
                  <Box mx={6} mt={1}>
                    {quantity}
                  </Box>
                  <Button small typeName="tertiary" onClick={increaseQuantity}>
                    +
                  </Button>
                </div>
              </ListItem>
            </List>
          </ActionsLabel>
        </ActionsGroup>
        <ActionsGroup />
        <ActionsGroup className="sticky-action-footer">
          <ActionsLabel className="p-2 text-left">
            <Row>
              <Col>
                <Box>Tổng tiền</Box>
              </Col>
              <Col className="text-right">
                <Box>
                  <Price
                    className="text-primary"
                    bold
                    fontSize={20}
                    amount={subtotal}
                  />
                </Box>
              </Col>
            </Row>
            <Row gap="gap_4" className="actions">
              {cartItem ? (
                <Col>
                  {quantity > 0 ? (
                    <Button responsive typeName="primary" onClick={checkout}>
                      Cập nhật giỏ hàng
                    </Button>
                  ) : (
                    <Button
                      responsive
                      typeName="destructive"
                      onClick={removeFromCart}
                    >
                      Xoá khỏi giỏ hàng
                    </Button>
                  )}
                </Col>
              ) : (
                <>
                  <Col>
                    <Button responsive typeName="secondary" onClick={checkout}>
                      Mua ngay
                    </Button>
                  </Col>
                  <Col>
                    <Button responsive typeName="primary" onClick={addToCart}>
                      Thêm vào giỏ
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </ActionsLabel>
        </ActionsGroup>
      </Actions>
    </div>
  );
};

ProductOrder.displayName = "zmp-product-order";

export default ProductOrder;

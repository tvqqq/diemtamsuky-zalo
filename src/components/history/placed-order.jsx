import React from "react";
import { useStore, Text, Card, Link } from "zmp-framework/react";
import { Price } from "../products/prices";
import "../../css/order.scss";

const PlacedOrder = ({ order }) => {
  const { _id, cart, createdAt, total } = order;

  return (
    <Link
      href={`/order-detail?id=${_id}`}
      animate={false}
      ignoreCache={true}
      className="order-link"
    >
      <Card className="order-card" inset>
        <div className="order-summary">
          <strong>
            {cart[0].product.name} {cart[1] ? "++" : ""}
          </strong>
          <Text className="text-secondary">
            {new Date(createdAt).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {new Date(createdAt).toLocaleDateString("vi-VN")}
          </Text>
        </div>
        <div className="">
          <Price bold amount={total} />
        </div>
      </Card>
    </Link>
  );
};

PlacedOrder.displayName = "zmp-placed-order";

export default PlacedOrder;

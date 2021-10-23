import React from "react";
import { useStore, Text, Card } from "zmp-framework/react";
import { Price } from "../products/prices";
import "../../css/discount.scss";

const PlacedOrder = ({ order }) => {
  const { cart, createdAt, total } = order;
  const cloudinaryUrl = useStore("cloudinaryUrl");

  return (
    <Card className="discount-card" inset>
      <img
        className="discount-image"
        src={cloudinaryUrl + cart[0].product.image}
      />
      <div className="discount-summary">
        <Text className="text-secondary">
          {new Date(createdAt).toLocaleDateString()} -{" "}
          {new Date(createdAt).toLocaleTimeString()}
        </Text>
        <div className="d-flex">
          <Price bold amount={total} />
        </div>
      </div>
    </Card>
  );
};

PlacedOrder.displayName = "zmp-placed-order";

export default PlacedOrder;

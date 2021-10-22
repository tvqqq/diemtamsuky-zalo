import React from "react";
import { useStore, Card, Text } from "zmp-framework/react";
import { Price } from "./prices";
import ProductOrder from "./product-order";

const Product = (props) => {
  const { name, description, price, image } = props;
  const cloudinaryUrl = useStore("cloudinaryUrl");

  return (
    <ProductOrder product={props}>
      <Card inset className="text-center">
        <img src={cloudinaryUrl + image} className="w-100 mb-5" />
        <Text bold fontSize={18}>
          {name}
        </Text>
        <Price amount={price} />
        <Text fontSize={12} className="text-secondary">
          {description}
        </Text>
      </Card>
    </ProductOrder>
  );
};

Product.displayName = "zmp-product";

export default Product;

import React from "react";
import { Text } from "zmp-framework/react";

export const Price = ({ amount, unit, ...props }) => (
  <Text className="text-primary" {...props}>
    {amount.toLocaleString()}
    {unit ? unit : " VNĐ"}
  </Text>
);

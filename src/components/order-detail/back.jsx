import React from "react";
import { Card, Link, Icon, Text, Box } from "zmp-framework/react";

const Back = () => {
  return (
    <Card inset className="card-no-gap">
      <Box flex className="v-center">
        <Link className="no-ripple" href="/history" noLinkClass>
          <Icon zmp="zi-arrow-left" size={24} />
        </Link>
        <Text className="text-lg" style={{ marginLeft: "10px" }}>
          Chi tiết đơn hàng
        </Text>
      </Box>
    </Card>
  );
};

Back.displayName = "zmp-order-detail-back";

export default Back;

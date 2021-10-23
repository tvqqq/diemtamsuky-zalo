import React from "react";
import { Text, Box, Button } from "zmp-framework/react";

const Empty = () => (
  <Box className="d-flex h-100 h-center v-center text-center">
    <Box>
      <Text bold>Bạn chưa có đơn hàng!</Text>
      <Text className="text-secondary mt-4 mb-8">
        Hãy đặt món để thưởng thức dịch vụ hấp dẫn tại Điểm tâm Sú Ky nhé!
      </Text>
      <Button
        className="m-auto"
        typeName="primary"
        onClick={() => zmp.views.main.router.navigate("/")}
        large
      >
        Đặt món ngay
      </Button>
    </Box>
  </Box>
);

Empty.displayName = "zmp-history-empty";

export default Empty;

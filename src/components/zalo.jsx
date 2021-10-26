import React from "react";
import { Card, Button } from "zmp-framework/react";
import api from "zmp-sdk";

const ZaloMsg = () => {
  const openZalo = () => {
    api.openWebview({
      url: "https://zalo.me/0903812733",
      success: () => {},
      fail: (error) => {},
    });
  };

  return (
    <Card className="card-no-gap">
      <Button
        type="button"
        fill
        large
        iconZMP="zi-call-solid"
        className="m-auto"
        onClick={() => openZalo()}
      >
        Liên hệ Zalo quán
      </Button>
    </Card>
  );
};

ZaloMsg.displayName = "zmp-zalo-msg";

export default ZaloMsg;

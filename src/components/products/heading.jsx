import React from "react";
import ZaloMsg from "../zalo";

const Heading = () => {
  return (
    <>
      <img
        src="https://res.cloudinary.com/tvq/image/upload/v1634878060/diemtamsuky/card-visit.png"
        className="w-100 mb-5"
      />
      <ZaloMsg />
    </>
  );
};

Heading.displayName = "zmp-heading";

export default Heading;

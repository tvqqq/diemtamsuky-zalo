import React, { useState, useEffect } from "react";
import {
  useStore,
  Tabbar,
  Link,
  zmp,
  Box,
  Text,
  Button,
} from "zmp-framework/react";
import { Price } from "./products/prices";
import Checkout from "./products/checkout";
import "../css/bottom-navigation.scss";

const BottomNavigation = () => {
  const totalQuantity = useStore("totalQuantity");
  const totalAmount = useStore("totalAmount");
  const [currentPath, setCurrentPath] = useState();

  zmp.views.main.router.on("routeChange", ({ path }) => {
    setCurrentPath(path);
  });

  const navigateWithoutAnimation = (path) => {
    if (!path) {
      return;
    }
    zmp.view.main.router.navigate(path, {
      animate: false,
      browserHistory: false,
    });
  };

  const links = [
    { name: "Đặt món", href: "/", icon: "zi-more-diamond-solid" },
    { name: "Lịch sử", href: "/history", icon: "zi-clock-1-solid" },
  ];

  useEffect(() => {
    if (totalQuantity > 0) {
      document.body.classList.add("has-cart");
    } else {
      document.body.classList.remove("has-cart");
    }
    return true;
  }, [totalQuantity]);

  return (
    <div className="bottom-navigation">
      {totalQuantity > 0 && (
        <div className="cart">
          <Box>
            <Price fontSize={20} bold amount={totalAmount} className="mb-0" />
            <Text className="text-secondary">
              Bạn có {totalQuantity} món trong giỏ hàng.
            </Text>
          </Box>
          <Box className="text-right">
            <Checkout>
              <Button fill large>
                Giỏ hàng
              </Button>
            </Checkout>
          </Box>
        </div>
      )}
      <Tabbar bottom>
        {links.map(({ name, icon, href }) => (
          <Link
            key={href}
            className={href === currentPath ? "active" : "inactive"}
            onClick={() => navigateWithoutAnimation(href)}
            iconZMP={icon}
          >
            {name}
          </Link>
        ))}
      </Tabbar>
    </div>
  );
};

BottomNavigation.displayName = "zmp-toolbar";

export default BottomNavigation;

import React, { useEffect } from "react";
import {
  useStore,
  Row,
  Col,
  Box,
  SkeletonBlock,
  Text,
} from "zmp-framework/react";
import store from "../../store";
import Product from "./product";
import "../../css/product.scss";

const ProductList = () => {
  const loading = useStore("loadingProducts");
  const products = useStore("products");
  useEffect(() => {
    store.dispatch("fetchProducts");
  }, []);

  return (
    <>
      <Text bold fontSize={20} className="text-center">
        - Menu Hôm Nay -
      </Text>
      {loading ? (
        <Box m={0} px={4} pb={2}>
          <Row gap="gap_4" className="mt-4">
            <Col>
              <SkeletonBlock effect="wave" height="200px" />
            </Col>
            <Col>
              <SkeletonBlock effect="wave" height="200px" />
            </Col>
          </Row>
        </Box>
      ) : (
        <>
          <Row gap="gap_2">
            {products.map((product) => (
              <Col key={product._id} className="product" width="50">
                <Product {...product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

ProductList.displayName = "zmp-product-list";

export default ProductList;

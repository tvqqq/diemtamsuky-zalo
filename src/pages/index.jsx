import React from "react";
import { Page, Box, Card } from "zmp-framework/react";
import Heading from "../components/products/heading";
import ProductList from "../components/products/product-list";

const HomePage = () => {
  return (
    <Page name="home">
      <Heading />

      <Box mt={2}>
        <Card inset>
          <ProductList />
        </Card>
      </Box>
    </Page>
  );
};
export default HomePage;

import React from "react";
import { useStore, Page, Box, Card } from "zmp-framework/react";
import Heading from "../components/heading";
import ProductList from "../components/product-list";

const HomePage = () => {
  const user = useStore("user");
  return (
    <Page name="home" navbarLarge>
      <Heading user={user} />

      <Box mt={2}>
        <Card inset>
          <ProductList />
        </Card>
      </Box>
    </Page>
  );
};
export default HomePage;

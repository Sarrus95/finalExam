import { AppShell } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

import ShopNavbar from "./components/ShopNavbar/ShopNavbar";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductsDetail";
import FindUs from "./components/FindUs/FindUs";

const App = () => {
  return (
    <AppShell header={{ height: 52 }} padding="md">
      <AppShell.Header style={{ borderBottom: "1px solid #eee" }}>
        <ShopNavbar />
      </AppShell.Header>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>


        <FindUs />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;

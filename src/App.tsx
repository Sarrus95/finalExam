import { AppShell } from "@mantine/core";
import ShopNavbar from "./components/ShopNavbar/ShopNavbar";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <AppShell header={{ height: 52 }} padding="md">
      <AppShell.Header style={{ borderBottom: "1px solid #eee" }}>
        <ShopNavbar />
      </AppShell.Header>

      <AppShell.Main>
        <Home />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;

import { AppShell } from "@mantine/core";
import ShopNavbar from "./components/ShopNavbar/ShopNavbar";

const App = () => {
  return (
    <AppShell header={{ height: 52 }} padding="md">
      <AppShell.Header style={{ borderBottom: "1px solid #eee" }}>
        <ShopNavbar />
      </AppShell.Header>

      <AppShell.Main>Main content</AppShell.Main>
    </AppShell>
  );
};

export default App;

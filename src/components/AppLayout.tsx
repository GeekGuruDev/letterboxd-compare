import { Outlet } from "react-router";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

function AppLayout() {
  return (
    <>
      <ThemeToggle />
      <Outlet />
      <Footer />
    </>
  );
}
export default AppLayout;

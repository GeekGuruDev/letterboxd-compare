import { Outlet } from "react-router";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import { Toaster } from "./ui/sonner";

function AppLayout() {
  return (
    <>
      <Toaster richColors position="bottom-center" />
      <ThemeToggle />
      <Outlet />
      <Footer />
    </>
  );
}
export default AppLayout;

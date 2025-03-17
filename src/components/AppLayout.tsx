import { Outlet } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { Toaster } from "./ui/sonner";
import { useTheme } from "@/contexts/ThemeContext ";

function AppLayout() {
  const { theme } = useTheme();
  return (
    <>
      <Toaster theme={theme} richColors position="bottom-center" />
      <ThemeToggle />
      <Outlet />
    </>
  );
}
export default AppLayout;

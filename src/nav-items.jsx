import { HomeIcon, LogInIcon, Users, LayoutDashboard, Gift as GiftIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import Join from "./pages/Join.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GiftPage from "./pages/Gift.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Login or Signup",
    to: "/auth",
    icon: <LogInIcon className="h-4 w-4" />,
    page: <Auth />,
  },
  {
    title: "Join the Network",
    to: "/join",
    icon: <Users className="h-4 w-4" />,
    page: <Join />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Choose Your Gift",
    to: "/gift",
    icon: <GiftIcon className="h-4 w-4" />,
    page: <GiftPage />,
  },
];

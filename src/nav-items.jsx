import { HomeIcon, LogInIcon, ClipboardListIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import Clarity from "./pages/Clarity.jsx";

export const navItems = [
  {
    title: "Movement Creator",
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
    title: "Project Management",
    to: "/clarity",
    icon: <ClipboardListIcon className="h-4 w-4" />,
    page: <Clarity />,
  },
];

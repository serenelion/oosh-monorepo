import { HomeIcon, LogInIcon, ClipboardListIcon, Trello, Users, LayoutDashboard } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import Clarity from "./pages/Clarity.jsx";
import ProjectKanban from "./pages/ProjectKanban.jsx";
import Join from "./pages/Join.jsx";
import Dashboard from "./pages/Dashboard.jsx";

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
    title: "Project Management",
    to: "/clarity",
    icon: <ClipboardListIcon className="h-4 w-4" />,
    page: <Clarity />,
  },
  {
    title: "Project Kanban",
    to: "/project-kanban",
    icon: <Trello className="h-4 w-4" />,
    page: <ProjectKanban />,
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
];

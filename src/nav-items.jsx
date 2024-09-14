import { HomeIcon, LogInIcon, Users, LayoutDashboard, Gift as GiftIcon, MessageSquare, Leaf, Home } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import Join from "./pages/Join.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GiftPage from "./pages/Gift.jsx";
import ChatBeta from "./pages/ChatBeta.jsx";
import Oosh from "./pages/Oosh.jsx";
import FarmProfile from "./pages/FarmProfile.jsx";

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
  {
    title: "Chat Beta",
    to: "/chat-beta",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <ChatBeta />,
  },
  {
    title: "Oosh",
    to: "/oosh",
    icon: <Leaf className="h-4 w-4" />,
    page: <Oosh />,
  },
  {
    title: "Farm Profile",
    to: "/farm-profile",
    icon: <Home className="h-4 w-4" />,
    page: <FarmProfile />,
  },
];

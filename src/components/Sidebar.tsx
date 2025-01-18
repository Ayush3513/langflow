import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Plus,
  Youtube,
  MessageCircle,
  Search,
  Target,
  TrendingUp,
  BarChart2,
  Settings,
  Crown,
} from "lucide-react";
import clsx from "clsx";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  const location = useLocation(); // React Router hook to get the current path

  const isActive = location.pathname === to; // Check if the current route matches

  return (
    <li>
      <Link
        to={to}
        className={clsx(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
      {title}
    </h2>
    <ul className="space-y-1">{children}</ul>
  </div>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen p-4">
      <div className="flex items-center gap-2 px-4 mb-8">
        <BarChart2 className="w-8 h-8 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-900">ART Finder</h1>
      </div>

      <nav className="space-y-6">
        <NavGroup title="">
          <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
          <NavItem
            to="/new-research"
            icon={<Plus size={20} />}
            label="New Research"
          />
        </NavGroup>

        <NavGroup title="Research Sources">
          <NavItem
            to="/youtube"
            icon={<Youtube size={20} />}
            label="YouTube Analysis"
          />
          <NavItem
            to="/social"
            icon={<MessageCircle size={20} />}
            label="Social Listening"
          />
          <NavItem
            to="/competitor"
            icon={<Search size={20} />}
            label="Competitor Research"
          />
        </NavGroup>

        <NavGroup title="Insights & Analysis">
          <NavItem
            to="/pain-points"
            icon={<Target size={20} />}
            label="Pain Points"
          />
          <NavItem
            to="/trends"
            icon={<TrendingUp size={20} />}
            label="Trends"
          />
          <NavItem
            to="/analytics"
            icon={<BarChart2 size={20} />}
            label="Analytics"
          />
        </NavGroup>

        <NavGroup title="">
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
          <NavItem
            to="/upgrade"
            icon={<Crown size={20} />}
            label="Upgrade Plan"
          />
        </NavGroup>
      </nav>
    </aside>
  );
};

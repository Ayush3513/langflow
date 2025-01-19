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
  GitBranch
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

const NavGroup = ({ title, children }: NavGroupProps): JSX.Element => (
  <div className="mb-6">
    <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
      {title}
    </h2>
    <ul className="space-y-1">{children}</ul>
  </div>
);

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps): JSX.Element => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

function Sidebar(): JSX.Element {
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
            to="/workflow"
            icon={<GitBranch size={20} />}
            label="Workflow Automation"
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
}

export default Sidebar;

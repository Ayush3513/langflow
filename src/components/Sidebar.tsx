import React from 'react';
import { Home, Plus, Youtube, MessageCircle, Search, Target, TrendingUp, BarChart2, Settings, Crown } from 'lucide-react';
import clsx from 'clsx';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={clsx(
        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
        active
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  </li>
);

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
      {title}
    </h2>
    <ul className="space-y-1">
      {children}
    </ul>
  </div>
);

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen p-4">
      <div className="flex items-center gap-2 px-4 mb-8">
        <BarChart2 className="w-8 h-8 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-900">ART Finder</h1>
      </div>
      
      <nav className="space-y-6">
        <NavGroup title="">
          <NavItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            active={activeSection === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
          />
          <NavItem 
            icon={<Plus size={20} />} 
            label="New Research"
            active={activeSection === 'new-research'}
            onClick={() => onNavigate('new-research')}
          />
        </NavGroup>

        <NavGroup title="Research Sources">
          <NavItem 
            icon={<Youtube size={20} />} 
            label="YouTube Analysis"
            active={activeSection === 'youtube'}
            onClick={() => onNavigate('youtube')}
          />
          <NavItem 
            icon={<MessageCircle size={20} />} 
            label="Social Listening"
            active={activeSection === 'social'}
            onClick={() => onNavigate('social')}
          />
          <NavItem 
            icon={<Search size={20} />} 
            label="Competitor Research"
            active={activeSection === 'competitor'}
            onClick={() => onNavigate('competitor')}
          />
        </NavGroup>

        <NavGroup title="Insights & Analysis">
          <NavItem 
            icon={<Target size={20} />} 
            label="Pain Points"
            active={activeSection === 'pain-points'}
            onClick={() => onNavigate('pain-points')}
          />
          <NavItem 
            icon={<TrendingUp size={20} />} 
            label="Trends"
            active={activeSection === 'trends'}
            onClick={() => onNavigate('trends')}
          />
          <NavItem 
            icon={<BarChart2 size={20} />} 
            label="Analytics"
            active={activeSection === 'analytics'}
            onClick={() => onNavigate('analytics')}
          />
        </NavGroup>

        <NavGroup title="">
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings"
            active={activeSection === 'settings'}
            onClick={() => onNavigate('settings')}
          />
          <NavItem 
            icon={<Crown size={20} />} 
            label="Upgrade Plan"
            active={activeSection === 'upgrade'}
            onClick={() => onNavigate('upgrade')}
          />
        </NavGroup>
      </nav>
    </aside>
  );
};
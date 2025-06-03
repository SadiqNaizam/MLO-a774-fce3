import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  CreditCard,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Briefcase, // Used as a placeholder for Logo icon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  isCategory?: boolean;
  children?: NavItem[];
}

const navItemsData: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '#',
    isActive: true,
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: Users,
    href: '#',
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: UserCheck,
    href: '#',
  },
  {
    id: 'main-apps',
    label: 'MAIN APPS',
    icon: HelpCircle, // Placeholder for category, not displayed
    href: '#',
    isCategory: true,
  },
  {
    id: 'proposals',
    label: 'Proposals',
    icon: FileText,
    href: '#',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: CreditCard,
    href: '#',
  },
  {
    id: 'items',
    label: 'Items',
    icon: ShoppingCart,
    href: '#',
  },
  {
    id: 'tools',
    label: 'TOOLS & COMPONENTS',
    icon: HelpCircle, // Placeholder for category, not displayed
    href: '#',
    isCategory: true,
  },
  {
    id: 'mail',
    label: 'Mail',
    icon: Mail,
    href: '#',
  },
  {
    id: 'shoebox',
    label: 'Shoebox',
    icon: Archive,
    href: '#',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: CalendarDays,
    href: '#',
  },
];

const bottomNavItemsData: NavItem[] = [
  {
    id: 'help1',
    label: 'Help',
    icon: HelpCircle,
    href: '#',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '#',
  },
  {
    id: 'help2',
    label: 'Help',
    icon: HelpCircle,
    href: '#',
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed top-0 left-0 z-20',
        className
      )}
    >
      <div className="h-[70px] flex items-center px-6 border-b border-sidebar-border">
        <Briefcase className="h-8 w-8 mr-2 text-sidebar-primary" />
        <h1 className="text-xl font-semibold text-sidebar-foreground">Leads Corp</h1>
      </div>

      <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
        {navItemsData.map((item) => {
          if (item.isCategory) {
            return (
              <h2
                key={item.id}
                className="px-3 pt-4 pb-1 text-xs font-semibold uppercase text-sidebar-foreground opacity-70 tracking-wider"
              >
                {item.label}
              </h2>
            );
          }
          const IconComponent = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-md text-sm font-medium',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring',
                item.isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground'
              )}
            >
              <IconComponent className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomNavItemsData.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-md text-sm font-medium',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring',
                'text-sidebar-foreground'
              )}
            >
              <IconComponent className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

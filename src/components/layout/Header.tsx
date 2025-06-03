import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, Plus, ChevronDown, CalendarDays, Bell, UserCircle } from 'lucide-react';

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void; // For mobile sidebar toggle, if implemented by parent
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar, title = "Leads Overview" }) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last_6_months');

  return (
    <header
      className={cn(
        'fixed top-0 left-0 md:left-64 right-0 h-[70px] flex items-center justify-between px-6 bg-card border-b border-border z-10',
        className
      )}
    >
      <div className="flex items-center">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden mr-2">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        {/* Project Info targetPage is "Leads Overview" */}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center space-x-3">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-auto md:w-[180px] text-sm h-9">
            <CalendarDays className="h-4 w-4 mr-0 md:mr-2 opacity-70" />
            <SelectValue className="hidden md:inline" placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_24_hours">Last 24 hours</SelectItem>
            <SelectItem value="last_7_days">Last 7 days</SelectItem>
            <SelectItem value="last_30_days">Last 30 days</SelectItem>
            <SelectItem value="last_6_months">Last 6 months</SelectItem>
            <SelectItem value="last_12_months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="h-9">
              <Plus className="mr-2 h-4 w-4" />
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Import Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
               {/* Placeholder for Avatar if user data is available */}
              <UserCircle className="h-7 w-7 text-muted-foreground hover:text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

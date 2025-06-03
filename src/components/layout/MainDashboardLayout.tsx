import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle?: string; 
}

const MainDashboardLayout: React.FC<MainDashboardLayoutProps> = ({ children, className, pageTitle }) => {
  // State for mobile sidebar, based on Header's toggle button
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const toggleMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Sidebar: fixed on desktop, slides in/out on mobile */}
      {/* The Sidebar component itself handles its mobile visibility via isMobileOpen prop and Tailwind classes */}
      {/* However, for this strict interpretation of layout requirements where sidebar is always w-64 fixed: */}
      {/* We will use the simpler always-on sidebar for now. */}
      {/* To implement mobile toggle properly, Sidebar would need isMobileOpen prop and conditional classes */}
      <Sidebar />
      
      {/* Header: its 'left' positioning is responsive (left-0 on mobile, left-64 on desktop) */}
      {/* Pass pageTitle from project info to Header */}
      <Header onToggleSidebar={toggleMobileSidebar} title={pageTitle} />
      
      {/* Main content area */}
      {/* Must be offset by fixed sidebar (md:ml-64) and fixed header (mt-[70px]) */}
      {/* On mobile (screens < md), sidebar is overlaid or hidden, so main content takes full width (ml-0) */}
      <main className={cn(
        "mt-[70px] p-6 min-w-0", // Basic styling: margin-top for header, padding, min-width
        "md:ml-64", // Desktop: offset by fixed sidebar width
        "overflow-y-auto" // Scrollable content
      )}>
        {/* Container for content children, as per layout.mainContent.container */}
        <div className="flex flex-col gap-8">
          {children}
        </div>
      </main>
      
      {/* Mobile Sidebar Overlay: If sidebar is toggled on mobile, it needs to appear. */}
      {/* This example shows a simplified version. A full implementation might involve Sidebar having an isMobileOpen prop. */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/30 md:hidden"
          onClick={toggleMobileSidebar}
          aria-label="Close sidebar overlay"
        />
      )}
      {/* The actual Sidebar component for mobile would be controlled by isMobileSidebarOpen */}
      {/* This version relies on Header being md:left-64 and Sidebar being fixed w-64 for desktop */}
      {/* For mobile, Header is left-0. If Sidebar needs to appear, it would typically overlay. */}
      {/* The Sidebar provided in Sidebar.tsx is always fixed left. For mobile overlay, it would need adjustments. */}
      {/* The current Header onToggleSidebar call would be for a drawer-style sidebar not implemented here. */}
      {/* Sticking to simplest interpretation: sidebar fixed, header fixed offset, main fixed offset. */}
      {/* The mobile menu button in Header suggests a more dynamic sidebar for mobile, but layout files only define fixed structure. */}

    </div>
  );
};

export default MainDashboardLayout;

import React from 'react';
import MainDashboardLayout from '../components/layout/MainDashboardLayout';
import StatsSummary from '../components/Dashboard/StatsSummary';
import LineChartCard from '../components/Dashboard/LineChartCard';
import ReasonsGrid from '../components/Dashboard/ReasonsGrid';
import KeyMetricsCard from '../components/Dashboard/KeyMetricsCard';

/**
 * LeadsOverviewPage is the main dashboard page for viewing leads-related statistics and data.
 * It utilizes the MainDashboardLayout to structure the page with a sidebar and header,
 * and displays various informational components like StatsSummary, LineChartCard,
 * ReasonsGrid, and KeyMetricsCard.
 */
const LeadsOverviewPage: React.FC = () => {
  return (
    <MainDashboardLayout pageTitle="Leads Overview">
      {/* StatsSummary component displaying funnel count and lead sources */}
      <StatsSummary />

      {/* LineChartCard component displaying leads tracking data over time */}
      <LineChartCard />

      {/* 
        A grid container for ReasonsGrid and KeyMetricsCard to display them side-by-side on larger screens.
        On smaller screens, they will stack vertically.
        The MainDashboardLayout already applies a flex flex-col gap-8 to its children,
        so this div will be one of those children, and itself contains a grid.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ReasonsGrid component showing reasons for lost leads, occupying 2/3 of the width on large screens */}
        <ReasonsGrid className="lg:col-span-2" />
        
        {/* KeyMetricsCard component displaying other key data points, occupying 1/3 of the width on large screens */}
        <KeyMetricsCard className="lg:col-span-1" />
      </div>
    </MainDashboardLayout>
  );
};

export default LeadsOverviewPage;

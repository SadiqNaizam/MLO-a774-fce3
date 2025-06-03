import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-red-500' }, // Using Tailwind colors for simplicity
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-yellow-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 5, color: 'bg-indigo-500' }, // Image showed 'average time on this stage' tooltip here
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-500' },
];

interface SourceData {
  name: string;
  value: number;
  dealValue: number;
  color: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 50, dealValue: 3000, color: 'hsl(var(--destructive))' }, // Red
  { name: 'Behance', value: 40, dealValue: 1000, color: 'hsl(var(--primary))' },   // Blue
  { name: 'Instagram', value: 10, dealValue: 1000, color: 'hsl(var(--accent))' },    // Green
  // The image shows Dribble as 10%, making total 110%. Normalizing to 100% for this example.
  // { name: 'Dribbble', value: 10, dealValue: 1000, color: 'hsl(var(--secondary))' }, // Light Gray/Secondary
];

// Adjusting values to sum up to 100 for pie chart logic
const normalizedSourcesData = [
    { name: 'Clutch', value: 40, dealValue: 3000, color: 'hsl(var(--destructive))' },
    { name: 'Behance', value: 30, dealValue: 1000, color: 'hsl(var(--primary))' },
    { name: 'Instagram', value: 20, dealValue: 1000, color: 'hsl(var(--accent))' },
    { name: 'Dribbble', value: 10, dealValue: 1000, color: 'hsl(var(--secondary))' },
];

interface StatsSummaryProps {
  className?: string;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ className }) => {
  const totalActiveLeads = funnelData.reduce((sum, stage) => sum + stage.count, 0);
  const totalFunnelWidth = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-6', className)}>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Funnel count</CardTitle>
            <CardDescription>
              <span className="text-3xl font-bold text-foreground">{totalActiveLeads}</span> active leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex h-3 rounded-full overflow-hidden">
                {funnelData.map((stage) => (
                  <div
                    key={stage.id}
                    className={cn('h-full', stage.color)}
                    style={{ width: `${(stage.count / totalFunnelWidth) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <ul className="space-y-3">
              {funnelData.map((stage) => (
                <li key={stage.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className={cn('w-3 h-3 rounded-full mr-2', stage.color)}></span>
                    <span className="text-muted-foreground">{stage.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-foreground w-10 text-right">{stage.count}</span>
                    <span className="text-muted-foreground w-16 text-right">$ {stage.value}</span>
                    {stage.id === 'inConversation' ? (
                       <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-muted-foreground w-16 text-right cursor-help">{stage.days} days</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Average time on this stage</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                       <span className="text-muted-foreground w-16 text-right">{stage.days} days</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sources</CardTitle>
            <CardDescription>Lead generation sources and deal values.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={normalizedSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {normalizedSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props) => [`${value}%`, props.payload.name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2">
              {normalizedSourcesData.map((source) => (
                <li key={source.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></span>
                    <span className="text-muted-foreground">{source.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">$ {source.dealValue.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs">{source.value}%</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4 text-right">from leads total</p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default StatsSummary;

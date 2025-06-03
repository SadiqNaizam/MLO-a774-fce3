import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { CalendarDays } from 'lucide-react';

interface ChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
  leadsCame?: number;
  leadsConverted?: number;
  totalDealsSize?: number;
}

const leadsTrackingData: ChartDataPoint[] = [
  { month: 'March', closedWon: 68, closedLost: 82, leadsCame: 150, leadsConverted: 68, totalDealsSize: 34000 },
  { month: 'April', closedWon: 42, closedLost: 35, leadsCame: 120, leadsConverted: 42, totalDealsSize: 21000 },
  { month: 'May', closedWon: 65, closedLost: 90, leadsCame: 180, leadsConverted: 65, totalDealsSize: 45000 },
  { month: 'June', closedWon: 12, closedLost: 60, leadsCame: 90, leadsConverted: 12, totalDealsSize: 8000 },
  { month: 'July', closedWon: 45, closedLost: 28, leadsCame: 130, leadsConverted: 45, totalDealsSize: 29000 },
  { month: 'August', closedWon: 98, closedLost: 52, leadsCame: 200, leadsConverted: 98, totalDealsSize: 61000 },
];

interface LineChartCardProps {
  className?: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last_6_months');

  const totalClosed = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0);

  const chartDataKeyWon = activeTab === 'leadsCame' ? 'leadsCame' : 
                          activeTab === 'leadsConverted' ? 'closedWon' : 
                          'totalDealsSize';
  const chartDataKeyLost = activeTab === 'leadsConverted' ? 'closedLost' : undefined;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Leads tracking</CardTitle>
          <CardDescription className="mt-1">
            <span className="text-2xl font-bold text-foreground">{totalClosed.toLocaleString()}</span> total closed
            <span className="ml-4 text-2xl font-bold text-foreground">{totalLost.toLocaleString()}</span> total lost
          </CardDescription>
        </div>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-[180px] text-sm h-9">
            <CalendarDays className="h-4 w-4 mr-2 opacity-70" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_6_months">Last 6 months</SelectItem>
            <SelectItem value="last_12_months">Last 12 months</SelectItem>
            <SelectItem value="all_time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
            <TabsTrigger value="leadsCame">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealsSize">Total deals size</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => activeTab === 'totalDealsSize' ? `$${(value/1000)}k` : value.toString()} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                formatter={(value: number, name: string) => {
                    const formattedValue = activeTab === 'totalDealsSize' ? `$${value.toLocaleString()}` : value.toLocaleString();
                    let displayName = '';
                    if (name === 'closedWon') displayName = 'Closed Won';
                    else if (name === 'closedLost') displayName = 'Closed Lost';
                    else if (name === 'leadsCame') displayName = 'Leads Came';
                    else if (name === 'totalDealsSize') displayName = 'Total Deals Size';
                    return [formattedValue, displayName];
                }}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle" 
                wrapperStyle={{paddingBottom: '20px'}}
                formatter={(value, entry) => {
                    let displayName = '';
                    if (entry?.dataKey === 'closedWon') displayName = 'Closed Won';
                    else if (entry?.dataKey === 'closedLost') displayName = 'Closed Lost';
                    else if (entry?.dataKey === 'leadsCame') displayName = 'Leads Came';
                    else if (entry?.dataKey === 'totalDealsSize') displayName = 'Total Deals Size';
                    return <span className="text-sm text-muted-foreground ml-1">{displayName}</span>;
                }}
              />
              <defs>
                <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
                {chartDataKeyLost && (
                <linearGradient id="colorLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
                )}
              </defs>
              <Area 
                type="monotone" 
                dataKey={chartDataKeyWon} 
                strokeWidth={2}
                stroke="hsl(var(--accent))" 
                fillOpacity={1} 
                fill="url(#colorWon)"
                dot={{ stroke: 'hsl(var(--accent))', strokeWidth: 2, r:4, fill: 'hsl(var(--card))'}}
                activeDot={{ r: 6, stroke: 'hsl(var(--accent))', fill: 'hsl(var(--accent))' }}
              />
              {chartDataKeyLost && (
                <Area 
                  type="monotone" 
                  dataKey={chartDataKeyLost} 
                  strokeWidth={2}
                  stroke="hsl(var(--destructive))" 
                  fillOpacity={1} 
                  fill="url(#colorLost)" 
                  dot={{ stroke: 'hsl(var(--destructive))', strokeWidth: 2, r:4, fill: 'hsl(var(--card))'}}
                  activeDot={{ r: 6, stroke: 'hsl(var(--destructive))', fill: 'hsl(var(--destructive))' }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;

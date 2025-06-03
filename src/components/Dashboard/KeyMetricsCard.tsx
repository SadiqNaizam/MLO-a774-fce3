import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricItem {
  id: string;
  value: string | number;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const metricsData: MetricItem[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  {
    id: 'conversionTime',
    value: 12,
    label: 'days in average to convert lead',
  },
  {
    id: 'inactiveLeads',
    value: 30,
    label: 'inactive leads',
    hasInfo: true,
    infoText: 'Leads with no activity in the last 30 days.',
  },
];

interface KeyMetricsCardProps {
  className?: string;
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle>Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
            {metricsData.map((metric) => (
              <div key={metric.id} className="flex flex-col">
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  {metric.hasInfo && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default KeyMetricsCard;

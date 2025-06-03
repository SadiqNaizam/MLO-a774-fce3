import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonItem {
  id: string;
  percentage: number;
  description: string;
}

const reasonsData: ReasonItem[] = [
  { id: 'proposal', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venture', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'unclear_again', percentage: 30, description: 'The proposal is unclear' }, // Duplicate description from image
];

interface ReasonsGridProps {
  className?: string;
}

const ReasonsGrid: React.FC<ReasonsGridProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsData.map((reason) => (
            <div key={reason.id} className="flex flex-col">
              <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsGrid;

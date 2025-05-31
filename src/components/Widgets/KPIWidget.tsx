import React from 'react';
import { ArrowUpRight, ArrowDownRight, GripVertical } from 'lucide-react';
import Card, { CardContent } from '../UI/Card';
import { KPIData } from '../../types';

interface KPIWidgetProps {
  title: string;
  data: KPIData;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ title, data }) => {
  if (!data || typeof data.value === 'undefined') {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col h-full justify-between">
          <div className="flex items-center">
            <div className="drag-handle cursor-move p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <GripVertical size={16} className="text-gray-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium ml-2">{title}</h3>
          </div>
          <div className="text-gray-500 dark:text-gray-400">No data available</div>
        </CardContent>
      </Card>
    );
  }

  const percentChange = data.previousValue 
    ? ((data.value - data.previousValue) / data.previousValue) * 100 
    : 0;
  
  const isPositive = percentChange >= 0;
  const absChange = Math.abs(percentChange).toFixed(1);
  
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col h-full justify-between">
        <div className="flex items-center">
          <div className="drag-handle cursor-move p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <GripVertical size={16} className="text-gray-400" />
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium ml-2">{title}</h3>
        </div>
        
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.value.toLocaleString()}
            </span>
            {data.unit && (
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {data.unit}
              </span>
            )}
          </div>
          
          <div className={`flex items-center mt-2 ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            <span className="ml-1 text-sm font-medium">
              {absChange}%
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              vs previous
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIWidget;
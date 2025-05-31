import React from 'react';
import { Widget, WidgetType } from '../../types';
import Card, { CardContent, CardHeader } from '../UI/Card';
import LineChart from '../Chart/LineChart';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';
import KPIWidget from './KPIWidget';
import TableWidget from './TableWidget';
import { X, GripVertical } from 'lucide-react';

interface WidgetRendererProps {
  widget: Widget;
  onRemove?: (id: string) => void;
}

const WidgetRenderer: React.FC<WidgetRendererProps> = ({ 
  widget, 
  onRemove 
}) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case WidgetType.LineChart:
        return (
          <div className="h-full flex items-center justify-center">
            <LineChart data={widget.data} />
          </div>
        );
        
      case WidgetType.BarChart:
        return (
          <div className="h-full flex items-center justify-center">
            <BarChart data={widget.data} />
          </div>
        );
        
      case WidgetType.PieChart:
        return (
          <div className="h-full flex items-center justify-center">
            <PieChart data={widget.data} />
          </div>
        );
        
      case WidgetType.KPI:
        return <KPIWidget title={widget.title} data={widget.data} />;
        
      case WidgetType.Table:
        return <TableWidget title={widget.title} data={widget.data} />;
        
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Unknown widget type
          </div>
        );
    }
  };

  if (widget.type === WidgetType.KPI) {
    return renderWidgetContent();
  }

  return (
    <Card className="h-full">
      <CardHeader className="py-2">
        <div className="flex items-center">
          <div className="drag-handle cursor-move p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <GripVertical size={16} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium ml-2">{widget.title}</h3>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(widget.id)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </CardHeader>
      <CardContent>{renderWidgetContent()}</CardContent>
    </Card>
  );
};

export default WidgetRenderer;
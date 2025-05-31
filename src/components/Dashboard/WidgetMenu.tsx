import React, { useState } from 'react';
import { PlusCircle, BarChart3, LineChart, PieChart, Table, Activity } from 'lucide-react';
import Button from '../UI/Button';
import { WidgetType } from '../../types';

interface WidgetMenuProps {
  onAddWidget: (type: WidgetType, title: string) => void;
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({ onAddWidget }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState('');
  const [selectedType, setSelectedType] = useState<WidgetType | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSelectedType(null);
    setWidgetTitle('');
  };

  const handleAddWidget = () => {
    if (selectedType && widgetTitle.trim()) {
      onAddWidget(selectedType, widgetTitle);
      toggleMenu();
    }
  };

  const widgetTypes = [
    { type: WidgetType.LineChart, icon: <LineChart size={20} />, label: 'Line Chart' },
    { type: WidgetType.BarChart, icon: <BarChart3 size={20} />, label: 'Bar Chart' },
    { type: WidgetType.PieChart, icon: <PieChart size={20} />, label: 'Pie Chart' },
    { type: WidgetType.KPI, icon: <Activity size={20} />, label: 'KPI Card' },
    { type: WidgetType.Table, icon: <Table size={20} />, label: 'Table' },
  ];

  return (
    <div className="relative">
      <Button
        onClick={toggleMenu}
        variant="primary"
        className="flex items-center gap-2"
      >
        <PlusCircle size={16} />
        Add Widget
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10 p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3">Add Widget</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Widget Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter title"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Widget Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {widgetTypes.map((widget) => (
                <button
                  key={widget.type}
                  className={`flex flex-col items-center justify-center p-3 rounded-md border transition-colors ${
                    selectedType === widget.type
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedType(widget.type)}
                >
                  {widget.icon}
                  <span className="mt-1 text-xs">{widget.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={toggleMenu}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddWidget}
              disabled={!selectedType || !widgetTitle.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetMenu;
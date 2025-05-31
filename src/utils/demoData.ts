import { ChartData, KPIData, TableData, Widget, WidgetType } from '../types';

// Generate random data for demo purposes
export const generateRandomData = (points: number): number[] => {
  return Array.from({ length: points }, () => Math.floor(Math.random() * 100));
};

export const generateTimeSeries = (days: number): string[] => {
  const labels: string[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  
  return labels;
};

// Generate demo widgets
export const generateDemoData = (): Widget[] => {
  const lineChartData: ChartData = {
    id: 'revenue',
    values: [42, 55, 49, 60, 72, 68, 82],
    labels: generateTimeSeries(6),
    color: '#2563eb',
  };

  const barChartData: ChartData = {
    id: 'users',
    values: [350, 420, 380, 490, 520, 620, 590],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    color: '#9333ea',
  };

  const pieChartData: ChartData = {
    id: 'traffic',
    values: [35, 25, 20, 15, 5],
    labels: ['Direct', 'Organic', 'Social', 'Referral', 'Other'],
    color: '#0d9488',
  };

  const kpi1Data: KPIData = {
    value: 1823,
    previousValue: 1700,
    label: 'Total Users',
    unit: '',
  };

  const kpi2Data: KPIData = {
    value: 84.5,
    previousValue: 82.1,
    label: 'Retention',
    unit: '%',
  };

  const tableData: TableData = {
    headers: ['Product', 'Sales', 'Status'],
    rows: [
      { id: 1, product: 'Widget Pro', sales: 452, status: 'Active' },
      { id: 2, product: 'SuperApp', sales: 312, status: 'Active' },
      { id: 3, product: 'MegaTool', sales: 287, status: 'Pending' },
      { id: 4, product: 'PowerSuite', sales: 189, status: 'Active' },
    ],
  };

  return [
    {
      id: 'widget-1',
      type: WidgetType.LineChart,
      title: 'Revenue Trend',
      size: { w: 6, h: 3 },
      data: lineChartData,
    },
    {
      id: 'widget-2',
      type: WidgetType.BarChart,
      title: 'Weekly Users',
      size: { w: 4, h: 3 },
      data: barChartData,
    },
    {
      id: 'widget-3',
      type: WidgetType.PieChart,
      title: 'Traffic Sources',
      size: { w: 3, h: 3 },
      data: pieChartData,
    },
    {
      id: 'widget-4',
      type: WidgetType.KPI,
      title: 'Users',
      size: { w: 2, h: 2 },
      data: kpi1Data,
    },
    {
      id: 'widget-5',
      type: WidgetType.KPI,
      title: 'Retention',
      size: { w: 2, h: 2 },
      data: kpi2Data,
    },
    {
      id: 'widget-6',
      type: WidgetType.Table,
      title: 'Top Products',
      size: { w: 5, h: 3 },
      data: tableData,
    },
  ];
};

// Function to update data for real-time simulation
export const updateWidgetData = (widget: Widget): Widget => {
  const newWidget = { ...widget };
  
  switch (widget.type) {
    case WidgetType.LineChart:
    case WidgetType.BarChart:
      if (widget.data) {
        const newValues = [...widget.data.values];
        // Update last value or add a new one
        newValues[newValues.length - 1] = Math.floor(Math.random() * 100);
        newWidget.data = { ...widget.data, values: newValues };
      }
      break;
      
    case WidgetType.KPI:
      if (widget.data) {
        const currentValue = widget.data.value;
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = currentValue + (Math.random() * 10 * change);
        newWidget.data = { 
          ...widget.data, 
          previousValue: currentValue,
          value: Number(newValue.toFixed(1)) 
        };
      }
      break;
      
    // For other widget types, we could add specific update logic
  }
  
  return newWidget;
};
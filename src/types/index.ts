export type Widget = {
  id: string;
  type: WidgetType;
  title: string;
  size: { w: number; h: number };
  data?: any;
  settings?: any;
};

export enum WidgetType {
  LineChart = 'line-chart',
  BarChart = 'bar-chart',
  PieChart = 'pie-chart',
  KPI = 'kpi',
  Table = 'table',
}

export type ChartData = {
  id: string;
  values: number[];
  labels: string[];
  color?: string;
};

export type KPIData = {
  value: number;
  previousValue: number;
  label: string;
  unit?: string;
};

export type TableData = {
  headers: string[];
  rows: any[];
};

export type Layout = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
};

export type ThemeType = 'light' | 'dark' | 'system';
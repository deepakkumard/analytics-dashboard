import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Layout, ThemeType, Widget, WidgetType } from '../types';
import { generateDemoData } from '../utils/demoData';

interface DashboardState {
  widgets: Widget[];
  layouts: Layout[];
  theme: ThemeType;
  addWidget: (type: WidgetType, title: string) => void;
  removeWidget: (id: string) => void;
  updateLayouts: (layouts: Layout[]) => void;
  updateWidgetSettings: (id: string, settings: any) => void;
  setTheme: (theme: ThemeType) => void;
}

export const useStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: generateDemoData(),
      layouts: generateDemoData().map((widget) => ({
        i: widget.id,
        x: Math.floor(Math.random() * 6) * 2,
        y: Infinity,
        w: widget.size.w,
        h: widget.size.h,
        minW: 2,
        minH: 2,
      })),
      theme: 'system',
      
      addWidget: (type, title) => {
        const id = `widget-${Date.now()}`;
        let size = { w: 4, h: 3 };
        let defaultData;
        
        // Initialize default data based on widget type
        switch (type) {
          case WidgetType.KPI:
            size = { w: 2, h: 2 };
            defaultData = {
              value: 0,
              previousValue: 0,
              unit: '',
              label: title
            };
            break;
            
          case WidgetType.PieChart:
            size = { w: 3, h: 3 };
            defaultData = {
              values: [30, 20, 10],
              labels: ['Category 1', 'Category 2', 'Category 3'],
              color: '#2563eb'
            };
            break;
            
          case WidgetType.Table:
            defaultData = {
              headers: ['Column 1', 'Column 2', 'Column 3'],
              rows: [
                { 'column 1': 'Data 1', 'column 2': 'Data 2', 'column 3': 'Data 3' }
              ]
            };
            break;
            
          case WidgetType.LineChart:
          case WidgetType.BarChart:
            defaultData = {
              values: [10, 20, 15, 25, 30],
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              color: type === WidgetType.LineChart ? '#2563eb' : '#9333ea'
            };
            break;
            
          default:
            defaultData = {};
        }
        
        set((state) => ({
          widgets: [
            ...state.widgets,
            { id, type, title, size, data: defaultData },
          ],
          layouts: [
            ...state.layouts,
            {
              i: id,
              x: 0,
              y: Infinity,
              w: size.w,
              h: size.h,
              minW: 2,
              minH: 2,
            },
          ],
        }));
      },
      
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          layouts: state.layouts.filter((l) => l.i !== id),
        })),
      
      updateLayouts: (layouts) => set({ layouts }),
      
      updateWidgetSettings: (id, settings) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, settings } : w
          ),
        })),
      
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
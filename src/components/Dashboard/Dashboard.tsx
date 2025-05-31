import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useStore } from '../../store/useStore';
import { socketService } from '../../services/websocket';
import { Layout, Widget } from '../../types';
import WidgetRenderer from '../Widgets/WidgetRenderer';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const { widgets, layouts, updateLayouts, removeWidget } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    socketService.connect();
    
    const updateInterval = setInterval(() => {
      if (widgets.length > 0) {
        const randomIndex = Math.floor(Math.random() * widgets.length);
        const updatedWidget = socketService.simulateWidgetUpdate(widgets[randomIndex]);
        
        useStore.setState({
          widgets: widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w)
        });
      }
    }, 5000);
    
    return () => {
      socketService.disconnect();
      clearInterval(updateInterval);
    };
  }, [widgets]);

  const handleLayoutChange = (layout: Layout[]) => {
    if (mounted) {
      updateLayouts(layout);
    }
  };

  const handleRemoveWidget = (id: string) => {
    removeWidget(id);
  };

  const layoutConfig = {
    lg: { breakpoint: 1200, cols: 12, rowHeight: 100 },
    md: { breakpoint: 996, cols: 10, rowHeight: 90 },
    sm: { breakpoint: 768, cols: 6, rowHeight: 80 },
    xs: { breakpoint: 480, cols: 4, rowHeight: 70 },
    xxs: { breakpoint: 0, cols: 2, rowHeight: 60 },
  };

  return (
    <div className="dashboard-container">
      {mounted && (
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layouts }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          containerPadding={[16, 16]}
          margin={[16, 16]}
          isResizable={true}
          isDraggable={true}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".drag-handle"
          useCSSTransforms={true}
        >
          {widgets.map((widget) => (
            <div key={widget.id} className="widget-container">
              <WidgetRenderer widget={widget} onRemove={handleRemoveWidget} />
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default Dashboard;
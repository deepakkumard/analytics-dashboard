import { io, Socket } from 'socket.io-client';
import { Widget } from '../types';
import { updateWidgetData } from '../utils/demoData';

// This is a mock implementation that simulates real-time data
// In a real application, you would connect to an actual WebSocket server
export class WebSocketService {
  private socket: Socket | null = null;
  private simulationInterval: number | null = null;
  private updateCallbacks: ((widgets: Widget[]) => void)[] = [];

  connect(): void {
    // In a real implementation, connect to actual WebSocket server
    // this.socket = io('http://your-websocket-server');
    console.log('WebSocket service initialized (simulation mode)');
    
    // For demo purposes, we'll simulate real-time updates
    this.startSimulation();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    this.stopSimulation();
  }

  onUpdate(callback: (widgets: Widget[]) => void): void {
    this.updateCallbacks.push(callback);
  }

  private startSimulation(): void {
    // Simulate real-time updates every 5 seconds
    this.simulationInterval = window.setInterval(() => {
      this.updateCallbacks.forEach((callback) => {
        callback([]);
      });
    }, 5000);
  }

  private stopSimulation(): void {
    if (this.simulationInterval !== null) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }
  
  // In a real app, this would send data to the server
  sendUpdate(data: any): void {
    console.log('Sending update:', data);
    // if (this.socket) {
    //   this.socket.emit('update', data);
    // }
  }

  // For demo purposes - simulate getting updates for a specific widget
  simulateWidgetUpdate(widget: Widget): Widget {
    return updateWidgetData(widget);
  }
}

export const socketService = new WebSocketService();
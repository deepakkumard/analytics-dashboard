# Interactive Dashboard

A modern, responsive dashboard application built with React, TypeScript, and D3.js. Features real-time updates, drag-and-drop widget management, and dynamic data visualization.

## Features

- 📊 **Interactive Charts**: Line, Bar, and Pie charts powered by D3.js
- 🔄 **Real-time Updates**: Live data updates via WebSocket simulation
- 🎨 **Theme Support**: Light/Dark mode with system preference detection
- 📱 **Responsive Design**: Adapts to different screen sizes
- 🎯 **KPI Cards**: Display key metrics with trend indicators
- 📋 **Data Tables**: Structured data presentation
- 🔄 **Drag & Drop**: Customizable widget layout
- 💾 **Layout Persistence**: Saves user preferences to local storage

## Tech Stack

- React 18 with TypeScript
- D3.js for data visualization
- Tailwind CSS for styling
- Zustand for state management
- React Grid Layout for drag-and-drop functionality
- Socket.io for real-time data simulation
- Vite for development and building

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Adding Widgets

1. Click the "Add Widget" button in the header
2. Select a widget type
3. Enter a title
4. Click "Add" to place the widget on the dashboard

### Customizing Layout

- Drag widgets by their header to reposition
- Resize widgets using the handle at the bottom-right corner
- Remove widgets using the X button in their header

### Theme Switching

Use the theme toggle in the header to switch between:
- Light mode
- Dark mode
- System preference

## Project Structure

```
src/
├── components/
│   ├── Chart/          # D3.js chart components
│   ├── Dashboard/      # Dashboard and widget management
│   ├── Widgets/        # Individual widget components
│   └── UI/             # Reusable UI components
├── services/
│   └── websocket.ts    # WebSocket simulation
├── store/
│   └── useStore.ts     # Zustand store configuration
├── types/
│   └── index.ts        # TypeScript type definitions
└── utils/
    └── demoData.ts     # Demo data generation
```

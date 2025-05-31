import React from 'react';
import Card, { CardContent, CardHeader } from '../UI/Card';
import { TableData } from '../../types';

interface TableWidgetProps {
  title: string;
  data: TableData;
}

const TableWidget: React.FC<TableWidgetProps> = ({ title, data }) => {
  // Validate data structure before rendering
  if (!data || !Array.isArray(data.headers) || !Array.isArray(data.rows)) {
    return (
      <Card className="h-full">
        <CardHeader>
          <h3 className="text-lg font-medium">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">Invalid table data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                {data.headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  {data.headers.map((header, colIndex) => {
                    const key = header.toLowerCase();
                    const value = row[key] || '';
                    
                    // Special styling for status column
                    if (key === 'status') {
                      const statusClasses = {
                        'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                        'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        'inactive': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                      };
                      
                      const statusClass = statusClasses[value.toLowerCase() as keyof typeof statusClasses] || 
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
                      
                      return (
                        <td key={colIndex} className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
                            {value}
                          </span>
                        </td>
                      );
                    }
                    
                    return (
                      <td key={colIndex} className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableWidget;
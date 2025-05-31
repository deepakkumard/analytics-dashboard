import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartData } from '../../types';

interface BarChartProps {
  data: ChartData;
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  width = 500, 
  height = 300 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data?.values?.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.labels)
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.values) as number * 1.1])
      .nice()
      .range([innerHeight, 0]);

    // Create axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('y', 10)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666');

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#666');

    // Add grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yScale.ticks(5))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(0, 0, 0, 0.1)')
      .attr('stroke-dasharray', '3,3');

    // Add bars
    svg
      .selectAll('.bar')
      .data(data.values)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => xScale(data.labels[i]) as number)
      .attr('width', xScale.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('fill', data.color || '#9333ea')
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr('y', (d) => yScale(d))
      .attr('height', (d) => innerHeight - yScale(d));

    // Add tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '5px 10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000);

    svg
      .selectAll('.bar-hover')
      .data(data.values)
      .enter()
      .append('rect')
      .attr('class', 'bar-hover')
      .attr('x', (_, i) => xScale(data.labels[i]) as number)
      .attr('width', xScale.bandwidth())
      .attr('y', 0)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .on('mouseover', (event, d) => {
        const i = data.values.indexOf(d);
        tooltip
          .style('opacity', 1)
          .html(`${data.labels[i]}: ${d}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Clean up
    return () => {
      tooltip.remove();
    };
  }, [data, width, height]);

  if (!data?.values?.length) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  return (
    <div className="bar-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
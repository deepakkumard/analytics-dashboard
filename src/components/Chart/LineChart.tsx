import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartData } from '../../types';

interface LineChartProps {
  data: ChartData;
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
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
      .scalePoint()
      .domain(data.labels)
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.values) as number * 1.1])
      .nice()
      .range([innerHeight, 0]);

    // Create line generator
    const line = d3
      .line<number>()
      .x((_, i) => xScale(data.labels[i]) as number)
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    // Create axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('y', 10)
      .attr('transform', 'rotate(0)')
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

    // Add line path
    const path = svg
      .append('path')
      .datum(data.values)
      .attr('fill', 'none')
      .attr('stroke', data.color || '#2563eb')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Animate the line
    const pathLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(1500)
      .attr('stroke-dashoffset', 0);

    // Add dots
    svg
      .selectAll('.dot')
      .data(data.values)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (_, i) => xScale(data.labels[i]) as number)
      .attr('cy', (d) => yScale(d))
      .attr('r', 0)
      .attr('fill', data.color || '#2563eb')
      .transition()
      .delay((_, i) => i * 150)
      .duration(500)
      .attr('r', 4);

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
      .selectAll('.dot-hover')
      .data(data.values)
      .enter()
      .append('circle')
      .attr('class', 'dot-hover')
      .attr('cx', (_, i) => xScale(data.labels[i]) as number)
      .attr('cy', (d) => yScale(d))
      .attr('r', 10)
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
    <div className="line-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartData } from '../../types';

interface PieChartProps {
  data: ChartData;
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  width = 300, 
  height = 300 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data?.values?.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Color scale
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.labels)
      .range(d3.schemeCategory10);

    // Compute the position of each group on the pie
    const pie = d3.pie<number>().value((d) => d);
    const data_ready = pie(data.values);

    // Build the pie chart
    const arcGenerator = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Add tooltip
    const tooltip = d3.select('body')
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

    // Add the arcs
    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => colorScale(data.labels[i]))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 1);
        const total = data.values.reduce((a, b) => a + b, 0);
        const percent = ((d.data / total) * 100).toFixed(1);
        tooltip
          .style('opacity', 1)
          .html(`${data.labels[d.index]}: ${d.data} (${percent}%)`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.7);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arcGenerator(interpolate(t)) as string;
        };
      });

    // Add labels
    const labelArcGenerator = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8);

    svg
      .selectAll('labels')
      .data(data_ready.filter(d => d.data / d3.sum(data.values) > 0.05)) // Only label slices > 5%
      .enter()
      .append('text')
      .text((d, i) => data.labels[i])
      .attr('transform', d => `translate(${labelArcGenerator.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#fff')
      .style('font-weight', 'bold')
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);

    // Clean up
    return () => {
      tooltip.remove();
    };
  }, [data, width, height]);

  if (!data?.values?.length) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  return (
    <div className="pie-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PieChart;
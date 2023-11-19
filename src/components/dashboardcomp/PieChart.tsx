import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface PieChartProps {
  data: { label: string; value: number }[];
  width_: number;
  height_: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width_, height_ }) => {
  console.log("Piechart");
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredData, setHoveredData] = useState<{
    label: string;
    value: number;
  } | null>(null);

  useEffect(() => {
    const width = width_;
    const height = height_;
    const radius = Math.min(width, height) / 2;

    // Clear previous chart
    d3.select(chartRef.current).select("svg").remove();

    const color = d3.scaleOrdinal().range(["#2a2a2a", "#008c79", "#cdb848"]);

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .sort(null)
      .value((d) => d.value as number);

    const g = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .on("mouseover", function (e, d) {
        setHoveredData(d.data);
      })
      .on("mouseout", function () {
        setHoveredData(null);
      });

    g.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.label) as string)
      .style("cursor", "pointer");

    if (hoveredData) {
      svg
        .append("text")
        .attr("class", "hovered-label")
        .attr("transform", `translate(0, 0)`)
        .style("text-anchor", "middle")
        .style("font-size", "1em")
        .style("fill", "white")
        .text(`${hoveredData.label}: ${hoveredData.value}%`);
    }
  }, [data, hoveredData, height_, width_]);

  return <div ref={chartRef}></div>;
};

export default PieChart;

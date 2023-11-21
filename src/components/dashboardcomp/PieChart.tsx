import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import axios from "axios";

interface PieChartProps {
  data: { id: number; name: string; selected: boolean; distinct: string };
  width_: number;
  height_: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width_, height_ }) => {
  const piechartfor = useSelector((state: any) => state.auth.piechartfor);

  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredData, setHoveredData] = useState<{
    display: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
          data.distinct
        }/`
      )
      .then((res) => {
        console.log(res, "res");
        const data = res.data;
        const width = width_;
        const height = height_;
        const radius = Math.min(width, height) / 2;

        // Clear previous chart
        d3.select(chartRef.current).select("svg").remove();

        const color = d3
          .scaleOrdinal()
          .range(["#2a2a2a", "#008c79", "#cdb848"]);

        const svg = d3
          .select(chartRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

        const arc: any = d3
          .arc()
          .outerRadius(radius - 10)
          .innerRadius(50);

        const pie = d3
          .pie<{ display: string; count: number }>()
          .sort(null)
          .value((d) => d.count as number);

        const g = svg
          .selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc")
          .on("mouseover", function (e, d) {
            console.log(e);
            setHoveredData(d.data);
          })
          .on("mouseout", function () {
            setHoveredData(null);
          });

        g.append("path")
          .attr("d", arc)
          .style("fill", (d) => color(d.data.display) as string)
          .style("cursor", "pointer");

        if (hoveredData) {
          const [x, y] = d3.pointer(event);

          d3.select(chartRef.current) // Select the container (chartRef) where you want to append the div
            .selectAll(".hovered-label")
            .remove(); // Remove previous hovered label if exists

          d3.select(chartRef.current) // Select the container (chartRef) where you want to append the div
            .append("div")
            .attr("class", "hovered-label")
            .style("position", "absolute")
            .style("top", `${y}px`) // Set top position based on mouse y-coordinate
            .style("left", `${x}px`) // Set left position based on mouse x-coordinate
            .style("background-color", "black")
            .style("color", "white")
            .style("padding", "5px")
            .text(`${hoveredData.display}: ${hoveredData.count}`);
        }
      });
  }, [data, hoveredData, height_, width_, piechartfor]);

  return <div ref={chartRef}></div>;
};

export default PieChart;

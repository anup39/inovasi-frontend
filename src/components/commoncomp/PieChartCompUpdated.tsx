import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomizedTooltip";

const piedata = [
  { name: "Group A", count: 5000 },
  { name: "Group B", count: 3000 },
  { name: "Group C", count: 30 },
  { name: "Group D", count: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"black"}>
        Total : 500
      </text> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 5}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};
const gradientColor = (count) => {
  const minLightness = 80; // Lightness of the starting color
  const maxLightness = 40; // Lightness for the darkest shade of red
  // @ts-ignore
  const maxCount = Math.max(...piedata.map((item) => item.count));
  const lightness =
    minLightness - (count / maxCount) * (minLightness - maxLightness);
  return `hsl(159, 83%, ${lightness}%)`;
};
export default class PieChartCompUpdated extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si";

  state = {
    activeIndex: undefined,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  onPieExit = (_, index) => {
    console.log(index, "index");
    this.setState({
      activeIndex: undefined,
    });
  };

  labelPieChart = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    return (
      <g>
        <text x={cx} y={cy - 5} dy={8 - 5} textAnchor="middle" fill={"#858686"}>
          Total
        </text>
        <text
          x={cx}
          y={cy + 7}
          dy={8 + 7}
          textAnchor="middle"
          fill={"#858686"}
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          600
        </text>
      </g>
    );
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={500} cursor="pointer">
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={piedata}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={this.labelPieChart}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            onMouseEnter={this.onPieEnter}
            onMouseLeave={this.onPieExit}
          >
            {piedata.map((entry, index) => (
              // @ts-ignore
              <Cell key={`cell-${index}`} fill={gradientColor(entry.count)} />
            ))}
          </Pie>
          {/* <Tooltip
            itemStyle={{ color: "white", cursor: "pointer" }}
            contentStyle={{
              backgroundColor: "#37525c",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          /> */}
          <Tooltip
            // allowEscapeViewBox={{ x: true, y: false }}
            // viewBox={{
            //   x: 5,
            //   y: 5,
            //   height: 25,
            //   width: 25,
            // }}
            content={<CustomTooltip />}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Sector } from "recharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store";
import CustomTooltip from "./CustomizedTooltip";

interface PieChartCompProps {
  data: { id: number; name: string; selected: boolean; distinct: string };
  params: { estateids: string[]; geometry_wkt: string };
  params_include: boolean;
  width_: number;
  height_: number;
}

const PieChartComp: React.FC<PieChartCompProps> = ({
  data,
  width_,
  height_,
  params,
  params_include,
}) => {
  const [activeIndex, setActiveIndex] = useState(undefined);
  const [piedata, setpieData] = useState([]);
  const piechartfor = useSelector((state: RootState) => state.auth.piechartfor);

  useEffect(() => {
    if (!params_include) {
      axios
        .get(
          `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
            data.distinct
          }/`
        )
        .then((res) => {
          setpieData(res.data);
        });
    } else {
      axios
        .get(
          `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
            data.distinct
          }/?estateids=${params.estateids}&geometry_wkt=${params.geometry_wkt}`
        )
        .then((res) => {
          setpieData(res.data);
        });
    }

    return () => {
      setpieData([]);
    };
  }, [data.distinct, piechartfor, params, params_include]);

  // console.log(gradient[99]); // To get the 100th color in the gradient

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 5}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  // @ts-ignore
  const gradientColor = (count) => {
    const minLightness = 80; // Lightness of the starting color
    const maxLightness = 40; // Lightness for the darkest shade of red
    // @ts-ignore
    const maxCount = Math.max(...piedata.map((item) => item.count));
    const lightness =
      minLightness - (count / maxCount) * (minLightness - maxLightness);
    return `hsl(159, 83%, ${lightness}%)`;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieExit = () => {
    setActiveIndex(undefined);
  };

  const labelPieChart = ({ cx, cy }) => {
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
  return (
    <PieChart width={width_} height={height_}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        isAnimationActive={true}
        dataKey="count"
        nameKey="display"
        data={piedata}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieExit}
        labelLine={false}
        label={labelPieChart}
      >
        {/* @ts-ignore */}
        {piedata.map((entry, index) => (
          // @ts-ignore
          <Cell key={`cell-${index}`} fill={gradientColor(entry.count)} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
    </PieChart>
  );
};

export default PieChartComp;

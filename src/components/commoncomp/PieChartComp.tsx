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
  gradient_start: number[];
}

const PieChartComp: React.FC<PieChartCompProps> = ({
  data,
  width_,
  height_,
  params,
  params_include,
  gradient_start,
}) => {
  const [activeTooltip, setActiveTooltip] = useState(false);
  const [activeIndex, setActiveIndex] = useState(undefined);
  const [piedata, setpieData] = useState([]);
  const piechartfor = useSelector((state: RootState) => state.auth.piechartfor);

  console.log(data, "data");
  let total = 0;
  if (piechartfor === "facility") {
    total = 299;
  }
  if (piechartfor === "refinery") {
    total = 1034;
  }
  if (piechartfor === "mill") {
    total = 2381;
  }

  useEffect(() => {
    if (!params_include) {
      axios
        .get(
          `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
            data.distinct
          }/`
        )
        .then((res) => {
          res.data.sort((a, b) => b.percentage - a.percentage);
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
          res.data.sort((a, b) => b.percentage - a.percentage);
          setpieData(res.data);
        });
    }

    return () => {
      setpieData([]);
      setActiveIndex(undefined);
      setActiveTooltip(false);
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
    return `hsl(${gradient_start[0]}, ${gradient_start[1]}%, ${lightness}%)`;
  };

  const onPieEnter = (_, index) => {
    setActiveTooltip(false);
    setActiveIndex(index);
    setActiveTooltip(true);
  };

  const onPieExit = () => {
    setActiveIndex(undefined);
    setActiveTooltip(false);
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
          {total}
        </text>
      </g>
    );
  };
  return (
    <>
      <PieChart
        onMouseLeave={onPieExit}
        onMouseOut={onPieExit}
        width={width_}
        height={height_}
        cursor="pointer"
      >
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
          onMouseLeave={onPieExit}
          onMouseDown={onPieExit}
          onMouseOut={onPieExit}
          onMouseMove={onPieEnter}
          onMouseDownCapture={onPieExit}
          onMouseMoveCapture={onPieExit}
          labelLine={false}
          label={labelPieChart}
        >
          {/* @ts-ignore */}
          {piedata.map((entry, index) => (
            // @ts-ignore
            <Cell key={`cell-${index}`} fill={gradientColor(entry.count)} />
          ))}
        </Pie>
        <Tooltip
          content={
            <CustomTooltip
              display={activeTooltip}
              active={activeTooltip}
              payload={[]}
            />
          }
        />
      </PieChart>

      <div
        style={{ height: "0.7px" }}
        className="bg-boxDivider hidden md:flex  w-full"
      ></div>
      <div className=" hidden md:flex w-full max-h-full">
        {piedata.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center ${"border-r-[0.7px] border-boxDivider mx-auto"}`}
          >
            <p
              style={{ color: gradientColor(item.count) }}
              className=" text-[10px] md:text-[12px] font-normal lg:font-semibold "
            >
              {item.percentage.toFixed(2)}
            </p>
            <p className=" text-[7px] m-3 ">
              {item.display === "0" ? "Others" : item.display}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PieChartComp;

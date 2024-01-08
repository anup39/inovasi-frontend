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
}) => {
  const [activeTooltip, setActiveTooltip] = useState(false);
  const [activeIndex, setActiveIndex] = useState(undefined);
  const [piedata, setpieData] = useState([]);
  const piechartfor = useSelector((state: RootState) => state.auth.piechartfor);

  const selectedDashboardPage = useSelector(
    (state) => state.displaySettings.selectedDashboardPage
  );
  const current_mill_eq_id = useSelector(
    (state) => state.displaySettings.current_mill_eq_id
  );
  const current_radius_wkt = useSelector(
    (state) => state.displaySettings.current_radius_wkt
  );

  useEffect(() => {
    if (!params_include) {
      axios
        .get(
          `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
            data.distinct
          }/`
        )
        .then((res) => {
          // @ts-ignore
          res.data.sort((a, b) => b.percentage - a.percentage);
          setpieData(res.data);
        });
    } else {
      axios
        .get(
          `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
            data.distinct
          }/?plantation=${data.params.plantation}&status=${
            data.params.status
          }&mill_eq_id=${current_mill_eq_id}&geometry_wkt=${current_radius_wkt}`
        )
        .then((res) => {
          // @ts-ignore
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

  // @ts-ignore
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
    return `hsl(${data.gradient_start[0]}, ${data.gradient_start[1]}%, ${lightness}%)`;
  };

  // @ts-ignore
  const onPieEnter = (_, index) => {
    setActiveTooltip(false);
    setActiveIndex(index);
    setActiveTooltip(true);
  };

  const onPieExit = () => {
    setActiveIndex(undefined);
    setActiveTooltip(false);
  };

  // @ts-ignore

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
          {piedata[0].total}
        </text>
      </g>
    );
  };
  return (
    <div
      className={`flex flex-${
        selectedDashboardPage === "supplierplantation" ? "row" : "col"
      } items-center justify-center`}
    >
      <div className="scale-[0.45] md:scale-[0.55] lg:scale-[0.8] middle:scale-100">
        <PieChart
          onMouseLeave={onPieExit}
          // @ts-ignore
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
      </div>
      <div
        style={{
          display:
            selectedDashboardPage === "supplierplantation" ? "none" : "block",
        }}
        className="w-full xl:h-[45px] hidden middle:block"
      >
        <div className="bg-boxDivider h-[1px] "></div>
        <div className="flex w-full h-full">
          {piedata.slice(0, 3).map((item, index, array) => (
            <div
              key={index}
              className={`flex flex-col w-1/3 items-center justify-center text-center ${
                array.length > 1 && index < array.length - 1
                  ? "border-r-[0.7px] border-boxDivider"
                  : ""
              } mx-auto`}
            >
              <p
                //  @ts-ignore
                style={{ color: gradientColor(item.count) }}
                className="text-[8px]  lg:text-[8px] middle:text-[8px] mx-auto font-normal lg:font-semibold"
              >
                {/* @ts-ignore */}
                {item.percentage.toFixed(2)}
              </p>
              <p className="text-[9px] lg:text-[9px] middle:text-[9px] m-1">
                {/* @ts-ignore */}
                {item.display === "0" ? "Others" : item.display}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display:
            selectedDashboardPage === "supplierplantation" ? "block" : "none",
        }}
        className="flex scale-90 lg:scale-100 flex-col md:gap-[20px] middle:gap-[4px] xl:gap-[20px] "
      >
        {piedata.slice(0, 5).map((item, index) => (
          <div key={index} className="flex gap-4 justify-between">
            <div className="flex  gap-3 items-center">
              <div
                style={{
                  backgroundColor: gradientColor(item.count),
                  // opacity: item.opacity,
                }}
                className={`w-[10px] h-[10px] ]`}
              ></div>
              <h1 className="text-plantationListTitle">{item.display}</h1>
            </div>
            <div className="text-semiBlackText">{item.area} ha</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComp;

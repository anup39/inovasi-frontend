import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useSelector } from "react-redux";
import axios from "axios";
import colors from "../../utils/color";
import { RootState } from "../../store";
import generateGradient from "../../utils/generateGradient";

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

  const startColor = "#82ca9d";
  const endColor = "#6cd8b3";
  const steps = 100;

  const gradient = generateGradient(startColor, endColor, steps);
  console.log(gradient[99]); // To get the 100th color in the gradient

  return (
    <PieChart width={width_} height={height_}>
      <Pie
        isAnimationActive={true}
        dataKey="count"
        nameKey="display"
        data={piedata}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
      >
        {/* @ts-ignore */}
        {piedata.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={gradient[index % gradient.length]}
          />
        ))}
      </Pie>
      <Tooltip
        itemStyle={{ color: "white", cursor: "pointer" }}
        contentStyle={{
          backgroundColor: "#37525c",
          color: "#FFFFFF",
          cursor: "pointer",
        }}
      />
    </PieChart>
  );
};

export default PieChartComp;

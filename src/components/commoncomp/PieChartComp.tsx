import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useSelector } from "react-redux";
import axios from "axios";
// import colors from "../../utils/color";
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

  const startColor = "#ffffff";
  const endColor = "#12bd82";
  const steps = 5;

  const gradient = generateGradient(startColor, endColor, steps);
  console.log(gradient[99]); // To get the 100th color in the gradient

  console.log(piedata, "pie data");
  const hexToHSL = (hexColor) => {
    let r = parseInt(hexColor.substring(1, 3), 16) / 255;
    let g = parseInt(hexColor.substring(3, 5), 16) / 255;
    let b = parseInt(hexColor.substring(5, 7), 16) / 255;

    let cmax = Math.max(r, g, b);
    let cmin = Math.min(r, g, b);
    let delta = cmax - cmin;

    let h = 0;
    if (delta === 0) {
      h = 0;
    } else if (cmax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }

    let l = (cmax + cmin) / 2;
    let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, s, l };
  };

  const gradientColor = (count) => {
    const startColorHSL = hexToHSL("#FFFFFF");
    const minLightness = 80; // Lightness of the starting color
    const maxLightness = 40; // Lightness for the darkest shade of red
    const maxCount = Math.max(...piedata.map((item) => item.count));
    const lightness =
      minLightness - (count / maxCount) * (minLightness - maxLightness);
    return `hsl(159, 83%, ${lightness}%)`;
  };
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
          <Cell key={`cell-${index}`} fill={gradientColor(entry.count)} />
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

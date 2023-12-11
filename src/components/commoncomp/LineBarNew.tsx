import React, { useEffect, useState } from "react";
import { ComposedChart, Pie, Tooltip, Cell } from "recharts";
import { useSelector } from "react-redux";
import axios from "axios";
// import colors from "../../utils/color";
import { RootState } from "../../store";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  LabelList,
  Cell,
} from "recharts";

interface ComposedChartProps {
  data: { id: number; name: string; selected: boolean; distinct: string };
  params: { estateids: string[]; geometry_wkt: string };
  params_include: boolean;
  width_: number;
  height_: number;
}

const LineBarComp: React.FC<ComposedChartProps> = ({
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

  // console.log(gradient[99]); // To get the 100th color in the gradient

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
  return (
    <ComposedChart
      layout="vertical"
      width={600}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        bottom: 10,
        left: 10,
      }}
    >
      <CartesianGrid stroke="#eaeaea" strokeDasharray="3 3" />
      <XAxis
        type="number"
        width={500}
        className="w-100"
        tick={{ fontSize: 40 }}
      />
      <YAxis
        dataKey="name"
        type="category"
        width={250}
        tick={{ fontSize: 40 }}
      />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" barSize={70}>
        <LabelList dataKey="value" content={renderCustomizedLabel} />
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </ComposedChart>
  );
};

export default LineBarComp;

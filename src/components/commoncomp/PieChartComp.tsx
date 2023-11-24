import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useSelector } from "react-redux";
import axios from "axios";
import colors from "../../utils/color";
import { RootState } from "../../store";

interface PieChartCompProps {
  data: { id: number; name: string; selected: boolean; distinct: string };
  width_: number;
  height_: number;
}

const PieChartComp: React.FC<PieChartCompProps> = ({
  data,
  width_,
  height_,
}) => {
  const [piedata, setpieData] = useState([]);
  const piechartfor = useSelector((state: RootState) => state.auth.piechartfor);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_DASHBOARD_URL}/pie-chart/${piechartfor}/${
          data.distinct
        }/`
      )
      .then((res) => {
        setpieData(res.data);
      });
  }, [data.distinct, piechartfor]);

  return (
    <PieChart width={width_} height={height_}>
      <Pie
        isAnimationActive={true}
        dataKey="count"
        nameKey="display"
        data={piedata}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
      >
        {piedata.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComp;

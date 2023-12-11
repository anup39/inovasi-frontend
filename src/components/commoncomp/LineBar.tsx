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
const colors = ["#00C49F", "#FFBB28", "#FF8042"];
const data = [
  {
    name: "Actual registered supplier",
    value: 179,
  },
  {
    name: "Potential registered supplier",
    value: 161,
  },
  {
    name: "Potential unregistered supplier",
    value: 132,
  },
];

// @ts-ignore
const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;

  return (
    <g>
      <text
        x={x + width}
        y={y + height / 2}
        fill="#000"
        // textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default function LineBar() {
  return (
    <ComposedChart
      layout="vertical"
      width={1200}
      height={700}
      data={data}
      margin={{
        top: 10,
        right: 30,
        bottom: 10,
        left: 200,
      }}
    >
      <CartesianGrid stroke="#eaeaea" strokeDasharray="3 3" />
      <XAxis type="number" width={500} className="w-100" />
      <YAxis
        dataKey="name"
        type="category"
        width={400}
        tick={{ fontSize: 40 }}
      />
      <Tooltip />
      {/* <Bar dataKey="value" barSize={20} fill="#413ea0" /> */}
      {/* <Bar dataKey="value" fill="#8884d8" minPointSize={5}> */}
      <Bar dataKey="value" fill="#8884d8" barSize={70}>
        <LabelList dataKey="value" content={renderCustomizedLabel} />
        {/* @ts-ignore */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Bar>
    </ComposedChart>
  );
}

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
        style={{ fontSize: "40px" }}
      >
        {value}
      </text>
    </g>
  );
};

// @ts-ignore
export default function LineBar(props: any) {
  const { lowerBoxes } = props;
  const data = lowerBoxes.title.map((name: string, index: number) => ({
    name,
    value: parseFloat(lowerBoxes.numbers[index].replace("%", "")),
    fill: lowerBoxes.colors[index],
  }));
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
}

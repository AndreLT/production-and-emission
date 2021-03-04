import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Text, Heading, Divider } from "@chakra-ui/react";

const initial = [
  {
    name: "Industry",
    value: 29.4,
    color: "#2978A0",
    subCat: [
      { name: "Energy Use", value: 24.2 },
      { name: "Chemicals", value: 2.2 },
      { name: "Cement", value: 3 },
    ],
  },
  {
    name: "Agriculture & Land Use",
    value: 20.1,
    color: "#a0e65e",
    subCat: [
      { name: "Livestock & Manure", value: 5.8 },
      { name: "Agricultural Soils", value: 4.1 },
      { name: "Rice Cultivation", value: 1.3 },
      { name: "Crop Burning", value: 3.5 },
      { name: "Cropland", value: 1.4 },
      { name: "Grassland", value: 0.1 },
      { name: "Deforestation", value: 2.2 },
      { name: "Energy in Agriculture & Fishing", value: 1.7 },
    ],
  },
  { name: "Transport", value: 16.2, color: "#ffa600" },
  { name: "General Energy Comsumption", value: 17.5, color: "#00aeff" },
  { name: "Unallocated fuel Combustion", value: 7.8, color: "#ff424f" },
  { name: "Fugitive emission (energy)", value: 7.8, color: "#bf66ff" },
  { name: "Waste", value: 3.2, color: "#b5b5b5" },
];

const energy = [
  { name: "Industry", value: 33.1 },
  { name: "Transport", value: 22.1 },
  { name: "Buildings", value: 23.9 },
  { name: "Other", value: 20.9 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white bg-opacity-80 px-5 py-3">
        <p className="text-gray-600">{label}</p>
        <p className="intro">{`${payload[0].value}%`}</p>
        <p className="desc">{`${(51 * (payload[0].value / 100)).toFixed(
          2
        )} tons of emission/year`}</p>
      </div>
    );
  }

  return null;
};

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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${(51 * (value / 100)).toFixed(2)} billion tons/year`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function EmissionPie() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [data, setData] = useState(initial);
  return (
    <div className="w-5/6 m-auto pt-10 grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
      <div style={{ height: "60vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={900}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={120}
              outerRadius={150}
              fill={data === energy ? "#ff6e6e" : "#8884d8"}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onClick={(_, index) => setSelectedIndex(index)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <motion.div className="p-10 h-96 shadow-md">
        {selectedIndex !== null ? (
          <div className="w-full h-80">
            <p className="text-3xl border-b mb-5 text-center border-gray-300">
              {data[selectedIndex].name}
            </p>
            <ResponsiveContainer width="90%" height="90%">
              <BarChart
                width={500}
                height={300}
                data={data[selectedIndex].subCat}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <>
            <p className="text-3xl border-b text-center border-gray-300">
              World Green Gas Emission
            </p>
            <p className="pt-5 w-11/12 mx-auto text-gray-600">
              This is what the world emission looks divided by sector. To find
              out more details about each of them, just click.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

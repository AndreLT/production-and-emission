import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
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

import SpecificEmissionBar from "./SpecificEmissionBar";

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
      <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="grey">
        {`${payload.value}%`}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill="grey">
        {`${(51 * (payload.value / 100)).toFixed(2)} billion tons`}
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
    </g>
  );
};

function FadeInWhenVisible({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function EmissionPie() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barData, setBarData] = useState(null);
  const [data, setData] = useState(initial);

  return (
    <div className="w-5/6 m-auto pt-10 grid grid-flow-col md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1">
      <div style={{ height: "60vh", zIndex: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={700} height={900}>
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
              onClick={(_, index) => setBarData(data[index])}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <SpecificEmissionBar data={barData} />
    </div>
  );
}

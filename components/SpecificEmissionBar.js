import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

export default function SpecificEmissionBar({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white bg-opacity-80 px-5 py-3">
          <p className="text-gray-600">{label}</p>
          <p className="intro">{`${payload[0].value}%`}</p>
          <p className="desc">{`${(50 * (payload[0].value / 100)).toFixed(
            2
          )} billion tons of emission/year`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <motion.div
      className="p-10 h-96 m-auto w-full"
      transition={{ duration: 0.3 }}
    >
      {data !== null ? (
        <div className="w-full h-96">
          <p className="text-3xl border-b mb-5 text-center border-gray-300">
            {data.name}
          </p>
          <ResponsiveContainer width="90%" height="90%">
            <BarChart
              width={500}
              height={500}
              data={data.subCat}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="value" />
              <YAxis width={100} type="category" dataKey="name" inverval={0} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill={data.color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <>
          <p className="text-3xl border-b text-center border-gray-300">
            World Green Gas Emission
          </p>
          <p className="pt-5 w-11/12 mx-auto text-gray-600">
            This is what the world emission looks divided by sector. To find out
            more details about each of them, just click.
          </p>
        </>
      )}
    </motion.div>
  );
}

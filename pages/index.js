import Head from "next/head";
import React from "react";
import { motion } from "framer-motion";
import MapChart from "../components/MapChart";

export default function Home() {
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
  ];
  return (
    <div className="w-full">
      <div className="w-full border-b border-black border-opacity-30">
        <div className="w-1/2 m-auto py-3 text-center text-gray-600 text-xl font-bold">
          <text className="text-blue-800">Production </text> &
          <text className="text-green-600"> Emission</text>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-5/6 mx-auto my-10"
      >
        <MapChart />
      </motion.div>
    </div>
  );
}

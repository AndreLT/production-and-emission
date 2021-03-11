import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";

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

const emission = [
  { id: "Energy", label: "Energy Production", value: 73.2, color: "#ff424f" },
  {
    id: "Agriculture",
    label: "Agriculture",
    value: 18.4,
    color: "#72ff21",
  },
  { id: "Industry", label: "Industry", value: 5.2, color: "#ff8b26" },
  { id: "Waste", label: "Waste", value: 3.2, color: "#7d7d7d" },
];

export default function EmissionPie() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barData, setBarData] = useState(null);
  const [data, setData] = useState(emission);

  const toolTip = (data) => {
    return (
      <div className="w-25 bg-white px-5 py-3 rounded-sm">
        <p>Sector: {data.id}</p>
        <p>Emission: {(51 * (data.value / 100)).toFixed(2)} billion tons</p>
      </div>
    );
  };

  return (
    <div className="w-10/12 m-auto pt-10 grid grid-cols-2">
      <div style={{ width: "90%", height: "60vh" }}>
        <ResponsivePie
          data={emission}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ datum: "data.color" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabel="label"
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          valueFormat={(n) => `${n}%`}
          onClick={(n) => console.log(n.id)}
          tooltip={function (e) {
            var t = e.datum;
            return toolTip(t);
          }}
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>

      <SpecificEmissionBar data={barData} />
    </div>
  );
}

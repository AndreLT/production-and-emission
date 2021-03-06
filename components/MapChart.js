import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.007, 10174.7])
  .range(["#fff5f5", "#ff6e6e"]);

const MapChart = ({ year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/co2_world_last_30_years.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap
      height={400}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 110,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d[year]) : "#F5F4F6"}
                  style={{
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;

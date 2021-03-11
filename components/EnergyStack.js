import { ResponsiveStream } from "@nivo/stream";

const data = [
  {
    coal_consumption: 23986.182,
    gas_consumption: 16260.907,
    hydro_consumption: 5499.379,
    nuclear_consumption: 4135.897,
    oil_consumption: 33789.184,
    solar_consumption: 0.033,
    wind_consumption: 0.178,
  },
  {
    coal_consumption: 25894.997,
    gas_consumption: 19484.436,
    hydro_consumption: 5996.967,
    nuclear_consumption: 5556.843,
    oil_consumption: 37690.886,
    solar_consumption: 1.079,
    wind_consumption: 10.09,
  },
  {
    coal_consumption: 25954.363,
    gas_consumption: 21108.566,
    hydro_consumption: 6904.543,
    nuclear_consumption: 6451.105,
    oil_consumption: 39444.693,
    solar_consumption: 1.78,
    wind_consumption: 22.95,
  },
  {
    coal_consumption: 27417.313,
    gas_consumption: 23999.887,
    hydro_consumption: 7366.566,
    nuclear_consumption: 7169.17,
    oil_consumption: 42897.191,
    solar_consumption: 3.112,
    wind_consumption: 87.28,
  },
  {
    coal_consumption: 36170.786,
    gas_consumption: 27463.918,
    hydro_consumption: 7844.619,
    nuclear_consumption: 7447.91,
    oil_consumption: 46824.25,
    solar_consumption: 11.205,
    wind_consumption: 279.978,
  },
  {
    coal_consumption: 41997.234,
    gas_consumption: 31606.766,
    hydro_consumption: 8958.472,
    nuclear_consumption: 7218.503,
    oil_consumption: 48087.136,
    solar_consumption: 87.907,
    wind_consumption: 903.467,
  },
  {
    coal_consumption: 43844.173,
    gas_consumption: 34780.121,
    hydro_consumption: 9827.171,
    nuclear_consumption: 6516.074,
    oil_consumption: 50891.976,
    solar_consumption: 649.74,
    wind_consumption: 2103.669,
  },
  {
    coal_consumption: 43849.215,
    gas_consumption: 39292.468,
    hydro_consumption: 10455.127,
    nuclear_consumption: 6923.412,
    oil_consumption: 53619.925,
    solar_consumption: 1792.996,
    wind_consumption: 3540.051,
  },
];
const tickValues = [1985, 1990, 1995, 2000, 2005, 2010, 2015, 2019];
const MyResponsiveStream = () => (
  <div className="w-4/6 h-96 m-auto">
    <p className="font-serif mt-10 text-2xl text-center">
      Why so much emission from Energy Comsumption?
    </p>
    <p className="mt-5">
      The majority of our energy production comes from fossil fuels. This energy
      is then converted to electricity(for our homes, buildings and industries),
      it is also fuel(for our personal automobiles, transport trucks and ships
      and airplanes) and heating.
    </p>
    <ResponsiveStream
      data={data}
      keys={[
        "coal_consumption",
        "gas_consumption",
        "hydro_consumption",
        "nuclear_consumption",
        "oil_consumption",
        "solar_consumption",
        "wind_consumption",
      ]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisTop={null}
      axisRight={null}
      indexBy="coal_consumption"
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (d) => tickValues[d],
        legend: "",
        legendOffset: 36,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
      }}
      offsetType="diverging"
      colors={{ scheme: "nivo" }}
      fillOpacity={0.85}
      borderColor={{ theme: "background" }}
      dotSize={8}
      dotColor={{ from: "color" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000000",
              },
            },
          ],
        },
      ]}
    />
  </div>
);
export default MyResponsiveStream;

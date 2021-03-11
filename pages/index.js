import React from "react";
import WorldMap from "../components/WorldMap";
import Header from "../components/Header";
import FadeOnView from "../components/FadeOnView";
import EmissionPie from "../components/EmissionPie";
import EnergyStack from "../components/EnergyStack";

export default function Home() {
  return (
    <div className="w-full" style={{ backgroundColor: "#fbfff0" }}>
      <Header />
      <div
        className="w-full font-serif font-semibold text-center text-5xl"
        style={{ marginTop: "30vh", marginBottom: "30vh" }}
      >
        <p>World Production and Emission</p>
        <p className="mt-5">Giving Perspective</p>
      </div>
      <EmissionPie />
      <EnergyStack />
      <WorldMap />
    </div>
  );
}

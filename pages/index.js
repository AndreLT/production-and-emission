import Head from "next/head";
import React, { useState } from "react";
import { motion } from "framer-motion";
import WorldMap from "../components/WorldMap";
import EmissionPie from "../components/EmissionPie";
import Header from "../components/Header";
import FadeOnView from "../components/FadeOnView";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <div
        className="w-full text-center text-5xl"
        style={{ marginTop: "35vh", marginBottom: "35vh" }}
      >
        <p>World Production and Emission</p>
        <p className="mt-10">Giving Perspective</p>
      </div>
      <FadeOnView>
        <EmissionPie />
      </FadeOnView>
      <WorldMap />
    </div>
  );
}

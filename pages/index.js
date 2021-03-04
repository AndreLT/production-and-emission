import Head from "next/head";
import React, { useState } from "react";
import { motion } from "framer-motion";
import WorldMap from "../components/WorldMap";
import EmissionPie from "../components/EmissionPie";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <EmissionPie />
    </div>
  );
}

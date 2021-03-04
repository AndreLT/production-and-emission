import React, { useState } from "react";
import { motion } from "framer-motion";
import MapChart from "./MapChart";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function WorldMap() {
  const [year, setYear] = useState("2019");

  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
  ];

  const changeRange = (newValue) => {
    if (newValue > 2000) {
      setYear(newValue);
    }
  };
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-5/6 mx-auto my-10"
      >
        <MapChart year={year} />
        <NumberInput
          onChange={(val) => changeRange(val)}
          defaultValue={2019}
          min={2000}
          max={2019}
          keepWithinRange={true}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </motion.div>
    </div>
  );
}

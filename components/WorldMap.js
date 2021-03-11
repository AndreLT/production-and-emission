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

import FadeOnView from "./FadeOnView";

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
      <FadeOnView>
        <div className="w-5/6 mx-auto mt-48 my-10">
          <p className="text-center w-full text-3xl mb-5">
            World Green Gas Emission
          </p>
          <p className="mx-5 mb-10 text-center">
            This is how the worldwide emission of CO2 and equivalents looks
            like.
          </p>
          <NumberInput
            onChange={(val) => changeRange(val)}
            defaultValue={2019}
            min={2000}
            max={2019}
            keepWithinRange={true}
            className="w-2/12 m-auto"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <MapChart year={year} />
        </div>
      </FadeOnView>
    </div>
  );
}

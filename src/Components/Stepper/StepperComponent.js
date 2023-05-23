import React from "react";
import { Stepper } from "@progress/kendo-react-layout";
import "./StepperComponent.scss";

const StepperComponent = ({ step, width }) => {
  return (
    <Stepper
      value={step}
      items={items}
      style={{ width }}
      className="stepperComponent"
    />
  );
};

export default StepperComponent;

const items = [
  {
    label: "Select BP & Import Excel",
    icon: "",
  },
  {
    label: "Matching Table Header",
    icon: "",
  },
  {
    label: "Fixed Table Contents",
    icon: "",
  },
  {
    label: "Upload Data",
    icon: "",
  },
];

import React from "react";
import { BounceLoader } from "react-spinners";
import "./LoadingMask.css";

const LoadingMask = () => (
  <div className="LoadingMask">
    <BounceLoader color={"#00aeff"} />
  </div>
);

export default LoadingMask;

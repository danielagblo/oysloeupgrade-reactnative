import React from 'react';
import Svg, { Path } from 'react-native-svg';import { jsx as _jsx } from "react/jsx-runtime";

export const StarIcon = ({ color = "#374957", size = 15 }) =>
_jsx(Svg, { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children:
  _jsx(Path, {
    d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    fill: color }
  ) }
);
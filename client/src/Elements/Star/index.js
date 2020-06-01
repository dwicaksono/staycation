import React from "react";
import propTypes from "prop-types";

import "./index.scss";

export default function Star({ className, value, width, height, spacing }) {
  const decimals = Number(value) % 1;

  const star = [];
  let leftPos = 0;
  for (let index = 0; index < 5 && index < value - decimals; index++) {
    leftPos = leftPos + width;
    star.push(
      <div
        className="star"
        key={`star-${index}`}
        style={{
          left: index * width,
          height: height,
          width: width,
          marginRight: spacing,
        }}
      ></div>
    );
  }
  if (decimals > 0 && value <= 5) {
    star.push(
      <div
        className="star"
        key={`starWithDecimals`}
        style={{
          left: leftPos,
          height: height,
          width: decimals * width - spacing,
        }}
      ></div>
    );
  }

  const starPlacholder = [];
  for (let i = 0; i < 5; i++) {
    starPlacholder.push(
      <div
        className="star placeholder"
        key={`starPlaceholder-${i}`}
        style={{
          left: i * width,
          width: width,
          height: height,
          marginRight: spacing,
        }}
      ></div>
    );
  }

  return (
    <>
      <div
        className={[`stars`, className].join(" ")}
        style={{ height: height }}
      >
        {starPlacholder}
        {star}
      </div>
    </>
  );
}

Star.prototype = {
  className: propTypes.string,
  value: propTypes.number,
  width: propTypes.number,
  height: propTypes.number,
  spacing: propTypes.number,
};

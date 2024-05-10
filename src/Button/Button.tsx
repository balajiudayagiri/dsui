import React from "react";
import * as stylex from "@stylexjs/stylex";

// Define the styles using StyleX
const styles = stylex.create({
  button: {
    backgroundColor: "blue", // Sets the background color of the button
    color: "white", // Sets the text color of the button
    padding: "10px 20px", // Sets the padding around the text
    border: "none", // Removes the border
    borderRadius: "5px", // Rounds the corners of the button
    cursor: "pointer", // Changes the cursor on hover to indicate it's clickable
    ":hover": {
      backgroundColor: "darkblue", // Darkens the button on hover for visual feedback
    },
    ":focus": {
      outline: "none", // Removes the outline on focus for a clean look
      boxShadow: "0 0 3px 2px lightblue", // Adds a light blue glow when the button is focused
    },
    ":active": {
      backgroundColor: "navy", // Changes the background when the button is clicked
    },
  },
});

export const Button = () => {
  return <button {...stylex.props(styles.button)}>Button</button>;
};

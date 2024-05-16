import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  ScrollAnimationWrapper,
  ScrollAnimationWrapperProps,
} from "./ScrollAnimationWrapper";
import "./ScrollAnimationWrapper.css"; // Ensure you have the appropriate CSS

export default {
  title: "Components/ScrollAnimationWrapper",
  component: ScrollAnimationWrapper,
  tags: ["autodocs"],
  argTypes: {
    element: {
      control: {
        type: "select",
        options: ["div", "section", "article", "span"],
      },
    },
    className: { control: "text" },
  },
} as Meta;

const animations = [
  "fadeIn",
  "fadeInUp",
  "fadeInDown",
  "fadeInLeft",
  "fadeInRight",
  "scaleUp",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
  "rotateIn",
];

const AllAnimationsTemplate: StoryFn<ScrollAnimationWrapperProps> = (args) => (
  <div>
    {animations.map((animation) => (
      <ScrollAnimationWrapper
        key={animation}
        {...args}
        animationClass={animation}>
        <div
          className="content"
          style={{
            height: "200px",
            backgroundColor: "lightgray",
            marginBottom: "20px",
          }}>
          {animation}
        </div>
      </ScrollAnimationWrapper>
    ))}
  </div>
);

export const AllAnimations = AllAnimationsTemplate.bind({});
AllAnimations.args = {
  element: "div",
  className: "",
};

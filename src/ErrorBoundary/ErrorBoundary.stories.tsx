// ErrorBoundary.stories.tsx

import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ErrorBoundary } from "./ErrorBoundary"; // Adjust the import path as needed

interface CustomFallbackProps {
  resetError: () => void;
}

const CustomFallback: React.FC<CustomFallbackProps> = ({ resetError }) => {
  return (
    <div
      style={{
        border: "2.5px solid",
        padding: 10,
        borderRadius: "6px",
      }}>
      <h2>Custom Error Occurred!</h2>
      <button onClick={resetError}>Try again?</button>
    </div>
  );
};

const ErrorComponent = () => {
  throw new Error("An intentional error!");
};

const SafeComponent = () => <div>No error here!</div>;

export default {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<typeof ErrorBoundary> = (args) => {
  const [triggerError, setTriggerError] = useState(false);

  return (
    <div
      style={{
        border: "1px solid ",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}>
      <button onClick={() => setTriggerError(!triggerError)} style={{}}>
        Toggle Error box
      </button>
      <ErrorBoundary {...args}>
        {triggerError ? <ErrorComponent /> : <SafeComponent />}
      </ErrorBoundary>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  fallbackText: "Something went wrong!",
};

export const WithCustomFallback = Template.bind({});
WithCustomFallback.args = {
  fallbackComponent: (
    <CustomFallback
      resetError={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
};

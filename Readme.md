# EmpyreanUi

## Installation

To use the `EmpyreanUi` u need to install

```bash
npm install @empyreanui/core
```

# CodeEditor Component

The `CodeEditor` component provides a code editor interface with support for multiple files, folder structure, and themes. It leverages the Monaco Editor for a rich coding experience and can be easily integrated into your React applications.

## Features

- Supports multiple files with a folder structure view.
- Customizable themes (default is `vs-dark`).
- Customizable editor options.
- Callback functions for various editor events.
- Responsive design with customizable dimensions.


## Usage

Here is an example of how to use the `CodeEditor` component in a React application:

```tsx
import React from "react";
import { CodeEditor } from "@empyreanui/core";

const data = {
  "src/index.js":
    "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n    <React.StrictMode>\n        <App />\n    </React.StrictMode>\n);",
  "src/index.css": `body { margin: 0; font-family: Arial, sans-serif; }`,
};

const MyApp = () => (
  <CodeEditor
    data={data}
    options={{ readOnly: false }}
    theme="vs-dark"
    width="100%"
    height="600px"
    onChange={(newValue) => console.log("Content changed:", newValue)}
  />
);

export default MyApp;
```

## Props

The `CodeEditor` component accepts the following props:

| Prop               | Type                 | Description                                                                          |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------ |
| `data`             | `Object` \| `string` | The file data, either as a string for a single file or an object for multiple files. |
| `options`          | `Object`             | Options for the Monaco Editor.                                                       |
| `defaultValue`     | `string`             | Default value for the editor.                                                        |
| `defaultLanguage`  | `string`             | Default language for the editor.                                                     |
| `defaultPath`      | `string`             | Default path for the editor.                                                         |
| `path`             | `string`             | Current path for the editor.                                                         |
| `theme`            | `string`             | Theme for the editor. Default is `vs-dark`.                                          |
| `line`             | `number`             | Line number to focus on.                                                             |
| `loading`          | `string`             | Loading message or component.                                                        |
| `overrideServices` | `Object`             | Override services for the editor.                                                    |
| `saveViewState`    | `boolean`            | Whether to save the view state of the editor.                                        |
| `keepCurrentModel` | `boolean`            | Whether to keep the current model in the editor.                                     |
| `width`            | `string`             | Width of the editor.                                                                 |
| `height`           | `string`             | Height of the editor.                                                                |
| `className`        | `string`             | Additional class name for the editor.                                                |
| `wrapperProps`     | `Object`             | Additional props for the wrapper element.                                            |
| `beforeMount`      | `Function`           | Function to execute before the editor mounts.                                        |
| `onMount`          | `Function`           | Function to execute when the editor mounts.                                          |
| `onChange`         | `Function`           | Function to execute when the editor content changes.                                 |
| `onValidate`       | `Function`           | Function to execute when the editor content is validated.                            |

## Example

```tsx
import React from "react";
import { CodeEditor } from "@empyreanui/core";

const data = {
  "src/index.js":
    "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n    <React.StrictMode>\n        <App />\n    </React.StrictMode>\n);",
  "src/index.css": `body { margin: 0; font-family: Arial, sans-serif; }`,
};

const MyApp = () => (
  <CodeEditor
    data={data}
    options={{ readOnly: false }}
    theme="vs-dark"
    width="100%"
    height="600px"
    onChange={(newValue) => console.log("Content changed:", newValue)}
  />
);

export default MyApp;
```

# ErrorBoundary Component

A component that acts as an error boundary to catch JavaScript errors in its child component tree,
log those errors, and provide a fallback UI.

## Props

### `ErrorBoundaryProps`

- **children**: `ReactNode` - The children components that will be wrapped by the error boundary.
- **fallbackText**: `string` (optional) - The text to display in the fallback UI.
- **className**: `string` (optional) - Optional className for the wrapper div.
- **style**: `CSSProperties` (optional) - Optional inline styles for the wrapper div.
- **fallbackComponent**: `ReactNode` (optional) - Optional custom fallback component to render when an error is caught.
- **onError**: `(error: Error) => void` (optional) - Optional callback function to handle the error.

## State

### `ErrorBoundaryState`

- **hasError**: `boolean` - Indicates whether an error has been caught or not.
- **error**: `Error | null` - The error that was caught, if any.

## Example Usage

```tsx
import { ErrorBoundary } from "@empyreanui/core";

const App = () => {
  return (
    <ErrorBoundary fallbackText="Something went wrong!">
      <YourComponent />
    </ErrorBoundary>
  );
};

export default App;
```

## Methods

### `constructor(props: ErrorBoundaryProps)`

Constructs the ErrorBoundary component.

### `static getDerivedStateFromError(error: Error): ErrorBoundaryState`

A lifecycle method invoked after an error is thrown in a child component. It updates the state to trigger a fallback UI.

### `componentDidCatch(error: Error, info: React.ErrorInfo): void`

A lifecycle method invoked after an error has been captured. It can be used for additional error logging or reporting services.

### `resetError = () => void`

Function to reset the error state.

### `render(): ReactNode`

Renders the children components if there's no error, otherwise displays fallback UI.

# ScrollAnimationWrapper

A React component that applies a CSS animation class to its children when they scroll into view. This component uses the Intersection Observer API to detect when it is visible on the screen and triggers the animation.

## Usage

Here's how you can use `ScrollAnimationWrapper` in your project:

```tsx
import React from "react";
import { ScrollAnimationWrapper } from "@empyreanui/core";

const App = () => (
  <ScrollAnimationWrapper animationClass="fadeInUp" element="section">
    <div className="content">This will fade in up when scrolled into view.</div>
  </ScrollAnimationWrapper>
);

export default App;
```

## Props

`ScrollAnimationWrapper` accepts the following props:

- `children` **(ReactNode)**: The elements to be rendered inside the wrapper.
- `animationClass` **(string)**: CSS class that defines the animation to apply when the element comes into view. This class should be defined in your CSS with keyframe animations. Options include:
  - "fadeIn"
  - "fadeInUp"
  - "fadeInDown"
  - "fadeInLeft"
  - "fadeInRight"
  - "scaleUp"
  - "slideUp"
  - "slideDown"
  - "slideLeft"
  - "slideRight"
  - "rotateIn"
  - _Any other custom animation class_
- `element` **(ElementType)**: The HTML element type to render as the component root node. Defaults to "div".
- `className` **(string)**: Additional class names to be applied to the element.

## Example

```tsx
<ScrollAnimationWrapper animationClass="fadeInUp" element="section">
  <div className="content">This will fade in up when scrolled into view.</div>
</ScrollAnimationWrapper>
```

# Hooks

# usePersistentState Hook

`usePersistentState` is a custom React hook that manages state and persists it to `localStorage`. This hook can be particularly useful for maintaining state across page reloads.

## Installation

You can add this hook to your project by copying the code below and pasting it into your project files.

## Usage

### Import

```javascript
import { usePersistentState } from "@empyreanui/core";
```

### Example

#### Basic Example

```javascript
import React from "react";
import { usePersistentState } from "@empyreanui/core";

function Counter() {
  const [count, setCount] = usePersistentState("count", 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

#### Complex Example

```javascript
import React from "react";
import { usePersistentState } from "@empyreanui/core";

function UserProfile() {
  const [user, setUser] = usePersistentState("user", { name: "John Doe" });

  return (
    <div>
      <p>Name: {user.name}</p>
      <button onClick={() => setUser({ name: "Jane Doe" })}>Change Name</button>
    </div>
  );
}

export default UserProfile;
```

### `usePersistentState`

```typescript
function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>];
```

#### Parameters

- `key` (`string`): The key under which the state is stored in `localStorage`.
- `initialValue` (`T`): The initial value of the state.

#### Returns

- `[T, Dispatch<SetStateAction<T>>]`: Returns the current state and a function to update it.

## Example

```typescript
const [count, setCount] = usePersistentState("count", 0);
const [user, setUser] = usePersistentState("user", { name: "John Doe" });
```


# useScrolled Hook

A custom React hook that tracks the scroll position of an HTMLElement and checks if it has scrolled beyond a specified limit.

## Installation

To use this hook, simply import it into your project:

```sh
npm install your-library-name
```

## Usage

Here is an example of how to use the `useScrolled` hook in a functional React component:

```tsx
import React, { useRef } from 'react';
import { useScrolled } from '@empyreanui/core';

const ScrollComponent: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollPosition, isScrolled } = useScrolled(scrollRef, 100);

  return (
    <div ref={scrollRef} style={{ height: '200px', overflow: 'auto' }}>
      <div style={{ height: '500px' }}>
        Scroll down to see more content and check the scroll position!
      </div>
      <p>Scroll Position: {scrollPosition}px</p>
      {isScrolled && <p>You have scrolled more than 100 pixels!</p>}
    </div>
  );
}

export default ScrollComponent;
```

## Parameters

- `ref` (RefObject<HTMLElement>): A React ref object pointing to the target element to monitor for scroll events.
- `limit` (number): The pixel threshold after which `isScrolled` should return `true`.

## Returns

An object containing the following properties:
- `scrollPosition` (number): The current scroll position of the element.
- `isScrolled` (boolean): A boolean indicating whether the scroll position has exceeded the specified limit.

## Example

```tsx
import React, { useRef } from 'react';
import { useScrolled } from '@empyreanui/core';

const ScrollComponent: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollPosition, isScrolled } = useScrolled(scrollRef, 100);

  return (
    <div ref={scrollRef} style={{ height: '200px', overflow: 'auto' }}>
      <div style={{ height: '500px' }}>
        Scroll down to see more content and check the scroll position!
      </div>
      <p>Scroll Position: {scrollPosition}px</p>
      {isScrolled && <p>You have scrolled more than 100 pixels!</p>}
    </div>
  );
}

export default ScrollComponent;
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

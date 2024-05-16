import React from "react";
import { CodeEditor } from "./CodeEditor";

const data = {
  "package.json":
    '{\n  "name": "example_app",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-scripts": "5.0.0",\n    "@mui/material": "^5.13.2",\n    "react-router-dom": "^6.2.1"\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test",\n    "eject": "react-scripts eject"\n  }\n}',
  "public/index.html":
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Example App</title>\n</head>\n<body>\n    <div id="root"></div>\n</body>\n</html>',
  "src/index.js":
    "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n    <React.StrictMode>\n        <App />\n    </React.StrictMode>\n);",
  "src/App.js":
    "import React from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport HomePage from './HomePage';\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path=\"/\" element={<HomePage />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;",
  "src/HomePage.js":
    "import React from 'react';\n\nexport default function HomePage() {\n  return <div>Welcome to the Example App!</div>;\n}",
  "src/index.css": "body { margin: 0; font-family: Arial, sans-serif; }",
  "package1.json":
    '{\n  "name": "example_app",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-scripts": "5.0.0",\n    "@mui/material": "^5.13.2",\n    "react-router-dom": "^6.2.1"\n  },\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test",\n    "eject": "react-scripts eject"\n  }\n}',
  "public/index1.html":
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Example App</title>\n</head>\n<body>\n    <div id="root"></div>\n</body>\n</html>',
  "src/index1.js":
    "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n    <React.StrictMode>\n        <App />\n    </React.StrictMode>\n);",
  "src/App1.js":
    "import React from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport HomePage from './HomePage';\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path=\"/\" element={<HomePage />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;",
  "src/HomePage1.js":
    "import React from 'react';\n\nexport default function HomePage() {\n  return <div>Welcome to the Example App!</div>;\n}",
  "src/index1.css": "body { margin: 0; font-family: Arial, sans-serif; }",
};

export default {
  title: "Components/CodeEditor",
  component: CodeEditor,
  tags: ["autodocs"],
  argTypes: {
    language: { control: "text" },
    theme: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
};

const Template = (args: any) => (
  <div style={{ height: "500px" }}>
    <CodeEditor {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  language: "javascript",
  theme: "vs-dark",
  data,
};

export const LightTheme = Template.bind({});
LightTheme.args = {
  language: "javascript",
  theme: "light",
  data,
};

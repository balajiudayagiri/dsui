import React, { FC, useEffect, useState } from "react";
import { CodeEditorTypes } from "./CodeEditorTypes.types";
import { FolderStructure } from "./FolderStructure";
import buildHierarchy, { getFileExtension, getFileName } from "./utilities";
import addLogoToExtension from "./addlogo";
import { Editor } from "@monaco-editor/react";
import "./index.css";

/**
 * CodeEditor component that provides a code editor interface with support for multiple files, folder structure, and themes.
 *
 * @param {Object} props - The props for the CodeEditor component.
 * @param {Object|string} props.data - The file data, either as a string for a single file or an object for multiple files.
 * @param {Object} props.options - Options for the Monaco Editor.
 * @param {string} props.defaultValue - Default value for the editor.
 * @param {string} props.defaultLanguage - Default language for the editor.
 * @param {string} props.defaultPath - Default path for the editor.
 * @param {string} props.path - Current path for the editor.
 * @param {string} [props.theme='vs-dark'] - Theme for the editor. Default is 'vs-dark'.
 * @param {number} props.line - Line number to focus on.
 * @param {string} props.loading - Loading message or component.
 * @param {Object} props.overrideServices - Override services for the editor.
 * @param {boolean} props.saveViewState - Whether to save the view state of the editor.
 * @param {boolean} props.keepCurrentModel - Whether to keep the current model in the editor.
 * @param {string} props.width - Width of the editor.
 * @param {string} props.height - Height of the editor.
 * @param {string} props.className - Additional class name for the editor.
 * @param {Object} props.wrapperProps - Additional props for the wrapper element.
 * @param {Function} props.beforeMount - Function to execute before the editor mounts.
 * @param {Function} props.onMount - Function to execute when the editor mounts.
 * @param {Function} props.onChange - Function to execute when the editor content changes.
 * @param {Function} props.onValidate - Function to execute when the editor content is validated.
 *
 * @returns {JSX.Element} The CodeEditor component.
 *
 * ## Example usage of the CodeEditor component
 *
 * ```tsx
 * import React from 'react';
 * import { CodeEditor } from './CodeEditor';
 *
 * const data = {
 *      "src/index.js": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n    <React.StrictMode>\n        <App />\n    </React.StrictMode>\n);",
 *      "src/index.css": `body { margin: 0; font-family: Arial, sans-serif; }`,
 * };
 *
 * const MyApp = () => (
 *   <CodeEditor
 *     data={data}
 *     options={{ readOnly: false }}
 *     theme="vs-dark"
 *     width="100%"
 *     height="600px"
 *     onChange={(newValue) => console.log('Content changed:', newValue)}
 *   />
 * );
 *
 * export default MyApp;
 * ```
 */

export const CodeEditor: FC<CodeEditorTypes> = ({
  data,
  options,
  defaultValue,
  defaultLanguage,
  defaultPath,
  path,
  theme = "vs-dark",
  line,
  loading,
  overrideServices,
  saveViewState,
  keepCurrentModel,
  width,
  height,
  className,
  wrapperProps,
  beforeMount,
  onMount,
  onChange,
  onValidate,
}) => {
  const [activeTab, setActiveTab] = useState(
    typeof data === "object" && data ? Object.keys(data)[0] : ""
  );

  useEffect(() => {
    if (typeof data === "object" && data) {
      setActiveTab(Object.keys(data)[0]);
    }
  }, [data]);

  const handleTabClick = (tabName: string) => {
    console.log({ tabName });
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (typeof data === "object" && data) {
      const defaultFile = "src/index.js";
      const initialActiveTab = Object.prototype.hasOwnProperty.call(
        data,
        defaultFile
      )
        ? defaultFile
        : Object.keys(data)[0];
      setActiveTab(initialActiveTab);
    }
  }, [data]);

  if (!data) {
    return <div>No files to display.</div>;
  }

  const isSingleFile = typeof data === "string";

  return (
    <div className="root" data-theme={theme}>
      <div className="folder-structure-root" data-theme={theme}>
        <FolderStructure
          data-theme={theme}
          activeTab={activeTab}
          data={buildHierarchy(data)}
          onFileItemClick={(fileName) => handleTabClick(fileName)}
        />
      </div>
      <div className="editor-root">
        {!isSingleFile && (
          <div
            aria-label="tabs-container"
            className="tab-container"
            data-theme={theme}>
            {Object.keys(data).map((fileName) => (
              <button
                key={fileName}
                data-theme={theme}
                className={`tab-btn ${activeTab === fileName && "tab-btn-active"}`}
                onClick={() => handleTabClick(fileName)}>
                {addLogoToExtension(getFileName(fileName))}
              </button>
            ))}
          </div>
        )}
        <div aria-label="code-display" className="editor-wrapper">
          <Editor
            height="inherit"
            language={getFileExtension(activeTab)}
            value={`${isSingleFile ? data : data && activeTab ? data[activeTab] : null}`}
            options={options}
            defaultValue={defaultValue}
            defaultLanguage={defaultLanguage}
            defaultPath={defaultPath}
            path={path}
            theme={theme}
            line={line}
            loading={loading}
            overrideServices={overrideServices}
            saveViewState={saveViewState}
            keepCurrentModel={keepCurrentModel}
            width={width}
            className={className}
            wrapperProps={wrapperProps}
            beforeMount={beforeMount}
            onMount={onMount}
            onChange={onChange}
            onValidate={onValidate}
          />
        </div>
      </div>
    </div>
  );
};

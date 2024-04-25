import React, { FC, useEffect, useState } from "react";
import { CodeEditorTypes } from "./CodeEditorTypes.types";
import { FolderStructure } from "./FolderStructure";
import buildHierarchy, { getFileExtension, getFileName } from "./utilities";
import addLogoToExtension from "./addlogo";
import { Editor } from "@monaco-editor/react";
import "./index.css";

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
    <div className="root">
      <div className="folder-structure-root">
        <FolderStructure
          activeTab={activeTab}
          data={buildHierarchy(data)}
          onFileItemClick={(fileName) => handleTabClick(fileName)}
        />
      </div>
      <div className="editor-root">
        {!isSingleFile && (
          <div aria-label="tabs-container" className="tab-container">
            {Object.keys(data).map((fileName) => (
              <button
                key={fileName}
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

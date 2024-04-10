import React, { FC, useEffect, useState } from "react";
import { CodeEditorTypes } from "./CodeEditorTypes.types";
import { FolderStructure } from "./FolderStructure";
import buildHierarchy, { getFileExtension, getFileName } from "./utilities";
import addLogoToExtension from "./addlogo";
import { Editor } from "@monaco-editor/react";
import "./index.css";
export const CodeEditor: FC<CodeEditorTypes> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(
    typeof data === "object" && data ? Object.keys(data)[0] : ""
  );

  // Update useEffect accordingly, checking for object type
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
      // Check if 'src/index.js' exists in the data object
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

  // Determine if we're dealing with a single file or multiple
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
          // eslint-disable-next-line tailwindcss/no-custom-classname
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
          // activeTab === fileName ? "bg-[inherit] " : "bg-[#4b556375]"
        )}
        <div aria-label="code-display" className="editor-wrapper">
          {/* <CodePreview
            code={`${isSingleFile ? data : data && activeTab ? data[activeTab] : null}`}
            language={getFileExtension(activeTab)!}
          /> */}
          <Editor
            height="90vh"
            theme="vs-dark"
            language={getFileExtension(activeTab)}
            value={`${isSingleFile ? data : data && activeTab ? data[activeTab] : null}`}
          />
        </div>
      </div>
    </div>
  );
};

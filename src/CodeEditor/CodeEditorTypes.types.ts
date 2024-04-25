import { EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export interface CodeEditorTypes extends EditorProps {
  data?: Record<string, string>;
  options?: editor.IStandaloneEditorConstructionOptions;
}

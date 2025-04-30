"use client";

import React from "react";
import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";

import { EditMenu } from "./components/editMenu";

import "./main.css";

export interface TextEditorProps {
  editor: Editor | null;
  className?: string;
}
export const TextEditor = ({ editor, className }: TextEditorProps) => {
  if (editor == null) return;

  const MemoizedEditorContent = React.memo(() => (
    <EditorContent editor={editor} className="h-full" />
  ));
  return (
    <div className={`min-h-screen w-full bg-muted ${className}`}>
      <EditMenu editor={editor} />
      <MemoizedEditorContent />
    </div>
  );
};

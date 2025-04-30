"use client";

import React from "react";
import { EditorContent as EditorContainer } from "@tiptap/react";
import { Editor } from "@tiptap/core";

import "./style.css";

export interface EditorContentProps {
  editor: Editor | null;
  className?: string;
}
export const EditorContent = ({ editor, className }: EditorContentProps) => {
  if (editor == null) return;

  return (
    <div className={`h-full w-full bg-muted ${className}`}>
      <EditorContainer editor={editor} className={` ${className}`} />;
    </div>
  );
};

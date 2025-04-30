import { Command, Extension, RawCommands } from "@tiptap/core";

declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Commands<ReturnType = any> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
    };
  }
}
/**
 * This extension allows you to edit the fontSize.
 */
export const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands(): Partial<RawCommands> {
    return {
      setFontSize:
        (fontSize: string): Command =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
    };
  },
});

export const tiptapUISource = () => {
  return "../node_modules/tiptap-ui/dist/**/*.{js,jsx,ts,tsx}";
};

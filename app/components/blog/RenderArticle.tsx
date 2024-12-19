import { JSONContent } from "novel";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { Heading } from "@tiptap/extension-heading";
import { ListItem } from "@tiptap/extension-list-item";
import { BulletList } from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import { Blockquote } from "@tiptap/extension-blockquote";
import { TextStyle } from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Highlight } from "@tiptap/extension-highlight";
import { Bold } from "@tiptap/extension-bold";
import { HardBreak } from "@tiptap/extension-hard-break";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Strike } from "@tiptap/extension-strike";
import { Italic } from "@tiptap/extension-italic";
import { History } from "@tiptap/extension-history";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
// import { FontType } from "@tiptap/extension-font-type";
// import { FontSize } from "@tiptap/extension-font-size";
// import { TextColor } from "@tiptap/extension-text-color";

export function RenderArticle({ json }: { json: JSONContent }) {
  const outPut = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      Code,
      Blockquote,
      TextStyle,
      CodeBlock,
      Image,
      OrderedList,
      Highlight,
      Bold,
      HardBreak,
      HorizontalRule,
      Strike,
      Italic,
      History,
      Placeholder,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TextAlign,
      // FontType,
      // FontSize,
      // TextColor,
    ]);
  }, [json]);
  return (
    <div
      className="prose m-auto w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-zinc-600"
      dangerouslySetInnerHTML={{ __html: outPut }}
    />
  );
}

import type { ReactNode } from "react";

interface TextSegment {
  bold: boolean;
  value: string;
}

export function parseBoldText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const opening = text.indexOf("**", cursor);
    if (opening === -1) {
      segments.push({ bold: false, value: text.slice(cursor) });
      break;
    }

    const closing = text.indexOf("**", opening + 2);
    if (closing === -1 || closing === opening + 2) {
      segments.push({ bold: false, value: text.slice(cursor, opening + 2) });
      cursor = opening + 2;
      continue;
    }

    if (opening > cursor) segments.push({ bold: false, value: text.slice(cursor, opening) });
    segments.push({ bold: true, value: text.slice(opening + 2, closing) });
    cursor = closing + 2;
  }

  return segments;
}

export function formatBoldText(text: string): ReactNode[] {
  return parseBoldText(text).map((segment, index) => segment.bold
    ? <strong key={index}>{segment.value}</strong>
    : <span key={index}>{segment.value}</span>);
}

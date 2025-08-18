import { type CSSProperties, useMemo } from "react";

import DOMPurify from "isomorphic-dompurify";

interface HtmlRendererProps {
  html?: string | null;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export const HtmlRenderer = ({
  html = "",
  className,
  style,
  onClick,
}: HtmlRendererProps) => {
  const code = useMemo(() => html ?? "", [html]);

  return (
    <div
      {...(className && { className })}
      {...(style && { style })}
      {...(onClick && { onClick })}
      dangerouslySetInnerHTML={{
        __html:
          DOMPurify?.sanitize(code, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: [
              "target",
              "allowfullscreen",
              "allowtransparency",
              "speed",
              "playMode",
              "direction",
            ],
          }) ?? "",
      }}
    />
  );
};

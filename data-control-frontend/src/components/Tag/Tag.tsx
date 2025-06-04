import React from "react";

import "./Tag.css";

interface TagProps {
  text: string;
  classNamediv?: string;
  classNamespan?: string;
}

export const Tag: React.FC<TagProps> = (props) => {
  return (
    <div className={`tag_div ${props.classNamediv}`}>
      <span className={`tag_span ${props.classNamespan}`}>{props.text}</span>
    </div>
  );
};

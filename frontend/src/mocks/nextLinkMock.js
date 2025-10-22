import React from "react";
export default function NextLinkMock({ children, ...props }) {
  return <a {...props}>{children}</a>;
}

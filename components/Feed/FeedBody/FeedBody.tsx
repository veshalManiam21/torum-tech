import { Link } from "@/components/Link/Link";
import React from "react";

export type FeedBodyProps = {
  body: string;
};

export const FeedBody: React.FC<FeedBodyProps> = ({ body }) => {
  return <div className="text-sm font-normal">{body}</div>;
};

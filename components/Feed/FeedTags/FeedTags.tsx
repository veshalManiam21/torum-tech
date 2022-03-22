import { Link } from "@/components/Link/Link";
import React from "react";

export type FeedTagsProps = {
  tags: string[];
};

export const FeedTags: React.FC<FeedTagsProps> = ({ tags }) => {
  return tags && tags.length ? (
    <div className="text-xs text-gray-400 md:space-x-1 flex flex-wrap">
      {tags.map((tag, idx) => (
        <Link key={idx} className="hover:underline" href="#">{`#${tag}`}</Link>
      ))}
    </div>
  ) : null;
};

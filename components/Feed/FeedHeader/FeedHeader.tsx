import { ImageFallback } from "@/components/ImageFallback/ImageFallback";
import { Link } from "@/components/Link/Link";
import { ProfileCard } from "@/components/ProfileCard/ProfileCard";
import IconDelete from "@/assets/icon_delete.svg";

import React from "react";
import { FeedBody } from "../FeedBody/FeedBody";

export type FeedHeaderProps = {
  createdAt: string;
  title?: string;
  desc?: string;
  user: {
    image: string;
    name: string;
    isFollowing: boolean;
    bio: string | null;
  };
  body?: string;
};

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  title,
  createdAt,
  desc,
  user,
  body,
}) => {
  const profileCard = (
    <ProfileCard
      user={{
        bio: user.bio,
        isFollowing: user.isFollowing,
        name: user.name,
      }}
    />
  );

  const getNumberOfHours = (feedDate: Date) => {
    const currentDateTime = new Date();

    const differenceTime =
      (currentDateTime.getTime() - feedDate.getTime()) / (1000 * 3600 * 24);

    let finalPostedTime: number =
      differenceTime < 1
        ? currentDateTime.getTime() - feedDate.getTime() / (1000 * 3600)
        : differenceTime;

    return {
      duration: finalPostedTime.toFixed(0),
      unit: differenceTime < 1 ? "h" : "d",
    };
  };

  const postDate = getNumberOfHours(new Date(createdAt));

  return (
    <div
      className={`flex space-x-4 pb-2 border-b border-black-07080b ${
        body ? "" : ""
      }`}
    >
      <div className="relative group ">
        <div className="cursor:pointer">
          <ImageFallback image={user.image} width={40} height={40} />
          {profileCard}
        </div>
      </div>
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Link href="#" className="hover:underline group relative">
              {user.name}
              {profileCard}
            </Link>
            <div className="text-xxs text-gray-400">
              {`${postDate.duration}${postDate.unit}`}
            </div>
          </div>
          {title && desc ? (
            <div className="space-y-1 mt-1">
              {title ? (
                <Link
                  href="#"
                  className="line-clamp-1 hover:underline text-sm font-medium text-blue-300 md:space-x-1 flex flex-wrap"
                >
                  {title}
                </Link>
              ) : null}
              {desc ? (
                <div className="text-xs line-clamp-1 text-gray-400 md:space-x-1 flex flex-wrap">
                  {desc}
                </div>
              ) : null}
            </div>
          ) : null}

          {body ? <FeedBody body={body} /> : null}
        </div>
        <button className="py-2">
          <IconDelete width="20" height="20" />
        </button>
      </div>
    </div>
  );
};

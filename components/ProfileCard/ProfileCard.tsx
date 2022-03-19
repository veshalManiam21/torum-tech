import React from "react";
import { Button } from "../Button/Button";
import { ImageFallback } from "../ImageFallback/ImageFallback";

export type ProfileCardProps = {
  user: {
    name: string;
    isFollowing: boolean;
    bio: string | null;
  };
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="hidden z-50 md:-left-20 w-52 bg-black-0d0f14 group-hover:block  absolute border border-white rounded-xl px-4 py-2 ">
      <div className="flex justify-between pb-4">
        <ImageFallback width={42} height={42} />
        <div className="group">
          <Button paddingClassName="p-2" invertedColor={user.isFollowing}>
            <span>{user.isFollowing ? "Following" : "Follow"}</span>
          </Button>
        </div>
      </div>
      <div className="space-y-4 text-left">
        <div className="text-lg font-semibold">{user.name}</div>
        <div className="text-sm text-gray-400">{user.bio}</div>
      </div>
    </div>
  );
};

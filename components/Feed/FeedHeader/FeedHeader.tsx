import { ImageFallback } from "@/components/ImageFallback/ImageFallback";
import { Link } from "@/components/Link/Link";
import { ProfileCard } from "@/components/ProfileCard/ProfileCard";
import IconDelete from "@/assets/icon_delete.svg";

import React, { useState } from "react";
import { FeedBody } from "../FeedBody/FeedBody";
import { useModal } from "@/providers/ModalProvider";
import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useFeed } from "@/providers/FeedProvider";
import { useAuth } from "@/providers/AuthProvider";
import { LoginCard } from "@/components/LoginCard/LoginCard";

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
  slug?: string;
  body?: string;
  id?: string;
};

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  body,
  createdAt,
  desc,
  id,
  slug,
  title,
  user,
}) => {
  const profileCard = (
    <ProfileCard
      user={{
        bio: user.bio,
        isFollowing: user.isFollowing,
        name: user.name,
        image: user.image,
      }}
    />
  );

  const { openModal, closeModal } = useModal();
  const { isLoggedIn } = useAuth();

  const { deleteComment } = useFeed();

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
            <Link href="#" className="hover:underline group relative font-bold">
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
                  href={`/feed/${slug}`}
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

        {slug && id ? (
          <button
            className="py-2"
            onClick={() => {
              openModal({
                content: isLoggedIn ? (
                  <ConfirmModal
                    onConfirm={async () => {
                      const isDeleted = await deleteComment(slug, id);
                      await closeModal();
                      if (!isDeleted) {
                        setTimeout(() => {
                          openModal({
                            content: (
                              <ConfirmModal
                                onConfirm={closeModal}
                                confirmText="Okay"
                                title="Something went wrong. Try again later."
                              />
                            ),
                          });
                        }, 500);
                      }
                    }}
                    onCancel={closeModal}
                    title="Are you sure you want to delete this comment?"
                  />
                ) : (
                  <LoginCard onCloseModal={closeModal} />
                ),
              });
            }}
          >
            <IconDelete width="14" height="14" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

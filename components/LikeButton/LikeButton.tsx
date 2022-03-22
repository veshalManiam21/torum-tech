import React from "react";

import IconLike from "@/assets/icon_like.svg";
import IconLikeFill from "@/assets/icon_like_fill.svg";
import { useAuth } from "@/providers/AuthProvider";
import { useModal } from "@/providers/ModalProvider";
import { LoginCard } from "../LoginCard/LoginCard";

export type LikeButtonProps = {
  isFollowing: boolean;
  showCount?: number;
};

export const LikeButton: React.FC<LikeButtonProps> = ({
  isFollowing,
  showCount,
}) => {
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();

  const addToFavourite = () => {};
  const removeFromFavourite = () => {};

  const likeClick = () =>
    isLoggedIn
      ? openModal({
          content: <LoginCard onCloseModal={closeModal} />,
          showCloseButton: true,
        })
      : isFollowing
      ? removeFromFavourite()
      : addToFavourite();

  return (
    <button onClick={likeClick} className="flex space-x-4 items-center">
      {isFollowing ? (
        <IconLikeFill width={18} height={18} />
      ) : (
        <IconLike width={18} height={18} />
      )}
      {showCount ? (
        <div className="text-gray-400 text-xs">{showCount}</div>
      ) : null}
    </button>
  );
};

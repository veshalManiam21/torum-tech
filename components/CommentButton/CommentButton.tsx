import React from "react";
import IconComment from "@/assets/icon_comment_v2.svg";
import { useAuth } from "@/providers/AuthProvider";
import { useModal } from "@/providers/ModalProvider";
import { LoginCard } from "../LoginCard/LoginCard";
import Image from "next/image";

export type CommentButtonProps = {
  totalCommentCount?: number;
};

export const CommentButton: React.FC<CommentButtonProps> = ({
  totalCommentCount,
}) => {
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();

  const commentClick = () =>
    isLoggedIn
      ? openModal({
          content: <LoginCard onCloseModal={closeModal} />,
          showCloseButton: true,
        })
      : addComment();

  const addComment = () => [];

  return (
    <button onClick={commentClick} className="flex items-center space-x-2">
      {/* <IconComment width={20} height={20} /> */}

      <Image
        layout="fixed"
        width={20}
        height={20}
        src="/assets/images/icon_comment.png"
        alt="comment"
      />

      {totalCommentCount ? (
        <div className="text-gray-400 text-xs">{totalCommentCount}</div>
      ) : null}
    </button>
  );
};

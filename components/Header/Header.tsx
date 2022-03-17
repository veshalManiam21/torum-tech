import React from "react";
import IconProfile from "@/assets/icon_profile.svg";
import { Link } from "../Link/Link";
import { useModal } from "@/providers/ModalProvider";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { LoginCard } from "../LoginCard/LoginCard";

export type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const { openModal, closeModal } = useModal();

  return (
    <div className="px-4 py-3 bg-gray-900 flex justify-between sticky top-0">
      <Link href="/" className="text-2xl">
        TORUM
      </Link>
      <div>
        <button
          onClick={() => {
            openModal({
              content: (
                <LoginCard onConfirm={closeModal} onCancel={closeModal} />
              ),
              showCloseButton: true,
            });
          }}
        >
          <IconProfile width="36" height="36" />
        </button>
      </div>
    </div>
  );
};

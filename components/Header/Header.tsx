import React from "react";
import { Link } from "../Link/Link";
import { useModal } from "@/providers/ModalProvider";
import { LoginCard } from "../LoginCard/LoginCard";
import { ImageFallback } from "../ImageFallback/ImageFallback";
import { useAuth } from "@/providers/AuthProvider";

export type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const { openModal, closeModal } = useModal();

  const { user } = useAuth();

  return (
    <div className="px-4 py-3 bg-black-0d0f14 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl">
        TORUM
      </Link>
      <div>
        <button
          onClick={() => {
            openModal({
              content: <LoginCard onCloseModal={closeModal} />,
              showCloseButton: true,
            });
          }}
        >
          <ImageFallback image={user?.image} width={36} height={36} />
        </button>
      </div>
    </div>
  );
};

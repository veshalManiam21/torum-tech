import React from "react";
import { Button } from "@/components/Button/Button";

export type ConfirmModalProps = {
  title: string;
  desc?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  /** Loading indicator on confirm button */
  isConfirming?: boolean;
  /** Whether to track ctaClick event on confirm */
  trackConfirmCtaClick?: boolean;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  desc,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isConfirming,
  trackConfirmCtaClick = true,
}) => {
  return (
    <div className="flex flex-col items-center max-w-lg p-4 overflow-y-auto bg-black-0d0f14 rounded-lg lg:p-6">
      <h2 className="mb-4 text-sm font-bold text-center lg:text-base">
        {title}
      </h2>
      {desc ? <p className="mb-4 text-sm text-center md:mb-6">{desc}</p> : null}
      <Button
        isLoading={isConfirming}
        className="w-full py-3 mb-2 uppercase max-w-40"
        invertedColor
        onClick={onConfirm}
      >
        {confirmText ?? "Yes"}
      </Button>

      {onCancel ? (
        <Button className="w-full py-3 uppercase max-w-40" onClick={onCancel}>
          {cancelText ?? "Cancel"}
        </Button>
      ) : null}
    </div>
  );
};

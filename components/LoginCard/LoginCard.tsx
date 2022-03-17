import React from "react";
import { Button } from "@/components/Button/Button";
import { InputText } from "../InputText/InputText";

export type LoginCardProps = {
  onConfirm: () => void;
  onCancel?: () => void;
};

export const LoginCard: React.FC<LoginCardProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="flex flex-col items-center max-w-lg p-4 overflow-y-auto bg-slate-800 rounded-lg lg:p-6">
      <h2 className="mb-4 text-gray-300 font-bold text-center text-xl">
        Become a Lander today!
      </h2>

      <p className="mb-4 text-sm text-gray-300 text-center md:mb-6">
        Join Torum now and start interacting with everyone.
      </p>

      <div className="space-y-4 w-full ">
        <InputText
          type="text"
          placeholder="Email"
          autoComplete="no"
          className="border-0"
        />
        <InputText
          type="password"
          placeholder="Password"
          autoComplete="no"
          className="border-0"
        />
        <Button
          // isLoading={isConfirming}
          className="w-full py-3 mb-2 uppercase max-w-40"
          // onClick={onConfirm}
          customColorClassName="bg-blue-900 hover:bg-blue-700 text-blue-500 border-0"
        >
          LOG IN
        </Button>
      </div>
    </div>
  );
};

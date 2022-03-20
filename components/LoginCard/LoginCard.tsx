import React from "react";
import { Button } from "@/components/Button/Button";
import { InputText } from "../InputText/InputText";
import { useAuth } from "@/providers/AuthProvider";
import { useForm } from "react-hook-form";

export type LoginCardProps = {
  onCloseModal?: () => void;
};

type LoginFormProp = {
  email: string;
  password: string;
};

export const LoginCard: React.FC<LoginCardProps> = ({ onCloseModal }) => {
  const { submit } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<LoginFormProp>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

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
          error={errors["email"]?.message}
          {...register("email", {
            required: "Please enter your email",
          })}
        />
        <InputText
          type="password"
          placeholder="Password"
          autoComplete="no"
          className="border-0"
          error={errors["password"]?.message}
          {...register("password", {
            required: "Please enter your password",
          })}
        />
        <Button
          className="w-full py-3 mb-2 uppercase max-w-40"
          onClick={handleSubmit(async ({ email, password }) => {
            if (submit) {
              await submit({ email, password });

              onCloseModal?.();
            }
          })}
          customColorClassName="bg-blue-900 hover:bg-blue-700 text-blue-500 border-0"
        >
          LOG IN
        </Button>
      </div>
    </div>
  );
};

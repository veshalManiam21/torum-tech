import { Button } from "@/components/Button/Button";
import { ImageFallback } from "@/components/ImageFallback/ImageFallback";
import { InputText } from "@/components/InputText/InputText";
import { useAuth } from "@/providers/AuthProvider";
import { CommentListType, useFeed } from "@/providers/FeedProvider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export type FeedUserInputProps = {
  slug: string;
  setCommentsData: React.Dispatch<
    React.SetStateAction<CommentListType["comments"]>
  >;
};

type CommentProp = {
  comment: string;
};

export const FeedUserInput: React.FC<FeedUserInputProps> = ({
  slug,
  setCommentsData,
}) => {
  const { user } = useAuth();

  const { submitComment } = useFeed();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<CommentProp>({
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  return (
    <div className="flex space-x-4">
      <div className="w-max">
        <ImageFallback width={36} height={36} image={user?.image} />
      </div>
      <div className="ml-2 flex flex-col md:flex-row justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
        <InputText
          placeholder="Comment on this..."
          containerClassName="w-full max-w-lg "
          className="border-0 text-xs focus:outline-none px-0 placeholder:text-left placeholder:text-gray-500 bg-transparent active:border-0"
          error={errors["comment"]?.message}
          {...register("comment", {
            required: true,
          })}
        />
        <Button
          disabled={!isValid}
          onClick={handleSubmit(async ({ comment }) => {
            if (submitComment) {
              const isSubmit = await submitComment({
                comment: {
                  body: comment,
                },
                slug,
              });
            }
          })}
          borderRadiusClassName="rounded-full"
          className="w-auto"
          customColorClassName="bg-blue-400 w-max ease-in-out transition  hover:bg-blue-700 text-white border-0"
        >
          POST
        </Button>
      </div>
    </div>
  );
};

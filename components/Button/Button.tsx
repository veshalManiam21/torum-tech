import React from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { Link } from "@/components/Link/Link";

import type { MergeExclusive } from "type-fest";

type Anchor = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "className" | "children"
>;
type ButtonProp = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "children"
>;

export type ButtonProps = MergeExclusive<Anchor, ButtonProp> & {
  invertedColor?: boolean;
  className?: string;
  children: React.ReactNode;
  paddingClassName?: string;
  borderRadiusClassName?: string;
  textClassName?: string;
  /** To manually override BG / border / text colors */
  customColorClassName?: string;
  isLoading?: boolean;
};

export const Button = ({
  invertedColor,
  className = "",
  children,
  paddingClassName = "px-4 py-2",
  borderRadiusClassName = "rounded-lg",
  textClassName = "text-sm",
  customColorClassName,
  isLoading,
  disabled,
  ...otherProps
}: ButtonProps) => {
  const btnClassName = `hover:no-underline font-semibold border flex items-center justify-center
    ${textClassName} ${borderRadiusClassName} ${paddingClassName} ${className} ${
    disabled
      ? `cursor-default ${"border-grey-b6b6b6 text-grey-b6b6b6"}`
      : customColorClassName ||
        "text-purple-8f27aa bg-white border-purple-8f27aa"
  }`;

  return isWithHref(otherProps) ? (
    <Link {...otherProps} className={btnClassName}>
      {children}
    </Link>
  ) : (
    <button
      {...otherProps}
      disabled={disabled || isLoading}
      className={btnClassName}
    >
      {children}
      {isLoading ? (
        <LoadingSpinner
          className={`w-5 h-5 ml-2 ${
            invertedColor ? "text-white" : "text-black"
          }`}
        />
      ) : null}
    </button>
  );
};

function isWithHref(
  props: MergeExclusive<Anchor, ButtonProp>
): props is Anchor {
  return !!props.href;
}

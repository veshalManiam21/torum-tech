import React from "react";

export type InputTextProps = {
  label?: string;
  error?: string;
  optional?: boolean;
  inputSideText?: string;
  inputSideTextDirection?: "left" | "right";
  paddingClassName?: string;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      label,
      containerClassName = "",
      className = "",
      id,
      error,
      inputSideText,
      inputSideTextDirection,
      paddingClassName = "px-4 py-2",
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        {label ? <label htmlFor={id}>{label}</label> : null}

        {inputSideText ? (
          <div
            className={`flex border rounded-lg border-grey-e6e6e6 justify-start items-center w-full text-sm md:text-base  ${className}`}
          >
            {inputSideTextDirection === "left" ? (
              <div
                className={`${paddingClassName} font-medium border-r border-grey-e6e6e6`}
              >
                {inputSideText}
              </div>
            ) : null}
            <input
              {...props}
              ref={ref}
              id={id}
              className={`${className} ${paddingClassName} placeholder-white bg-gray-700 w-full border-none ${
                error ? "border-red-ff3b30" : "border-grey-e6e6e6"
              }`}
              type={type}
            />
            {inputSideTextDirection === "right" ? (
              <div className="px-4 py-2 font-medium border-l border-grey-e6e6e6">
                {inputSideText}
              </div>
            ) : null}
          </div>
        ) : (
          <input
            {...props}
            ref={ref}
            id={id}
            className={`border rounded-lg block w-full text-sm md:text-base bg-gray-700 placeholder-white ${className} ${paddingClassName} ${
              error ? "border-red-ff3b30" : "border-grey-e6e6e6"
            }`}
            type={type}
          />
        )}

        {error ? (
          <div className="pt-2 text-xs text-red-ff3b30">{error}</div>
        ) : null}
      </div>
    );
  }
);

import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import generalLoadingLottie from "@/assets/lottie/general_loading.json";

type LoadingIndicatorProps = {
  className?: string;
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  className = "h-24",
}) => {
  return (
    <Player className={className} autoplay loop src={generalLoadingLottie} />
  );
};
